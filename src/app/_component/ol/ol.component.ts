import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, trigger, transition, style, animate } from '@angular/core';
import { OlService } from './ol.service';
import { DialogSaveTurf } from '../dialogs';
import { DialogsService } from '../dialogs/dialogs.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import * as ol from 'openlayers';

import { FeatureEnums } from '../../_global/global.enums';
import { FeatureVM } from './ol.model.feature';

import { Observable } from 'rxjs/Observable';

import { GlobalVariable } from '../../_global/global';


let myopen;
let mapGlobal;
let vectorGeoJson;
let vectorGeoPng;
let vectorGeoDraw;
let mapTileQuery = '';
// make interactions global so they can later be removed
let select_interaction, draw_interaction, modify_interaction;

@Component({
    selector: 'app-map',
    animations: [
        trigger(
            'enterAnimationFab', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate('300ms', style({ opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ opacity: 1 }),
                    animate('300ms', style({ opacity: 0 }))
                ])
            ]
        )
    ],
    templateUrl: './ol.component.html',
    styleUrls: ['./ol.component.css'],
    providers: [OlService, ] // http://developer.telerik.com/topics/web-development/creating-angular-2-injectable-service/
})
export class OlComponent implements OnInit {

    // @Output() openViewTurfPanel: EventEmitter<FeatureVM> = new EventEmitter();
    @Output() openViewEditPanel: EventEmitter<object> = new EventEmitter();



    public showTurfActions: boolean = false;
    modifyTurfAction: boolean = false;
    modifyTurfActionLabel: string = 'Edit';
    // mapTileQuery: string;
    // dialogRef: MdDialogRef<DialogConfirm>;
    //  dialogRefSaveTurf: MdDialogRef<any>;
    ol: any;  // test: https://gist.github.com/borchsenius/5a1ec0b48b283ba65021

    // features: FeatureVM[]=[ { featureId: 1, name: '', polygon: ''  }]; // See line 572 for code
    featuresNew: FeatureVM[] = []; // See line 572 for code
    featuresEdit: FeatureVM[] = []; // See line 572 for code
    //features: any[]; // See line 572 for code

    @ViewChild('mymap') refMap: ElementRef; // this will get the element within ol.component.html

    @Input() lnglat: [number, number];
    @Input() zoom: number;

    map: any;

    turfActions = [{ value: 'draw', icon: 'rounded_corner' }, { value: 'modify', icon: '' }];

    constructor(private olService: OlService, public dialog: MdDialog, public snackBar: MdSnackBar, private dialogsService: DialogsService) {


        this.modifyTurfActionLabel = 'Edit';


    }

    ngOnInit() {
        console.log('ol.component.ngOnInit()');
    }

    ngAfterContentInit() {

        //  console.log('map#id=='+this.refMap.nativeElement.id);
        //  console.log('ol.component.ngAfterContentInit().placeMapFromComponent 1' + this.refMap.nativeElement);

        this.placeMapFromComponent();
        console.log('ol.component.ngAfterContentInit().placeMapFromComponent 2');


        // this.olService.placeMap(this.zoom,this.lnglat).then(() => { 
        //         alert("Map loaded by promise!");
        //     });
    }

