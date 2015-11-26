L.Control.Buffer = L.Control.extend({
    options: {
        position: 'topleft',
        modal: false
    },

    onAdd: function (map) {
        this._map = map;
        this._active = false;
        this._container = L.DomUtil.create('div', 'leaflet-control-buffer leaflet-bar leaflet-control');
        this._container.title = "Buffer to specific area";
        this._link = L.DomUtil.create('a', 'leaflet-control-buffer-button leaflet-bar-part', this._container);
        this._link.href = '#';

        
        // this._map.on('bufferchange', this._toggleTitle, this);
        // this._toggleTitle();

        //L.DomEvent.on(this._link, 'click', this._click, this);
        
        /* var _origClick = map.buffer._onClick;
        map.buffer._onClick = function(e){
          _origClick.call(map.buffer, {
                clientX: e.clientX,
                clientY: e.clientY,
                which: 1,
                shiftKey: true
            });  
        };*/
        
        map.on('click', this._onCreateBuffer, this);
        
        /* if (!this.options.modal) {
            map.on('bufferingend', this.deactivate, this);
        } */
        
        L.DomEvent
            .on(this._container, 'dblclick', L.DomEvent.stop)
            .on(this._container, 'click', L.DomEvent.stop)
            .on(this._container, 'click', function(){
                this._active = !this._active;
                if (this._active){
                    this.activate();
                }
                else {
                    this.deactivate();
                }
            }, this);

        return this._container;
    },    
    activate: function() {
        L.DomUtil.addClass(this._container, 'active');
         this._map.dragging.disable();
        // this._map.buffer.addHooks();
        L.DomUtil.addClass(this._map.getContainer(), 'leaflet-control-buffer-crosshair');
    },
    deactivate: function() {
        L.DomUtil.removeClass(this._container, 'active');
         this._map.dragging.enable();
        // this._map.buffer.removeHooks();
        L.DomUtil.removeClass(this._map.getContainer(), 'leaflet-control-buffer-crosshair');
        this._active = false;
        
    },
    _onCreateBuffer: function(e){
        this._map.onCreateBuffer(e.latlng);
    },
    
    addTo: function (map) {
			L.Control.prototype.addTo.call(this, map);		
			return this;
		}
    
});
L.Map.include({
    onCreateBuffer: function(latlng){
        this.fire('createBuffer', { latlng: latlng });        
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