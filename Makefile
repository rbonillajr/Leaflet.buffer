# See the README for installation instructions.
UGLIFY = node_modules/.bin/uglifyjs

all: \
	$(shell npm install && mkdir -p dist) \
	dist/Leaflet.buffer.css \
	dist/Leaflet.buffer.js \
	dist/Leaflet.buffer.min.js \
	dist/buffer.png

clean:
	rm -f dist/*

dist/buffer.png: src/buffer.png
	cp src/buffer.png dist/buffer.png
	cp src/buffer@2x.png dist/buffer@2x.png

dist/Leaflet.buffer.css: src/Leaflet.buffer.css
	cp src/Leaflet.buffer.css dist/Leaflet.buffer.css

dist/Leaflet.buffer.js: src/Leaflet.buffer.js
	cp src/Leaflet.buffer.js dist/Leaflet.buffer.js

dist/Leaflet.buffer.min.js: dist/Leaflet.buffer.js
	$(UGLIFY) dist/Leaflet.buffer.js > dist/Leaflet.buffer.min.js

.PHONY: clean
