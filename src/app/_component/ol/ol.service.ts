// https://stackoverflow.com/questions/40852037/angular2-openlayers3-test-fails-when-map-renders-writing-tests-impossible

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as ol from 'openlayers';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

var popupmap;

@Injectable()
export class OlService {

    private _map;
    private _vectorSource;
    private _vectorSourceDraw;
    public foo: string;
    public lnglat: [number, number];
    public zoom: number;

    constructor() {

        //console.log("ol.service.constructor()");
        this.foo = "bar";

        let ol = this.get();
        this._vectorSource = new ol.source.Vector();

    }

    get(): any {
        return ol;
    }

    placeMap() {
        return new Promise((resolve, reject) => {  // https://stackoverflow.com/questions/40126630/angular-2-waiting-for-boolean-to-be-true-before-executing-service

            // Both lnglat and zoom need to be set or map does not load
            this.lnglat = [-93.49401, 45.08203];
            this.zoom = 7;

            let OSM = new ol.layer.Tile({
                source: new ol.source.OSM()
            });
            OSM.set('name', 'Openstreetmap');

            let vector = new ol.layer.Vector({
                source: this._vectorSource
            });

            this._map = new ol.Map({
                target: 'map',
                layers: [OSM, vector],

                view: new ol.View({
                    center: ol.proj.fromLonLat(this.lnglat),
                    zoom: this.zoom,
                    projection: ol.proj.get('EPSG:3857')
                })
            });
            
            popupmap = this._map; // Need for click popups;

            /**
             * Popup
             **/
            var container = document.getElementById('ol-popup');
            var content_element = document.getElementById('ol-popup-content');
            var closer = document.getElementById('ol-popup-closer');

            closer.onclick = function() {
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
                if (feature) {
                    var geometry = feature.getGeometry();
                    var coord = geometry.getCoordinates();

                    var content = '<h3>' + feature.get('name') + '</h3>';
                    //  content += '<h5>' + feature.get('description') + '</h5>';


                    content_element.innerHTML = content;
                    //    content_element.innerHTML = "Hello";
                    overlay.setPosition(coord);

                    console.info(feature.getProperties());
                }
                else {
                    overlay.setPosition(undefined);
                }
            });

            resolve(true); // or false

            // return this._vectorSource;

        }); // end promise
    }


    getTitle() {
        return this.foo;
    }

    getVector() {
        return this._vectorSource;
    }

    // addLayer(): any {
    //     this.vectorSource = new ol.source.Vector();

    //     return this.vectorSource;
    // }

    // getLayer(): any {

    //     if ('this.vectorSource === undefined')
    //         console.log('getLayer() => this.vectorSource == undefined, call addLayer() first.');

    //     return this.vectorSource;
    // }

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
        //     //var features = this.draw.getSource().getFeatures();
        //     var features = this.draw.source.getFeatures();
        //     // Go through this array and get coordinates of their geometry.
        //     features.forEach(function (feature) {
        //         console.log(feature.getGeometry().getCoordinates());
        //     });
        // });



    };





}