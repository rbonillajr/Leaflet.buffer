L.Control.Buffer = L.Control.extend({
    includes: L.Mixin.Events,
    options: {
        unit: 'kilometers',
        textRadio: 'Ingrese el tamaño del Radio',
        position: 'topleft',
        toggle: false
    },

    onAdd: function (map) {
        this._map = map;
        this._active = false;
        this._container = L.DomUtil.create('div', 'leaflet-control-buffer leaflet-bar leaflet-control');
        this._container.title = "Buffer to specific area";
        this._link = L.DomUtil.create('a', 'leaflet-control-buffer-button leaflet-bar-part', this._container);
        this._link.href = '#';
                        
        if (!this.options.toggle) {
            map.on('createBuffer', this.deactivate, this);
        }
        
        L.DomEvent
            .on(this._container, 'dblclick', L.DomEvent.stop)
            .on(this._container, 'click', L.DomEvent.stop)
            .on(this._container, 'click', function(){
                this._active = !this._active;
                if (this._active){
                    map.on('click', this._onCreateBuffer, this);
                    this.activate();
                }
                else {
                    map.off('click', this._onCreateBuffer, this);
                    this.deactivate();
                }
            }, this);

        return this._container;
    },    
    activate: function() {        
        L.DomUtil.addClass(this._container, 'active');
        this._map.dragging.disable();        
        L.DomUtil.addClass(this._map.getContainer(), 'leaflet-control-buffer-crosshair');
    },
    deactivate: function() {        
        L.DomUtil.removeClass(this._container, 'active');
        this._map.dragging.enable();        
        L.DomUtil.removeClass(this._map.getContainer(), 'leaflet-control-buffer-crosshair');
        this._active = false;
        
    },
    _onCreateBuffer: function(e){
        var marker = L.marker(e.latlng, {});
        var pointMarker = marker.toGeoJSON();
        var radio = prompt(this.options.textRadio);
        var buffered = turf.buffer(pointMarker, radio, this.options.unit);
        
        var feature = L.geoJson(buffered);
        feature.addTo(map);
        
        this._map.onCreateBuffer(buffered);        
    },
    
    addTo: function (map) {
			L.Control.prototype.addTo.call(this, map);		
			return this;
		}
    
});
L.Map.include({
    onCreateBuffer: function(buffered){
                        
        this.fire('createBuffer', { buffered: buffered });        
    }
});

L.Map.addInitHook(function(){
    var onCreateBuffer = L.bind(this._onCreateBuffer, this);

        this.whenReady(function () {
            L.DomEvent.on(document, 'createBuffer', onCreateBuffer);
        });

        this.on('unload', function () {
            L.DomEvent.off(document, 'createBuffer', onCreateBuffer);
        });
});

L.control.buffer = function (options) {
    return new L.Control.Buffer(options);
};