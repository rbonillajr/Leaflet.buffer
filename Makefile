# See the README for installation instructions.
UGLIFY = node_modules/.bin/uglifyjs

all: \
	$(shell npm install && mkdir -p dist) \
	dist/leaflet.buffer.css \
	dist/Leaflet.buffer.js \
	dist/Leaflet.buffer.min.js \
	dist/buffer.png

clean:
	rm -f dist/*

dist/buffer.png: src/buffer.png
	cp src/buffer.png dist/buffer.png
	cp src/buffer@2x.png dist/buffer@2x.png

dist/leaflet.buffer.css: src/leaflet.buffer.css
	cp src/leaflet.buffer.css dist/leaflet.buffer.css

dist/Leaflet.buffer.js: src/Leaflet.buffer.js
	cp src/Leaflet.buffer.js dist/Leaflet.buffer.js

dist/Leaflet.buffer.min.js: dist/Leaflet.buffer.js
	$(UGLIFY) dist/Leaflet.buffer.js > dist/Leaflet.buffer.min.js

.PHONY: clean
