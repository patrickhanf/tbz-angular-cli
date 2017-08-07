import { Component, OnInit, Input, ViewChild, ElementRef, trigger, transition, style, animate } from '@angular/core';
import { OlService } from './ol.service';
import { DialogSaveTurf} from '../dialogs';
import {DialogsService} from '../dialogs/dialogs.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import * as ol from 'openlayers';

import { FeatureVM } from './ol.model.feature';
import { Observable } from 'rxjs/Observable';



let mapGlobal;
let vectorGeoJson;
let vectorGeoPng;
let vectorGeoDraw;
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
    providers: [OlService] // http://developer.telerik.com/topics/web-development/creating-angular-2-injectable-service/
})
export class OlComponent implements OnInit {

    showTurfActions: boolean = false;
    modifyTurfAction: boolean = false;
    modifyTurfActionLabel: string = 'Edit';
   // dialogRef: MdDialogRef<DialogConfirm>;
  //  dialogRefSaveTurf: MdDialogRef<any>;
    ol: any;  // test: https://gist.github.com/borchsenius/5a1ec0b48b283ba65021


    // features: Observable<any>;
    //features: FeatureVM[];

    // features: FeatureVM[]=[ { featureId: 1, name: '', polygon: ''  }]; // See line 572 for code
    features: FeatureVM[] = []; // See line 572 for code
    //features: any[]; // See line 572 for code

    @ViewChild('mymap') refMap: ElementRef; // this will get the element within ol.component.html

    @Input() lnglat: [number, number];
    @Input() zoom: number;

    map: any;
    //private draw; // global so we can remove it later, See: http://openlayers.org/en/latest/examples/draw-freehand.html?q=draw

    
    turfActions = [{ value: 'draw', icon: 'rounded_corner' }, { value: 'modify', icon: '' }];

    //public ols;

    constructor(private olService: OlService, public dialog: MdDialog,public snackBar: MdSnackBar, private dialogsService: DialogsService) {

       // this.ols = olService;
        this.modifyTurfActionLabel = 'Edit';
        //  this.features = [];
    }

    ngOnInit() {
        console.log('ol.component.ngOnInit()');
    }

    ngAfterContentInit() {

        //  console.log('map#id=='+this.refMap.nativeElement.id);
        //  console.log('ol.component.ngAfterContentInit().placeMapFromComponent 1' + this.refMap.nativeElement);
        this.placeMapFromComponent();
        //this.map = this.createMap();
        //this.map.setTarget('premap');
        // this.map.setTarget(this.refMap.nativeElement);
        //this.map.invalidateSize();
        //setTimeout( function() { }, 200);
        console.log('ol.component.ngAfterContentInit().placeMapFromComponent 2');
        // this.olService.placeMap(this.zoom,this.lnglat).then(() => { 
        //         alert("Map loaded by promise!");
        //     });
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
            this.addModifyInteraction();
        }
        else {
            this.addDrawInteraction();
        }
    }

    onTurfActionSaveSelected() {

        this.saveTurfMap();

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

            let customStyleFunction = function (feature, resolution) {
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
                    geoJsonSource, // Working add in during production
                    geoPngSource, // Working add in during production
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

            // mapGlobal.on('click', function (evt) {
            //     // Popup example
            //     // http://plnkr.co/edit/GvdVNE?p=preview
            //     //
            //     if (mapGlobal == null)
            //         alert('_map is null');

            //     let feature = mapGlobal.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            //         return feature;
            //     });
            //     if
            //     (feature) {
            //         let geometry = feature.getGeometry();
            //         let coord = geometry.getCoordinates();

            //         let content = '<h3>' + feature.get('id') + '</h3>';
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


            this.dialogRefSaveTurf = mydailog.open(DialogSaveTurf, { disableClose: true  });
            
            this.dialogRefSaveTurf.afterClosed().subscribe(result => {

            console.log(result);

                if (result !== '') {
                    // Save features  properties from dialog
                    event.feature.setProperties({
                        'id': 0,
                        'name': result,
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


        this.features = []; // clear the last list before saving 

        source_features.forEach(function (selected_feature) {

            let GeoJSONData;
            GeoJSONData = new ol.format.GeoJSON().writeFeature(selected_feature, {
                decimals: 6,
                rightHanded: false,  // false will ALWAYS right the polygon Clockwise
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });

            let rightHandedFeatures = new ol.format.GeoJSON().readFeature(GeoJSONData, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' });

            let poly = new ol.format.WKT().writeFeature(rightHandedFeatures, {
                decimals: 6,
                rightHanded: false,  // false will ALWAYS right the polygon Clockwise
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });
            console.log("CCW WKT== rightHanded: false");
            console.log(poly);
            let featureAttribute = rightHandedFeatures.getProperties();

            let f = new FeatureVM(featureAttribute.id, featureAttribute.name, poly); //JSON.stringify(out, null, 4)

            // https://docs.angularjs.org/api/ng/function/angular.forEach
            // https://stackoverflow.com/questions/15013016/variable-is-not-accessible-in-angular-foreach
            this.features.push(f);
        }, this); // need to pass features into foreach, you could pass just 'this.features' or 'this'

        console.log(this.features);
       

      this.olService.postAPITurfFeatures(this.features)
         .subscribe(data => this.features = data,
         error => console.log(error),
         () => this.showPostResult());


    }
    showPostResult() {
     this.snackBar.open("Good Deal! Your Turf has been saved!", "OK", { duration: 10000,  });
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
            }

        });

    }

} // end export class