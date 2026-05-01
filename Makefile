.PHONY: dist css js clean publish

dist: css js

css:
	@node esbuild.mjs --css

js:
	@node esbuild.mjs --js

clean:
	@rm -rf dist

publish: clean dist
	@cp README.md dist/README.md 2>/dev/null || true
	@cp LICENSE dist/LICENSE 2>/dev/null || true
	@VERSION=$$(git describe --tags --abbrev=0 2>/dev/null | sed 's/^v//' || echo "") && \
		node -e "const fs=require('fs'); \
		         const p=JSON.parse(fs.readFileSync('package.json','utf8')); \
		         if ('$$VERSION') p.version='$$VERSION'; \
		         delete p.files; \
		         delete p.scripts; \
		         delete p.devDependencies; \
		         p.main=p.main.replace('dist/',''); \
		         p.style=p.style.replace('dist/',''); \
		         if (p.exports) { \
		             p.exports['.'].import = p.exports['.'].import.replace('./dist/','./'); \
		             p.exports['./style'] = p.exports['./style'].replace('./dist/','./'); \
		         } \
		         fs.writeFileSync('dist/package.json',JSON.stringify(p,null,2));"
	@cd dist && npm publish --access public
