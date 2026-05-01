.PHONY: dist css js clean publish

dist: css js

css:
	@node esbuild.mjs --css

js:
	@node esbuild.mjs --js

clean:
	@node -e "require('fs').rmSync('dist', { recursive: true, force: true })"

publish: clean dist
	@node -e "\
		const fs=require('fs'); \
		try { fs.copyFileSync('README.md', 'dist/README.md'); } catch(e) {} \
		try { fs.copyFileSync('LICENSE', 'dist/LICENSE'); } catch(e) {} \
		const p=JSON.parse(fs.readFileSync('package.json','utf8')); \
		delete p.files; \
		delete p.scripts; \
		delete p.devDependencies; \
		if (p.main) p.main=p.main.replace('dist/',''); \
		if (p.style) p.style=p.style.replace('dist/',''); \
		if (p.exports) { \
			if (p.exports['.'].import) p.exports['.'].import = p.exports['.'].import.replace('./dist/','./'); \
			if (p.exports['./style']) p.exports['./style'] = p.exports['./style'].replace('./dist/','./'); \
		} \
		fs.writeFileSync('dist/package.json',JSON.stringify(p,null,2));"
	@npm publish --access public
