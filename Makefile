.PHONY: dist css js clean size publish

dist: css js

STYLES := src/styles/base.css $(filter-out src/styles/base.css,$(shell find src/styles -type f -name "*.css" | sort))

css:
	@mkdir -p dist
	@cat $(STYLES) > dist/dot-ui.css
	@esbuild dist/dot-ui.css --minify --outfile=dist/dot-ui.min.css
	@gzip -9 -k -f dist/dot-ui.min.css
	@cp dist/dot-ui.min.css docs/static/styles/dot-ui.min.css
	@echo "CSS: $$(wc -c < dist/dot-ui.min.css | tr -d ' ') bytes (minified)"

js:
	@mkdir -p dist
	@esbuild src/js/main.js --bundle --format=iife --outfile=dist/dot-ui.js
	@esbuild src/js/main.js --bundle --format=iife --minify --outfile=dist/dot-ui.min.js
	@gzip -9 -k -f dist/dot-ui.min.js
	@cp dist/dot-ui.min.js docs/static/js/dot-ui.min.js
	@echo "JS: $$(wc -c < dist/dot-ui.min.js | tr -d ' ') bytes (minified)"

clean:
	@rm -rf dist

define size_file
	@if [ -f $(1) ]; then \
		echo "$$(wc -c < $(1) | tr -d ' ') bytes"; \
	else \
		echo "0 bytes"; \
	fi
endef

size:
	@echo ""
	@echo "Bundle:"
	@printf "CSS (src):   "; $(call size_file,dist/dot-ui.css)
	@printf "CSS (min):   "; $(call size_file,dist/dot-ui.min.css)
	@printf "CSS (gzip):  "; $(call size_file,dist/dot-ui.min.css.gz)
	@echo ""
	@printf "JS (src):    "; $(call size_file,dist/dot-ui.js)
	@printf "JS (min):    "; $(call size_file,dist/dot-ui.min.js)
	@printf "JS (gzip):   "; $(call size_file,dist/dot-ui.min.js.gz)


publish: clean dist
	@echo "Preparing package..."

	@mkdir -p dist

	@cp README.md dist/README.md || true
	@cp LICENSE dist/LICENSE || true

	@node -e "\
		const fs = require('fs'); \
		const pkg = JSON.parse(fs.readFileSync('package.json','utf8')); \
		delete pkg.scripts; \
		delete pkg.devDependencies; \
		pkg.main = 'dot-ui.min.js'; \
		pkg.style = 'dot-ui.min.css'; \
		fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, 2)); \
	"

	@echo ""
	@echo "Package content:"
	@ls -lh dist
	@cd dist && npm publish --access public
