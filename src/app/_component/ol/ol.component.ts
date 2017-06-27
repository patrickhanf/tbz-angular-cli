import { Component, OnInit, Input } from '@angular/core';
import { OlService } from './ol.service';
import * as ol from 'openlayers';


var mapGlobal;
var vectorGeoJson;
var vectorGeoPng;
var vectorGeoDraw;
// make interactions global so they can later be removed
var select_interaction, draw_interaction, modify_interaction;

@Component({
    selector: 'app-map',
    templateUrl: './ol.component.html',
    styleUrls: ['./ol.component.css'],
    providers: [OlService] // http://developer.telerik.com/topics/web-development/creating-angular-2-injectable-service/
})
export class OlComponent implements OnInit {

    @Input() lnglat: [number, number];
    @Input() zoom: number;

    private draw; // global so we can remove it later, See: http://openlayers.org/en/latest/examples/draw-freehand.html?q=draw

    turfActionSelected: string = 'draw';
    turfActions = [
        { value: 'draw', icon: 'rounded_corner'},
        { value: 'modify', icon: ''}
        ];

    public ols;

    constructor(private olService: OlService) {

    this.ols = olService;

        //this.vectorSource = this.olService.vector;
        //  this.olservice.lnglat = this.lnglat; // [-93.49401, 45.08203];
        //   this.olservice.zoom = this.zoom; // 7;

        //this.olService.vectorSource = this.olService.addLayer();

    }




    ngOnInit() {
        console.log("ol.component.ngOnInit()");
    }

    ngAfterContentInit() {

        console.log("ol.component.ngAfterContentInit()");
        this.placeMapFromComponent();
        // this.olService.placeMap(this.zoom,this.lnglat).then(() => { 
        //         alert("Map loaded by promise!");
        //     });
    }


    onTurfActionSelected(selected: String) {

        // Issue below is up because the angular model is out-of-sync with the event.
        // https://github.com/angular/material2/issues/448
        // console.log('clicked onTurfActionSelected()' + this.turfActionSelected + ' selected=='+ selected);

        //this.olService.getTurfCutter(select_interaction, modify_interaction);

        if (selected == 'draw')
            this.olService.addDrawInteraction();
        else
            this.olService.addModifyInteraction();
    }

    onTurfActionDelete()
    {
        // https://medium.com/@tarik.nzl/making-use-of-dialogs-in-material-2-mddialog-7533d27df41
         this.olService.deleteTurfMap();
    }
    
    get(): any {
        return ol;
    }

    placeMapFromComponent() {
        return new Promise((resolve, reject) => {  // https://stackoverflow.com/questions/40126630/angular-2-waiting-for-boolean-to-be-true-before-executing-service

            let ol = this.get();

            // Both lnglat and zoom need to be set or map does not load
            this.lnglat = [-93.49401, 45.08203];
            this.zoom = 10;

            var vectorStyle = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 4,
                    fill: new ol.style.Fill({
                        color: '#1b465a'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#020815',
                        width: 1
                    })
                })
            });

            var customStyleFunction = function (feature, resolution) {
                //debug  console.log('resolution='+resolution);

                let strokecolor;
                let _radius = 4;

                //    if (resolution > 14)
                //      _radius = 3;
                //    else
                //      _radius = 10;

                if (feature.get('source') === 'navteq') { // black icon
                    strokecolor = '#133277';
                } else if (feature.get('source') === '') { // blue
                    strokecolor = '#f61212';
                } else {
                    strokecolor = '#198cff';
                }

                return [new ol.style.Style({
                    image: new ol.style.Circle({
                        // fill: new ol.style.Fill({
                        //     color: '#1b465a'
                        // }),
                        stroke: new ol.style.Stroke({
                            color: strokecolor,
                            width: 1
                        }),
                        radius: _radius
                    })
                })];
            };

            let OSM = new ol.layer.Tile({
                //source: new ol.source.Stamen({ layer: 'watercolor' })
                //source: new ol.source.Stamen({ layer: 'toner' })
                //source: new ol.source.Stamen({ layer: 'toner-lines' })
                source: new ol.source.Stamen({ layer: 'terrain' })
                //source: ol.source.BingMaps({}),
                //source: new ol.source.OSM(),
                // maxResolution: 50, // was 20 
            });

            let geoJsonSource = new ol.layer.VectorTile({
                // style: function(feature, resolution) {
                //    console.log('resolution='+resolution);
                // },
                style: customStyleFunction, // <= working style from above
                // minResolution: 1, // was 0
                maxResolution: 9, // was 20 
                source: new ol.source.VectorTile({

                    projection: 'EPSG:3857',
                    name: "homes",
                    format: new ol.format.GeoJSON({ defaultProjection: 'EPSG:4326' }),
                    // tilePixelRatio: 16,
                    tileGrid: ol.tilegrid.createXYZ({
                        tileSize: [256, 256],
                        extent: ol.proj.get('EPSG:3857').getExtent(),
                    }),
                    url: 'http://www.geo.localhost:8080/api/v1/Address/GeoTile/{z}/{x}/{y}.json'

                })
            });

            //tiledSource.setVisible(false);
            // this._vectorLayerGeoJson = vectorgeojson.setVisible();

            // 'http://geocode.localhost:8080/api/v1/Contact/Geo?CityName=Maple%20Grove&StateName=MN';

            let geoPngSource = new ol.layer.Tile({

                minResolution: 6,  // hides or shows based on zoom
                // maxResolution: 10,
                source: new ol.source.XYZ({
                    url: 'http://www.geo.localhost:8080/api/v1/Address/PngTile/{z}/{x}/{y}.png'
                })
            });

            // https://codepen.io/barbalex/pen/fBpyb
            // create a vector layer used for editing

            let geoDrawSource = new ol.layer.Vector({
                name: 'draw_vectorlayer',
                source: new ol.source.Vector(),
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#3393ff', // #ffcc33',
                        width: 4
                    }),
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ffcc33'
                        })
                    })
                })
            });

            //
            // Move vectors to global
            //
            vectorGeoJson = geoJsonSource;
            vectorGeoPng = geoPngSource;
            vectorGeoDraw = geoDrawSource;

           
            mapGlobal = new ol.Map({
                target: 'map',
                interactions: ol.interaction.defaults({ doubleClickZoom: false }), // disable zoom double click
                layers: [
                    OSM,
                    geoJsonSource,
                    geoPngSource,
                    geoDrawSource, // Polygon drawing

                ],
                //renderer: 'canvas', // required for vector tiles
                view: new ol.View({

                    center: ol.proj.fromLonLat(this.lnglat),
                    zoom: 10, // this.zoom,
                    minZoom: 5,
                    maxZoom: 18,
                    projection: ol.proj.get('EPSG:3857'),
                    displayProjection: ol.proj.get("EPSG: 4326")
                })
            });