    customStyleFunction = function (feature, resolution) {
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

    geoGeoJsonBuildLayer = function () {
        let ol = this.get();
        let geoJsonSource = new ol.layer.VectorTile({
            // style: function(feature, resolution) {
            //    console.log('resolution='+resolution);
            // },
            style: this.customStyleFunction, // <= working style from above
            // minResolution: 1, // was 0
            maxResolution: 6, // testing was 9 
            source: new ol.source.VectorTile({

                projection: 'EPSG:3857',
                name: "homes",
                format: new ol.format.GeoJSON({ defaultProjection: 'EPSG:4326' }),

                tileGrid: ol.tilegrid.createXYZ({
                    tileSize: [256, 256],
                    extent: ol.proj.get('EPSG:3857').getExtent(),
                }),
                //url: 'http://www.geo.localhost:8080/api/v1/Address/GeoTile/{z}/{x}/{y}.json'
                tileUrlFunction: this.geoJsontileUrlFunction

            })
        });
        return geoJsonSource;
    };

    geoPngBuildLayer = function () {
        let ol = this.get();
        let geoPngSource = new ol.layer.Tile({

            minResolution: 6,  // hides or shows based on zoom
            // maxResolution: 10,
            tileGrid: ol.tilegrid.createXYZ({
                tileSize: [256, 256],
                extent: ol.proj.get('EPSG:3857').getExtent(),
            }),
            source: new ol.source.XYZ({
                //url: 'http://geo.localhost:8080/api/v1/Address/PngTile/{z}/{x}/{y}.png',
                //params: { 'tilecolor': '#FFCC66' },
                tileUrlFunction: this.geoPngtileUrlFunction
            })
        });
        return geoPngSource;
    };


    geoPngtileUrlFunction = function (tileCoord, pixelRatio, projection) {
        // PRH CUSTOM Url for - tileCoord is representing the location of a tile in a tile grid (z, x, y)
        let z = tileCoord[0];
        let x = tileCoord[1];
        let y = -tileCoord[2] - 1;

        //console.log('2 query?', mapTileQuery);

        //var path = 'http://geo.localhost:8080/api/v1/Address/PngTile';
        GlobalVariable
        //let path = 'http://' + window.location.hostname + ':8080/api/v1/Address/PngTile';
        let path = GlobalVariable.BASE_API_URL + '/Address/PngTile';

        path += '/' + z + '/' + x + '/' + y + '.png?';
        path += mapTileQuery;

        if (mapTileQuery === '')
            path += 'time=' + new Date().getTime();
        else
            path += '&time=' + new Date().getTime();

        return path;
    };

    geoJsontileUrlFunction = function (tileCoord, pixelRatio, projection) {
        // PRH CUSTOM Url for - tileCoord is representing the location of a tile in a tile grid (z, x, y)
        let z = tileCoord[0];
        let x = tileCoord[1];
        let y = -tileCoord[2] - 1;

        //console.log('2 query?', mapTileQuery);

        //let path = 'http://geo.localhost:8080/api/v1/Address/GeoTile';

        // let path = 'http://' + window.location.hostname + ':8080/api/v1/Address/GeoTile';
        let path = GlobalVariable.BASE_API_URL + '/Address/GeoTile';


        path += '/' + z + '/' + x + '/' + y + '.json?';
        path += mapTileQuery;

        if (mapTileQuery === '')
            path += 'time=' + new Date().getTime();
        else
            path += '&time=' + new Date().getTime();

        return path;
    };

    getAPIMapTile(searchVM) {
        console.log("2 from ol.component.ts", searchVM);

        var params = {
            'tilecolor': searchVM.address.hexColor,
            'street': searchVM.address.street,
            'street2': searchVM.address.street2,
            'city': searchVM.address.city,
            'zipcode': searchVM.address.zipcode,
        };

        mapTileQuery = this.getAsUriParameters(params);

        console.log(1, mapTileQuery);

        vectorGeoPng.setVisible(false);

        mapGlobal.removeLayer(vectorGeoPng);

        let geoPngSource = this.geoPngBuildLayer();
        vectorGeoPng = geoPngSource;
        mapGlobal.addLayer(geoPngSource);

        // let geoJsonSource = this.geoPngBuildLayer();
        // vectorGeoJson = geoJsonSource;
        // mapGlobal.addLayer(geoJsonSource);

        console.log(3, mapTileQuery);

    }

    //
    // https://stackoverflow.com/questions/14525178/is-there-any-native-function-to-convert-json-to-url-parameters
    //  

    getAsUriParameters(data) {
        var url = '';
        for (var prop in data) {

            if (data[prop] !== undefined) {
                url += encodeURIComponent(prop) + '=' +
                    encodeURIComponent(data[prop]) + '&';
            }
        }
        return url.substring(0, url.length - 1)
    }


    onResizeMapWindow(event) {
        console.log('map width=' + event.target.innerWidth);
        mapGlobal.updateSize();
    }

    onTurfActionClick() {

        // First Toggle window
        this.showTurfActions = !this.showTurfActions;

        // Issue below is up because the angular model is out-of-sync with the event.
        // https://github.com/angular/material2/issues/448
        console.log('clicked onTurfActionClick()' + this.showTurfActions);

        //this.olService.getTurfCutter(select_interaction, modify_interaction);


        if (this.showTurfActions) {
            this.addDrawInteraction();
        }
        else {
            this.removeAllEditInteraction();
        }

        // if (selected == 'draw')
        //     this.olService.addDrawInteraction();
        // else
        //     this.olService.addModifyInteraction();
    }

    onTurfActionModifyChecked() {

        console.log('clicked onTurfActionModifyChecked()' + this.modifyTurfAction);

        // For some reason the checkbox is inverted with screen, could be related to 
        // material theme.
        if (!this.modifyTurfAction) {

            // trigger event to open rightside edit panel

            this.addModifyInteraction();
        }
        else {
            this.addDrawInteraction();
        }
    }

    onTurfActionSaveSelected() {

        this.saveTurfMap();

    }

    onTurfActionLoadTurfs() {
        // https://stackoverflow.com/questions/43394144/angular-2-how-to-access-an-http-response-body
        this.olService.getAPITurfFeatures()
            .subscribe(data => this.loadfeatures(data.json()),
            error => console.log(error),
            () => this.showPostResult("All Turfs Loaded.."));

    }

    loadfeatures(geojsonObject) {
        // 
        console.log('geojsonObject 1:', geojsonObject);
        let vectorSource = vectorGeoDraw.getSource();

        //let testx = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-93.91355,45.173108],[-93.945283,45.17335],[-93.950433,45.140666],[-93.909234,45.136065],[-93.91355,45.173108]]]},"properties":{"id":5,"name":"MEP 40","source":"turf"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-93.409019,44.917113],[-93.409105,44.911445],[-93.406809,44.911475],[-93.406874,44.912524],[-93.403119,44.912554],[-93.403162,44.917037],[-93.409019,44.917113]]]},"properties":{"id":6,"name":"Hopkins Park Valley","source":"turf"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-93.40694,44.915189],[-93.40694,44.914041],[-93.406522,44.913996],[-93.406554,44.915166],[-93.40694,44.915189]]]},"properties":{"id":7,"name":"Hopkins Park Valley - 5th Ave","source":"turf"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-94.221854,45.386178],[-94.333091,45.333106],[-94.164176,45.318623],[-94.221854,45.386178]]]},"properties":{"id":8,"name":"Bobs Burgers","source":"turf"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-93.454682,44.891912],[-93.459338,44.885527],[-93.455282,44.886363],[-93.453695,44.886029],[-93.45215,44.886317],[-93.450841,44.885816],[-93.449896,44.886013],[-93.44921,44.886591],[-93.447901,44.88688],[-93.446463,44.891532],[-93.454682,44.891912]]]},"properties":{"id":9,"name":"Kevs Walk","source":"turf"}}]};
        //let geojsonObject = testx;

        let features = new ol.format.GeoJSON().readFeatures(geojsonObject, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        });

        vectorSource.addFeatures(features);

    }

