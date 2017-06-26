// https://stackoverflow.com/questions/40852037/angular2-openlayers3-test-fails-when-map-renders-writing-tests-impossible

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as ol from 'openlayers';

//import * as d3 from '../d3/bundle-d3';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

var popupmap;
var vectorGeoJson;
var vectorGeoPng;
var vectorGeoDraw;
// make interactions global so they can later be removed
var select_interaction, draw_interaction, modify_interaction;

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
                //source: new ol.source.Stamen({ layer: 'terrain' })
                //source: ol.source.BingMaps({}),
                source: new ol.source.OSM(),
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
                    url: 'http://geo.localhost:8080/api/v1/Address/GeoTile/{z}/{x}/{y}.json'

                })
            });


            //Only show if 
            //tiledSource.setVisible(false);
            // this._vectorLayerGeoJson = vectorgeojson.setVisible();
            // this._vectorLayerGeoJson = new ol.layer.Vector();

            // 'http://geocode.localhost:8080/api/v1/Contact/Geo?CityName=Maple%20Grove&StateName=MN';

            let geoPngSource = new ol.layer.Tile({

                minResolution: 6,  // hides or shows based on zoom
                // maxResolution: 10,
                source: new ol.source.XYZ({

                    url: 'http://geo.localhost:8080/api/v1/Address/PngTile/{z}/{x}/{y}.png'
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

            this._map = new ol.Map({
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

            // change mouse cursor when over marker
            // http://jsfiddle.net/jonataswalker/r6f3s6r0/
            this._map.on('pointermove', function (e) {
                // if (e.dragging) {
                //     $(element).popover('destroy');
                //     return;
                // }
                var pixel = popupmap.getEventPixel(e.originalEvent);
                var hit = popupmap.hasFeatureAtPixel(pixel);
                var target = popupmap.getTarget();

                target = typeof target === "string" ?
                    document.getElementById(target) : target;

                target.style.cursor = hit ? 'pointer' : '';

                // popupmap.getTarget().style.cursor = hit ? 'pointer' : '';
            });

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

                    var content = '<h3>' + feature.get('id') + '</h3>';
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


            this._map.getView().on('change:resolution', function (e) {

                // BIGGER the number the closer to the ground and roads
                // LARGER the number the closer to space you are!
                console.log(popupmap.getView().getZoom());

                // if (popupmap.getView().getZoom() > 5) {
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


    // https://gist.github.com/mbertrand/5218300

    getTurfCutter() {
        //https://codepen.io/barbalex/pen/fBpyb
        this.addDrawInteraction();
    }


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

    addLayerSwitcher = (layers: [any]) => {

        //    this.layers = layers;

    }
    toggleLayer = (layer, evt) => {
        evt.target.blur();
        if (layer.getVisible()) {
            layer.setVisible(false);

        } else {
            layer.setVisible(true);
        }

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



    // addInteraction() {
    //     let ol = this.get();
    //     let draw = new ol.interaction.Draw({
    //         source: this._vectorSourceDraw,
    //         type: 'Polygon',
    //         freehand: true
    //     });

    //     this._map.addInteraction(draw);
    //     // this.draw.on('drawend', function () {
    //     //     //let features = this.draw.getSource().getFeatures();
    //     //     let features = this.draw.source.getFeatures();
    //     //     // Go through this array and get coordinates of their geometry.
    //     //     features.forEach(function (feature) {
    //     //         console.log(feature.getGeometry().getCoordinates());
    //     //     });
    //     // });

    // };

    // creates a draw interaction
    addDrawInteraction() {
        //https://codepen.io/barbalex/pen/fBpyb
        // remove other interactions
        popupmap.removeInteraction(select_interaction);
        popupmap.removeInteraction(modify_interaction);
        let start_drawing = false;
        // create the interaction
        draw_interaction = new ol.interaction.Draw({
            // condition: ol.events.condition.singleClick,
            source: vectorGeoDraw.getSource(),
            type: 'Polygon',
            freehand: true
        });
        // add it to the map
        popupmap.addInteraction(draw_interaction);
        draw_interaction.on('drawstart', function (evt) {
            start_drawing = true;
            console.log('start_drawing==true');
        });
        // when a new feature has been drawn...
        draw_interaction.on('drawend', function (event) {
            start_drawing = false;
            // create a unique id
            // it is later needed to delete features
            // var id = uid();
            // give the feature this id
            // event.feature.setId(id);

            //console.log('id='+ id);
            console.log(event.feature);

            // Enable double click zoom after drawing is complete
            // https://gis.stackexchange.com/questions/161930/problem-in-remove-interaction-after-draw-end-in-openlayers-3
            // ol.interaction.defaults({  doubleClickZoom :false });

            // save the changed data
            //saveData(); 
        });
    };



    // // // shows data in textarea
    // // // replace this function by what you need
    // // saveData() {
    // //   // get the format the user has chosen
    // //   var data_type = 'Polygon';  // $data_type.val(),
    // //       // define a format the data shall be converted to
    // //  		format = new ol.format[data_type](),
    // //       // this will be the data in the chosen format
    // //  		data;
    // //   try {
    // //     // convert the data of the vector_layer into the chosen format
    // //     data = format.writeFeatures(vector_layer.getSource().getFeatures());
    // //   } catch (e) {
    // //     // at time of creation there is an error in the GPX format (18.7.2014)
    // //     $('#data').val(e.name + ": " + e.message);
    // //     return;
    // //   }
    // //   if ($data_type.val() === 'GeoJSON') {
    // //     // format is JSON
    // //     $('#data').val(JSON.stringify(data, null, 4));
    // //   } else {
    // //     // format is XML (GPX or KML)
    // //     var serializer = new XMLSerializer();
    // //     $('#data').val(serializer.serializeToString(data));
    // //   }
    // // }

    // build up modify interaction
    // needs a select and a modify interaction working together
    addModifyInteraction() {
        // remove draw interaction
        popupmap.removeInteraction(draw_interaction);
        // create select interaction
        select_interaction = new ol.interaction.Select({
            // make sure only the desired layer can be selected
            layers: function (vector_layer) {
                return vector_layer.get('name') === 'draw_vectorlayer';
            }
        });
        popupmap.addInteraction(select_interaction);

        //   // grab the features from the select interaction to use in the modify interaction
        let selected_features = select_interaction.getFeatures();
        //   // when a feature is selected...
        //   selected_features.on('add', function(event) {
        //     // grab the feature
        //     var feature = event.element;
        //     // ...listen for changes and save them
        //     feature.on('change', saveData);
        //     // listen to pressing of delete key, then delete selected features
        //     $(document).on('keyup', function(event) {
        //       if (event.keyCode == 46) {
        //         // remove all selected features from select_interaction and draw_vectorlayer
        //         selected_features.forEach(function(selected_feature) {
        //           var selected_feature_id = selected_feature.getId();
        //           // remove from select_interaction
        //           selected_features.remove(selected_feature);
        //           // features aus vectorlayer entfernen
        //           var vectorlayer_features = vector_layer.getSource().getFeatures();
        //           vectorlayer_features.forEach(function(source_feature) {
        //             var source_feature_id = source_feature.getId();
        //             if (source_feature_id === selected_feature_id) {
        //               // remove from draw_vectorlayer
        //               vector_layer.getSource().removeFeature(source_feature);
        //               // save the changed data
        //               saveData();
        //             }
        //           });
        //         });
        //         // remove listener
        //         $(document).off('keyup');
        //       }
        //     });
        //   });
        // create the modify interaction
        modify_interaction = new ol.interaction.Modify({
            features: selected_features,
            // delete vertices by pressing the SHIFT key
            deleteCondition: function (event) {
                return ol.events.condition.shiftKeyOnly(event) &&
                    ol.events.condition.singleClick(event);
            }
        });
        // add it to the map
        popupmap.addInteraction(modify_interaction);
    }

// clears the map and the output of the data
deleteTurfMap() {
  vectorGeoDraw.getSource().clear();
  if (select_interaction) {
  	select_interaction.getFeatures().clear();
  }
 // $('#data').val('');
}


} // end