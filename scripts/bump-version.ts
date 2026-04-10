import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const PACKAGE_JSON_PATH = join(process.cwd(), 'package.json')

const rl = createInterface({ input, output })

function run(cmd: string): string {
  return execSync(cmd, { encoding: 'utf-8' }).trim()
}

function bump(version: string, type: 'major' | 'minor' | 'patch'): string {
  const [major, minor, patch] = version.split('.').map(Number)
  switch (type) {
    case 'major': return `${major + 1}.0.0`
    case 'minor': return `${major}.${minor + 1}.0`
    case 'patch': return `${major}.${minor}.${patch + 1}`
  }
}

async function select(message: string, options: { value: string; label: string }[]): Promise<string> {
  console.log(`\n  ${message}`)
  options.forEach((opt, i) => console.log(`    ${i + 1}. ${opt.label}`))
  const answer = await rl.question('\n  Choose: ')
  const index = parseInt(answer) - 1
  if (index < 0 || index >= options.length) {
    console.error('  ❌ Invalid option')
    process.exit(1)
  }
  return options[index].value
}

async function confirm(message: string, defaultValue = true): Promise<boolean> {
  const hint = defaultValue ? '[Y/n]' : '[y/N]'
  const answer = await rl.question(`\n  ${message} ${hint}: `)
  if (!answer.trim()) return defaultValue
  return answer.trim().toLowerCase() === 'y'
}


async function main(): Promise<void> {
  console.log('\n  dot-ui — version bump\n  ─────────────────────')

  const args = process.argv.slice(2)
  const isDryRun = args.includes('--dry-run')
  let versionInput = args.find((arg) => !arg.startsWith('--'))

  // Read current version
  const packageJson = JSON.parse(await readFile(PACKAGE_JSON_PATH, 'utf-8'))
  const currentVersion: string = packageJson.version
  console.log(`\n  Current version: ${currentVersion}`)

  // Interactive mode if no version arg provided
  if (!versionInput) {
    versionInput = await select('What type of release?', [
      { value: 'patch', label: `Patch (bug fixes)         ${currentVersion} → ${bump(currentVersion, 'patch')}` },
      { value: 'minor', label: `Minor (new features)      ${currentVersion} → ${bump(currentVersion, 'minor')}` },
      { value: 'major', label: `Major (breaking changes)  ${currentVersion} → ${bump(currentVersion, 'major')}` },
      { value: 'custom', label: 'Custom version' },
    ])

    if (versionInput === 'custom') {
      const custom = await rl.question('\n  Enter version (x.y.z): ')
      if (!/^\d+\.\d+\.\d+$/.test(custom.trim())) {
        console.error('  ❌ Must be x.y.z format')
        rl.close()
        process.exit(1)
      }
      versionInput = custom.trim()
    }
  }

  // Resolve new version
  let newVersion: string

  if (['major', 'minor', 'patch'].includes(versionInput)) {
    newVersion = bump(currentVersion, versionInput as 'major' | 'minor' | 'patch')
    console.log(`\n  Bumping ${versionInput}: ${currentVersion} → ${newVersion}`)
  } else {
    if (!/^\d+\.\d+\.\d+$/.test(versionInput)) {
      console.error('  ❌ Version must be x.y.z format')
      rl.close()
      process.exit(1)
    }
    newVersion = versionInput
    console.log(`\n  Custom version: ${currentVersion} → ${newVersion}`)
  }

  // Dry run
  if (isDryRun) {
    console.log(`\n  ✅ Would release v${newVersion} (dry run — nothing changed)\n`)
    rl.close()
    return
  }

  // Check for uncommitted changes
  const status = run('git status --porcelain')
  if (status) {
    console.error('\n  ❌ You have uncommitted changes. Commit or stash them first.')
    rl.close()
    process.exit(1)
  }

  // Confirm
  const shouldProceed = await confirm(`Release v${newVersion}?`)
  if (!shouldProceed) {
    console.log('\n  Cancelled\n')
    rl.close()
    process.exit(0)
  }

  // Update package.json
  packageJson.version = newVersion
  await writeFile(PACKAGE_JSON_PATH, `${JSON.stringify(packageJson, null, 2)}\n`)
  console.log(`\n  ✓ package.json → ${newVersion}`)

  // Build
  console.log('  Running build...')
  try {
    run('pnpm build')
    console.log('  ✓ Build passed')
  } catch {
    console.error('  ❌ Build failed — reverting package.json')
    packageJson.version = currentVersion
    await writeFile(PACKAGE_JSON_PATH, `${JSON.stringify(packageJson, null, 2)}\n`)
    rl.close()
    process.exit(1)
  }

  // Git commit + tag
  run('git add package.json')
  run(`git commit -m "chore(release): v${newVersion}"`)
  console.log(`  ✓ Committed: chore(release): v${newVersion}`)

  run(`git tag v${newVersion}`)
  console.log(`  ✓ Tag: v${newVersion}`)

  // Push
  const shouldPush = await confirm('Push commit and tag to origin?')
  if (shouldPush) {
    run('git push')
    run(`git push origin v${newVersion}`)
    console.log('  ✓ Pushed to origin')
  }

  console.log(`\n  ✅ Released v${newVersion}\n`)
  rl.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