    onTurfActionDelete() {
        // https://medium.com/@tarik.nzl/making-use-of-dialogs-in-material-2-mddialog-7533d27df41
        //this.olService.deleteTurfMap();
        this.dialogDeleteTurfMap();
    }

    get(): any {
        return ol;
    }

    createMap() {
        return new ol.Map({
            //target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            renderer: 'canvas',
            view: new ol.View({
                center: [-7940419.278284204, 5716479.015326825],
                zoom: 9,
                rotation: 0
            })
        })
    }

    placeMapFromComponent() {
        return new Promise((resolve, reject) => {  // https://stackoverflow.com/questions/40126630/angular-2-waiting-for-boolean-to-be-true-before-executing-service

            let ol = this.get();

            // Both lnglat and zoom need to be set or map does not load
            this.lnglat = [-93.49401, 45.08203];
            this.zoom = 10;

            let vectorStyle = new ol.style.Style({
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
                source: new ol.source.OSM(),
                // maxResolution: 50, // was 20 
            });



            //tiledSource.setVisible(false);
            // this._vectorLayerGeoJson = vectorgeojson.setVisible();

            // 'http://geocode.localhost:8080/api/v1/Contact/Geo?CityName=Maple%20Grove&StateName=MN';




            // https://codepen.io/barbalex/pen/fBpyb
            // create a vector layer used for editing

            let geoDrawSource = new ol.layer.Vector({
                name: 'draw_vectorlayer',
                source: new ol.source.Vector(),
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        //  color: 'rgba(255, 255, 255, 0.2)' // white
                        color: 'rgba(51, 147, 255, 0.2)' // blue from #3393ff below
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
            let geoPngSource = this.geoPngBuildLayer();
            let geoJsonSource = this.geoGeoJsonBuildLayer();
            vectorGeoJson = geoJsonSource;
            vectorGeoPng = geoPngSource;
            vectorGeoDraw = geoDrawSource;

            //
            // Custom Material zoom in out controls
            // https://gis.stackexchange.com/questions/162967/zoom-in-out-on-click-in-openlayers-3
            //

            document.getElementById('fab-zoomin').addEventListener('click', function (e) {
                mapGlobal.getView().setZoom(mapGlobal.getView().getZoom() + .5);
            }, false);

            document.getElementById('fab-zoomout').addEventListener('click', function (e) {
                mapGlobal.getView().setZoom(mapGlobal.getView().getZoom() - .5);
            }, false);

            mapGlobal = new ol.Map({
                // target: this.refMap.id, // 'map'
                interactions: ol.interaction.defaults({ doubleClickZoom: false }), // disable zoom double click
                layers: [
                    OSM,
                    geoPngSource, // Working add in during production
                    geoDrawSource, // Polygon drawing
                    geoJsonSource, // Working add in during production
                ],
                //renderer: 'canvas', // required for vector tiles
                view: new ol.View({

                    center: ol.proj.fromLonLat(this.lnglat),
                    zoom: 10, // this.zoom,
                    minZoom: 5,
                    maxZoom: 18,
                    projection: ol.proj.get('EPSG:3857'),
                    displayProjection: ol.proj.get("EPSG: 4326")
                }),
                controls: ol.control.defaults({
                    zoom: false,
                    attribution: true,
                    rotate: false
                }).extend([
                    // xzoomOutControl
                    //   new ol.control.Control({ element: buttonZoomOut }),
                    //  new ol.control.Control({ element: buttonZoomIn })
                ])
            });

            // mapGlobal.setLayerIndex(geoPngSource, 2);
            // mapGlobal.setLayerIndex(geoDrawSource, 2);
            // mapGlobal.setLayerIndex(geoJsonSource, 99);
            mapGlobal.setTarget(this.refMap.nativeElement);
            // alert('ol.component map');
            // mapGlobal = this._map; // Need for click popups;

            /**
             * Popup
             **/
            // let container = document.getElementById('ol-popup');
            // let content_element = document.getElementById('ol-popup-content');
            // let closer = document.getElementById('ol-popup-closer');

            // closer.onclick = function () {
            //     overlay.setPosition(undefined);
            //     closer.blur();
            //     return false;
            // };

            // let overlay = new ol.Overlay({
            //     element: container,
            //     autoPan: true,
            //     offset: [0, -10]
            // });
            // mapGlobal.addOverlay(overlay);

            // let fullscreen = new ol.control.FullScreen();
            // mapGlobal.addControl(fullscreen);

            // // change mouse cursor when over marker
            // // http://jsfiddle.net/jonataswalker/r6f3s6r0/
            // mapGlobal.on('pointermove', function (e) {
            //     // if (e.dragging) {
            //     //     $(element).popover('destroy');
            //     //     return;
            //     // }
            //     let pixel = mapGlobal.getEventPixel(e.originalEvent);
            //     let hit = mapGlobal.hasFeatureAtPixel(pixel);
            //     let target = mapGlobal.getTarget();

            //     target = typeof target === "string" ?
            //         document.getElementById(target) : target;

            //     target.style.cursor = hit ? 'pointer' : '';

            //     // mapGlobal.getTarget().style.cursor = hit ? 'pointer' : '';
            // });

            // we need to move the event object so the function below
            // can use it otherwise you get err: Cannot read property 'emit' of undefined
            // this is Commonly caused by wrong "this".
            //
            let _openViewEditPanel = this.openViewEditPanel;

            mapGlobal.on('click', function (evt) {
                // Popup example
                // http://plnkr.co/edit/GvdVNE?p=preview
                //
                if (mapGlobal == null)
                    alert('_map is null');

                let feature = mapGlobal.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                    return feature;
                });

                if (feature) {
                    // let geometry = _feature.getGeometry();
                    // let coord = geometry.getCoordinates();
                    // let content = '<h3>' + _feature.get('id') + '</h3>';
                    // content += '<h5>' + _feature.get('address') + '</h5>';
                    // content += '<br><h5>' + _feature.get('source') + '</h5>';

                    let _source = feature.get('source');
                    let _id = Number(feature.get('id'));
                    let _type = Number(feature.get('type'));
                    let _name = feature.get('name');

                    let f = new FeatureVM(_id, _name, _type, null, null);

                    _openViewEditPanel.emit({ open: true, feature: f });

                    //content_element.innerHTML = content;
                    //    content_element.innerHTML = "Hello";
                    //overlay.setPosition(coord);

                    console.info(feature.getProperties());
                }
                else {
                    // overlay.setPosition(undefined);
                    console.info('else');
                    _openViewEditPanel.emit({ open: false, feature: null });
                }
            });


            mapGlobal.getView().on('change:resolution', function (e) {

                // BIGGER the number the closer to the ground and roads
                // LARGER the number the closer to space you are!

                // THIS IS FOR DEBUGGING ZOOM WITH Web.APIs
                // console.log(mapGlobal.getView().getZoom());

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
    } // end placeMapFromComponent


    removeAllEditInteraction() {
        // remove draw interaction
        mapGlobal.removeInteraction(draw_interaction);
        mapGlobal.removeInteraction(select_interaction);
        mapGlobal.removeInteraction(modify_interaction);

        if (typeof draw_interaction !== "undefined") {
            //  alert("draw_interaction");
            draw_interaction = null;
        }

        if (typeof select_interaction !== "undefined") {
            // alert("select_interaction");
            select_interaction = null;
        }

        if (typeof modify_interaction !== "undefined") {
            // alert("modify_interaction");
            modify_interaction = null;
        }

        this.modifyTurfAction = false;

    }

    // creates a draw interaction
    addDrawInteraction() {
        //https://codepen.io/barbalex/pen/fBpyb
        // remove other interactions
        mapGlobal.removeInteraction(select_interaction);
        mapGlobal.removeInteraction(modify_interaction);

        // create the interaction
        draw_interaction = new ol.interaction.Draw({
            // condition: ol.events.condition.singleClick,
            source: vectorGeoDraw.getSource(),
            type: 'Polygon',
            freehand: false
        });
        // add it to the map
        mapGlobal.addInteraction(draw_interaction);
        draw_interaction.on('drawstart', function (event) {
            console.log('start_drawing==true');
        });
        // when a new feature has been drawn...
        let mydailog = this.dialog;
        draw_interaction.on('drawend', function (event) {


            this.dialogRefSaveTurf = mydailog.open(DialogSaveTurf, { disableClose: true });

            this.dialogRefSaveTurf.afterClosed().subscribe(result => {

                console.log(result);

                if (result !== '') {
                    // Save features  properties from dialog
                    event.feature.setProperties({
                        'id': 0,
                        'name': result,
                        'source': 'turf',
                        'type': FeatureEnums.Turf
                    }, this);
                }
                else {
                    // https://stackoverflow.com/questions/45441471/openlayers-3-remove-drawn-feature
                    //                   let deletefeature = vectorGeoDraw.getFeatures();
                    //                  this.vectorGeoDraw.removeFeature(this.vectorGeoDraw.features[deletefeature.length-1]);
                    // draw_interaction.fea .source.feature.remove();
                    // event.feature.remove();
                }
                this.dialogRefSaveTurf = null;
            });

            // create a unique id
            // it is later needed to delete features
            // let id = uid();
            // give the feature this id
            // event.feature.setId(id);

            console.log(event.feature, event.feature.getProperties());

            // Enable double click zoom after drawing is complete
            // https://gis.stackexchange.com/questions/161930/problem-in-remove-interaction-after-draw-end-in-openlayers-3
            // ol.interaction.defaults({  doubleClickZoom :false });

            // save the changed data
            //saveTurfMap(); 
            this.dialogRef = null;
            return;
        });
    }

    // build up modify interaction
    // needs a select and a modify interaction working together
    addModifyInteraction() {
        // remove draw interaction
        mapGlobal.removeInteraction(draw_interaction);
        // create select interaction
        select_interaction = new ol.interaction.Select({
            // make sure only the desired layer can be selected
            layers: function (vector_layer) {
                return vector_layer.get('name') === 'draw_vectorlayer';
            }
        });
        mapGlobal.addInteraction(select_interaction);

        //   // grab the features from the select interaction to use in the modify interaction
        let selected_features = select_interaction.getFeatures();

        //source_feature.getId();

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
        mapGlobal.addInteraction(modify_interaction);
    }

    saveTurfMap() {

        let source = vectorGeoDraw.getSource();
        if (source.getFeatures().length === 0) {
            this.dialogsService.ok("No Turfs Created", "Oh no, you haven't created any turfs to save.").subscribe(result => { return; });
        }
        // grab the features from the select interaction to use in the modify interaction
        let source_features = source.getFeatures();


        console.log("Looping selected_features" + source_features);


        this.featuresNew = []; // clear the last list before saving 
        this.featuresEdit = []; // clear the last list before saving 

        source_features.forEach(function (selected_feature) {

            let polyGeoJSON;
            polyGeoJSON = new ol.format.GeoJSON().writeFeature(selected_feature, {
                decimals: 6,
                rightHanded: true,  // false will ALWAYS right the polygon Clockwise - we need to store left handed
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });

            console.log('geojson LH=', polyGeoJSON);

            let GeoJSONDataRightHanded;
            GeoJSONDataRightHanded = new ol.format.GeoJSON().writeFeature(selected_feature, {
                decimals: 6,
                rightHanded: false,  // false will ALWAYS right the polygon Clockwise
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });

            console.log('geojson RH=', GeoJSONDataRightHanded);


            let rightHandedFeatures = new ol.format.GeoJSON().readFeature(GeoJSONDataRightHanded, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' });

            let polyWKT = new ol.format.WKT().writeFeature(rightHandedFeatures, {
                decimals: 6,
                rightHanded: false,  // false will ALWAYS right the polygon Clockwise
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });
            //console.log("CCW WKT== rightHanded: false");
            console.log('poly=', polyWKT);
            let featureAttribute = rightHandedFeatures.getProperties();

            let f = new FeatureVM(featureAttribute.id, featureAttribute.name, FeatureEnums.Turf, polyWKT, polyGeoJSON); //JSON.stringify(out, null, 4)

            if (featureAttribute.id === 0) {
                this.featuresNew.push(f);
            }
            else {
                this.featuresEdit.push(f);
            }



            // https://docs.angularjs.org/api/ng/function/angular.forEach
            // https://stackoverflow.com/questions/15013016/variable-is-not-accessible-in-angular-foreach

        }, this); // need to pass features into foreach, you could pass just 'this.features' or 'this'

        console.log(this.featuresNew);


        this.olService.postAPITurfFeatures(this.featuresNew)
            .subscribe(data => this.featuresNew = data,
            error => console.log(error),
            () => this.showPostResult("Good Deal! Your Turf has been saved!"));


    }


    showPostResult(message) {
        this.snackBar.open(message, "OK", { duration: 5000, });
    }
    // shows data in textarea
    // replace this function by what you need
    // Source: https://codepen.io/barbalex/pen/fBpyb

    // clears the map and the output of the data
    dialogDeleteTurfMap() {

        this.dialogsService.confirm("Delete Turfs", "Are you sure you want to delete all turf(s)?").subscribe(result => {

            if (result) {
                // do confirmation actions
                vectorGeoDraw.getSource().clear();
                if (select_interaction) {
                    select_interaction.getFeatures().clear();
                }

                this.showPostResult("Deleted All Turfs...")
            }

        });

    }



    // addLayerSwitcher = (layers: [any]) => {

    //     //    this.layers = layers;

    // }
    // toggleLayer = (layer, evt) => {
    //     evt.target.blur();
    //     if (layer.getVisible()) {
    //         layer.setVisible(false);

    //     } else {
    //         layer.setVisible(true);
    //     }

    // }

    // addMarker(coords: [number, number], name: string, id: string) {
    //     let ol = this.get();
    //     //let vectorSourceTest = this.olService.vectorSource;
    //     //this.vectorSource = this.olService.getLayer();
    //     let iconFeature = new ol.Feature({
    //         geometry: new ol.geom.Point(ol.proj.transform(coords, 'EPSG:4326', 'EPSG:3857')),
    //         name: name,
    //         id: id,
    //     });

    //     let iconStyle = new ol.style.Style({
    //         image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
    //             opacity: 0.75,
    //             anchor: [0.5, 1],
    //             src: '//cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/location-alt-32.png'
    //         }))
    //     });

    //     iconFeature.setStyle(iconStyle);

    //     // if (this.vectorSource === undefined)
    //     //     console.log("addMarker() => this.vectorSource === undefined");

    //     if (this._vectorSource == null)
    //         console.log("addMarker() => vectorSource == null");

    //     this._vectorSource.addFeature(iconFeature);
    //     //this._vectorSource.changed();
    //     //alert('added marker:' + name);
    // }

    // addPolygon(polygon: [[number, number]], name: string, id: string) {
    //     let ol = this.get();
    //     let projectedPolygon = [];

    //     for (let poly of polygon) {
    //         projectedPolygon.push(ol.proj.transform(poly, 'EPSG:4326', 'EPSG:3857'));
    //     }

    //     let p = new ol.geom.Polygon([projectedPolygon]);

    //     let featurething = new ol.Feature({
    //         name: name,
    //         id: id,
    //         geometry: p
    //     });

    //     // let vector = this.getVector();
    //     this._vectorSource.addFeature(featurething);

    // };


} // end export class