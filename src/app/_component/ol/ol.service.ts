// https://stackoverflow.com/questions/40852037/angular2-openlayers3-test-fails-when-map-renders-writing-tests-impossible

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as ol from 'openlayers';
import * as d3 from 'd3';
//import * as d3 from '../d3/bundle-d3';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

var popupmap;
var vectorGeoJson;
var vectorGeoPng;

@Injectable()
export class OlService {

    private _map;
    private _vectorSource;
    private _vectorSourceDraw;
    private _vectorSourceGeoJson;
    private _vectorLayerGeoJson;
    public foo: string;
    public lnglat: [number, number];
    public zoom: number;

    constructor() {

        //console.log("ol.service.constructor()");
        this.foo = "ol service map";

        let ol = this.get();
       // this._vectorSource = new ol.source.Vector();
      //  this._vectorSourceGeoJson = new ol.source.Vector();

    }

    get(): any {
        return ol;
    }

    getD3(): any {
        return d3;
    }

    getMapPolygon() {
        let ol = this.get();
        var poly = popupmap.getView().calculateExtent(popupmap.getSize());

        //var poly = popupmap.getExtent().toGeometry().toString();

        console.log(poly);
    }

    placeMap() {
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


            let OSM = new ol.layer.Tile({
                //source: new ol.source.Stamen({ layer: 'watercolor' })
                //source: new ol.source.Stamen({ layer: 'toner' })
                //source: new ol.source.Stamen({ layer: 'toner-lines' })
                //source: new ol.source.Stamen({ layer: 'terrain' })
                //source: ol.source.BingMaps({}),
                source: new ol.source.OSM()
            });


            // var customStyleFunction = function(feature, resolution) {

            //      let strokecolor;
            //      let _radius =3;

            //    // console.log(resolution);

            //    if (resolution > 14)
            //      _radius = 3;
            //    else
            //      _radius = 10;

            //     if(feature.get('source') === 'navteq') { // black icon
            //         strokecolor = '#020815';
            //     } else if(feature.get('source') === '') { // blue
            //         strokecolor = '#f61212';
            //     } else {
            //         strokecolor = '#198cff';
            //     }

            //     return [new ol.style.Style({
            //         image: new ol.style.Circle({
            //         fill: new ol.style.Fill({
            //             color: '#1b465a'
            //         }),
            //         stroke: new ol.style.Stroke({
            //             color: strokecolor,
            //             width: 3
            //         }),
            //         radius: _radius
            //         })
            //     })];
            //     };

            let tiledSource = new ol.layer.VectorTile({

                // style: customStyleFunction, // <= working style from above
                source: new ol.source.VectorTile({
                    projection: 'EPSG:3857',
                    name: "homes",
                    format: new ol.format.GeoJSON({ defaultProjection: 'EPSG:4326' }),
                    //  format: new ol.format.GeoJSON(),
                    tilePixelRatio: 16,
                    tileGrid: ol.tilegrid.createXYZ({
                        //  tileSize: [256, 256],
                        extent: ol.proj.get('EPSG:3857').getExtent(),
                        maxZoom: 18,
                        minResolution: 15, // was 0
                        maxResolution: 18, // was 20 
                        // tileUrlFunction: function (tileCoord) {
                        //     // create a simplified url for use in the tileLoadFunction
                        //     console.log('z=' + tileCoord);
                        //     return tileCoord.toString();
                        // },
                        // tileLoadFunction: function (tileCoord) {
                        //     console.log('z=' + tileCoord);
                        //     //https://openlayers.org/en/latest/examples/mapbox-vector-tiles-advanced.html
                        //     return ('http://geo.localhost:8080/api/v1/Address/GeoTile/{z}/{x}/{y}.json')
                        //         .replace('{z}', String(tileCoord[0] * 2 - 1))
                        //         .replace('{x}', String(tileCoord[1]))
                        //         .replace('{y}', String(-tileCoord[2] - 1));
                        // }

                    }),
                    url: 'http://geo.localhost:8080/api/v1/Address/GeoTile/{z}/{x}/{y}.json'
                })
            });

            //Only show if 
            //tiledSource.setVisible(false);

            // // var tiledVectorOSM = new ol.layer.Vector({
            // //     source: tiledSource,
            // //     style: vectorStyle
            // // });


            // let vector = new ol.layer.Vector({
            //     source: this._vectorSource,
            //     style: vectorStyle
            // });


            // // var clusterSource = new ol.source.Cluster({
            // //     distance: 10,
            // //     source: this._vectorSourceGeoJson
            // // });


            let vectorgeojson = new ol.layer.Vector({
                //  maxZoom: 18,
                //  minResolution: 15,  // hides or shows based on zoom
                //  maxResolution: 18,
                source: this._vectorSourceGeoJson,
                style: vectorStyle
            });

            this._vectorLayerGeoJson = vectorgeojson.setVisible(false);

            // this._vectorLayerGeoJson = new ol.layer.Vector();

            // 'http://geocode.localhost:8080/api/v1/Contact/Geo?CityName=Maple%20Grove&StateName=MN';

            let pngSource = new ol.layer.Tile({
                source: new ol.source.XYZ({
                    maxZoom: 14,
                    minResolution: 5,  // hides or shows based on zoom
                    maxResolution: 14,
                    url: 'http://geo.localhost:8080/api/v1/Address/PngTile/{z}/{x}/{y}.png'
                    })
                });

            this._vectorSource = pngSource;

            this._map = new ol.Map({
                target: 'map',
                layers: [
                    OSM,
                //    vector,
                    vectorgeojson,
                //    tiledSource,
                    pngSource,

                ],
                renderer: 'canvas', // required for vector tiles
                view: new ol.View({
                    center: ol.proj.fromLonLat(this.lnglat),
                    zoom: 10, // this.zoom,
                    minZoom: 5,
                    maxZoom: 18,
                    projection: ol.proj.get('EPSG:3857'),
                    displayProjection: ol.proj.get("EPSG: 4326")
                })
            });

            popupmap = this._map; // Need for click popups;

            /**
             * Popup
             **/
            var container = document.getElementById('ol-popup');
            var content_element = document.getElementById('ol-popup-content');
            var closer = document.getElementById('ol-popup-closer');

            closer.onclick = function () {
                overlay.setPosition(undefined);
                closer.blur();
                return false;
            };

            var overlay = new ol.Overlay({
                element: container,
                autoPan: true,
                offset: [0, -10]
            });
            this._map.addOverlay(overlay);

            var fullscreen = new ol.control.FullScreen();
            this._map.addControl(fullscreen);

            this._map.on('click', function (evt) {
                // Popup example
                // http://plnkr.co/edit/GvdVNE?p=preview
                //
                if (popupmap == null)
                    alert('_map is null');

                var feature = popupmap.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                    return feature;
                });
                if
                (feature) {
                    var geometry = feature.getGeometry();
                    var coord = geometry.getCoordinates();

                    var content = '<h3>' + feature.get('name') + '</h3>';
                    content += '<h5>' + feature.get('address') + '</h5>';
                    content += '<br><h5>' + feature.get('source') + '</h5>';


                    content_element.innerHTML = content;
                    //    content_element.innerHTML = "Hello";
                    overlay.setPosition(coord);

                    console.info(feature.getProperties());
                }
                else {
                    overlay.setPosition(undefined);
                }
            });


            // this._map.getView().on('change:resolution', function (e) {

            //     // BIGGER the number the closer to the ground and roads
            //     // LARGER the number the closer to space you are!
            //     console.log(popupmap.getView().getZoom());

            //     if (popupmap.getView().getZoom() > 5) {
            //       this._vectorLayerGeoJson.setVisible(false);
            //       this._vectorSource.setVisible(true);
            //     }
            //     else {
            //       this._vectorSource.setVisible(true);
            //       this._vectorLayerGeoJson.setVisible(true);
            //     }
            // });

            resolve(true); // or false

            // return this._vectorSource;

        }); // end promise
    }

    // This cuts geojson into tiles
    // https://github.com/mapbox/geojson-vt

    // https://en.wikipedia.org/wiki/GeoJSON



    placeD3(data) {
        //  let d3 = this.getD3();
        let width = window.innerWidth,
            height = window.innerHeight;

        let sc = Math.min(width, height) * 0.5

        //let projection = d3.geoEquirectangular()
        let projection = d3.geoMercator()
            .scale(sc)
            .translate([width / 2, height / 2])
            .rotate([-180, 0]);

        let path = d3.geoPath().projection(projection);

        let svg = d3.select("#d3map").append("svg")
            .attr("width", width)
            .attr("height", height);

        svg.selectAll(".geojson")
            .data(data.features)
            .enter()
            .append("path")
            .attr("class", "geojson")
            .attr("d", path);

        alert('placeD3 => done?');
    }

    // https://gist.github.com/mbertrand/5218300

    getTitle() {
        return this.foo;
    }

    getVector() {
        return this._vectorSource;
    }

    ///
    /// https://gis.stackexchange.com/questions/146691/loading-geojson-via-ajax-after-adding-layer-to-openlayers-3
    /// 
    addGeoJson(geojsonObject) {

        let ol = this.get();

        console.log('before loading GeoJSON!');


        // this.getMapPolygon();

        // let iconStyle = new ol.style.Style({
        //     image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
        //         opacity: 0.75,
        //         anchor: [0.5, 1],
        //         src: '//cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/location-alt-32.png'
        //     }))
        // });

        console.log('loading GeoJson count=' + geojsonObject.features.length);

        let projection = popupmap.getView().getProjection();

        //console.log('projection=');
        //console.log(projection);

        let myNewGeoJSON = new ol.format.GeoJSON();
        let featuresSearch = myNewGeoJSON.readFeatures(geojsonObject, { featureProjection: projection });

        // console.log(featuresSearch);


        if (this._vectorSourceGeoJson == null)
            console.log("addGeoJson() => this._vectorSourceGeoJson == null");

        this._vectorSourceGeoJson.addFeatures(featuresSearch);

        this._vectorSourceGeoJson.changed();


        console.log('done loading GeoJSON!');

    }


    addMarker(coords: [number, number], name: string, id: string) {
        let ol = this.get();
        //let vectorSourceTest = this.olService.vectorSource;
        //this.vectorSource = this.olService.getLayer();
        let iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform(coords, 'EPSG:4326', 'EPSG:3857')),
            name: name,
            id: id,
        });

        let iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                opacity: 0.75,
                anchor: [0.5, 1],
                src: '//cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/location-alt-32.png'
            }))
        });

        iconFeature.setStyle(iconStyle);

        // if (this.vectorSource === undefined)
        //     console.log("addMarker() => this.vectorSource === undefined");

        if (this._vectorSource == null)
            console.log("addMarker() => vectorSource == null");

        this._vectorSource.addFeature(iconFeature);
        //this._vectorSource.changed();
        //alert('added marker:' + name);
    }

    addPolygon(polygon: [[number, number]], name: string, id: string) {
        let ol = this.get();
        let projectedPolygon = [];

        for (let poly of polygon) {
            projectedPolygon.push(ol.proj.transform(poly, 'EPSG:4326', 'EPSG:3857'));
        }

        let p = new ol.geom.Polygon([projectedPolygon]);

        let featurething = new ol.Feature({
            name: name,
            id: id,
            geometry: p
        });

        // let vector = this.getVector();
        this._vectorSource.addFeature(featurething);

    };

    addInteraction() {
        let ol = this.get();
        let draw = new ol.interaction.Draw({
            source: this._vectorSourceDraw,
            type: 'Polygon',
            freehand: true
        });

        this._map.addInteraction(draw);


        // this.draw.on('drawend', function () {
        //     //let features = this.draw.getSource().getFeatures();
        //     let features = this.draw.source.getFeatures();
        //     // Go through this array and get coordinates of their geometry.
        //     features.forEach(function (feature) {
        //         console.log(feature.getGeometry().getCoordinates());
        //     });
        // });



    };

}