alert('ol.component map');
           // mapGlobal = this._map; // Need for click popups;

            /**
             * Popup
             **/
            // var container = document.getElementById('ol-popup');
            // var content_element = document.getElementById('ol-popup-content');
            // var closer = document.getElementById('ol-popup-closer');

            // closer.onclick = function () {
            //     overlay.setPosition(undefined);
            //     closer.blur();
            //     return false;
            // };

            // var overlay = new ol.Overlay({
            //     element: container,
            //     autoPan: true,
            //     offset: [0, -10]
            // });
            // mapGlobal.addOverlay(overlay);

            // var fullscreen = new ol.control.FullScreen();
            // mapGlobal.addControl(fullscreen);

            // // change mouse cursor when over marker
            // // http://jsfiddle.net/jonataswalker/r6f3s6r0/
            // mapGlobal.on('pointermove', function (e) {
            //     // if (e.dragging) {
            //     //     $(element).popover('destroy');
            //     //     return;
            //     // }
            //     var pixel = mapGlobal.getEventPixel(e.originalEvent);
            //     var hit = mapGlobal.hasFeatureAtPixel(pixel);
            //     var target = mapGlobal.getTarget();

            //     target = typeof target === "string" ?
            //         document.getElementById(target) : target;

            //     target.style.cursor = hit ? 'pointer' : '';

            //     // mapGlobal.getTarget().style.cursor = hit ? 'pointer' : '';
            // });

            // mapGlobal.on('click', function (evt) {
            //     // Popup example
            //     // http://plnkr.co/edit/GvdVNE?p=preview
            //     //
            //     if (mapGlobal == null)
            //         alert('_map is null');

            //     var feature = mapGlobal.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            //         return feature;
            //     });
            //     if
            //     (feature) {
            //         var geometry = feature.getGeometry();
            //         var coord = geometry.getCoordinates();

            //         var content = '<h3>' + feature.get('id') + '</h3>';
            //         content += '<h5>' + feature.get('address') + '</h5>';
            //         content += '<br><h5>' + feature.get('source') + '</h5>';


            //         content_element.innerHTML = content;
            //         //    content_element.innerHTML = "Hello";
            //         overlay.setPosition(coord);

            //         console.info(feature.getProperties());
            //     }
            //     else {
            //         overlay.setPosition(undefined);
            //     }
            // });


            mapGlobal.getView().on('change:resolution', function (e) {

                // BIGGER the number the closer to the ground and roads
                // LARGER the number the closer to space you are!
                console.log(mapGlobal.getView().getZoom());

                // if (mapGlobal.getView().getZoom() > 5) {
                //   this._vectorLayerGeoJson.setVisible(false);
                //   this._vectorSource.setVisible(true);
                // }
                // else {
                //   this._vectorSource.setVisible(true);
                //   this._vectorLayerGeoJson.setVisible(true);
                // }
            });



            resolve(true); // or false

            // return this._vectorSource;

        }); // end promise
    }


} // end file