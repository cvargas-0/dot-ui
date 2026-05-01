.PHONY: dist css js clean publish

dist: css js

css:
	@node esbuild.mjs --css

js:
	@node esbuild.mjs --js

clean:
	@rm -rf dist

publish: clean dist
	@cp -r src/styles dist/styles
	@cp -r src/js dist/js
	@cp README.md dist/README.md 2>/dev/null || true
	@cp LICENSE dist/LICENSE 2>/dev/null || true
	@VERSION=$$(git describe --tags --abbrev=0 | sed 's/^v//') && \
		node -e "const p=JSON.parse(require('fs').readFileSync('package.json','utf8')); \
		         p.version='$$VERSION'; \
		         require('fs').writeFileSync('dist/package.json',JSON.stringify(p,null,2));"
	@cd dist && npm publish --access public
