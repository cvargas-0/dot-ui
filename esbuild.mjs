import * as esbuild from 'esbuild';
import { gzipSync } from 'zlib';
import { writeFileSync, readFileSync, mkdirSync, copyFileSync } from 'fs';

const args = new Set(process.argv.slice(2));
const cssOnly = args.has('--css');
const jsOnly = args.has('--js');

mkdirSync('dist', { recursive: true });

const fmt = (n) => `${n} bytes`;

async function buildCSS() {
  await esbuild.build({
    entryPoints: ['src/styles/main.css'],
    outfile: 'dist/dot-ui.css',
    bundle: true,
  });

  await esbuild.build({
    entryPoints: ['src/styles/main.css'],
    outfile: 'dist/dot-ui.min.css',
    bundle: true,
    minify: true,
  });

  const min = readFileSync('dist/dot-ui.min.css');
  writeFileSync('dist/dot-ui.min.css.gz', gzipSync(min, { level: 9 }));

  mkdirSync('docs/static/styles', { recursive: true });
  copyFileSync('dist/dot-ui.min.css', 'docs/static/styles/dot-ui.min.css');

  console.log('CSS:');
  console.log(`  src:  ${fmt(readFileSync('dist/dot-ui.css').length)}`);
  console.log(`  min:  ${fmt(min.length)}`);
  console.log(`  gzip: ${fmt(readFileSync('dist/dot-ui.min.css.gz').length)}`);
}

async function buildJS() {
  await esbuild.build({
    entryPoints: ['src/js/main.js'],
    outfile: 'dist/dot-ui.js',
    bundle: true,
    format: 'iife',
  });

  await esbuild.build({
    entryPoints: ['src/js/main.js'],
    outfile: 'dist/dot-ui.min.js',
    bundle: true,
    format: 'iife',
    minify: true,
  });

  const min = readFileSync('dist/dot-ui.min.js');
  writeFileSync('dist/dot-ui.min.js.gz', gzipSync(min, { level: 9 }));

  mkdirSync('docs/static/js', { recursive: true });
  copyFileSync('dist/dot-ui.min.js', 'docs/static/js/dot-ui.min.js');

  console.log('JS:');
  console.log(`  src:  ${fmt(readFileSync('dist/dot-ui.js').length)}`);
  console.log(`  min:  ${fmt(min.length)}`);
  console.log(`  gzip: ${fmt(readFileSync('dist/dot-ui.min.js.gz').length)}`);
}

if (!jsOnly) await buildCSS();
if (!cssOnly) await buildJS();
