L.Control.Buffer = L.Control.extend({
    options: {
        position: 'topleft',
        title: {
            'false': 'View buffer',
            'true': 'Exit buffer'
        }
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-control-buffer leaflet-bar leaflet-control');

        this.link = L.DomUtil.create('a', 'leaflet-control-buffer-button leaflet-bar-part', container);
        this.link.href = '#';

        // this._map = map;
        // this._map.on('bufferchange', this._toggleTitle, this);
        // this._toggleTitle();

        L.DomEvent.on(this.link, 'click', this._click, this);

        return container;
    },

    _click: function (e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
       // this._map.toggleBuffer();
    },

    // _toggleTitle: function() {
    //     this.link.title = this.options.title[this._map.isbuffer()];
    // }
});


L.control.Buffer = function (options) {
    return new L.Control.buffer(options);
};