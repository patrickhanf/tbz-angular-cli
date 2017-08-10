// https://stackoverflow.com/questions/40852037/angular2-openlayers3-test-fails-when-map-renders-writing-tests-impossible

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthService } from '../../auth.service'; // used for OAuth bearer token below
import { GlobalVariable } from '../../_global/global';

import { TurfVM, FeatureVM } from './ol.model.feature';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OlService {

  featureTEST;
  constructor(private http: Http, private auth: AuthService) {

    console.log("ol.service.constructor()");

  }

  postAPITurfFeatures(features: FeatureVM[]): Observable<any> {

    //let url = GlobalVariable.BASE_API_URL + '/turf';
    console.log('3 host=', window.location.hostname);

    let url = 'http://' + window.location.hostname + ':8080/api/v1/Turf';
    //let url = 'http://zionsFirstNational.localhost:8080/api/v1/Turf';
    //let url = 'http://localhost:8080/api/v1/Turf';

    console.log('1 url=', url);
    console.log('2 data=', features);

    // add authorization header with jwt token
    const header = new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      // 'Content-Type': 'x-www-form-urlencoded',
      // 'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.auth.token
    });
    const options = new RequestOptions({ headers: header });

    let turf = new TurfVM(features);


    let body = JSON.stringify(turf);

    console.log(body);

    // "This observable is cold which means the request won't go out until something subscribes to the observable. aka req.subscribe()"
    const req = this.http.post(url, body, options);
     req.map((response: Response) => <any>response);
    // req.subscribe();
       
    //   .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
    //   //.do(x => console.log(x)); // debug line working. 4-13-17


    // console.log("Done posting open layers features...", responsex);
    return req;

  }


  // get(): any {
  //     return ol;
  // }

  // getMapPolygon() {
  //     let ol = this.get();
  //     var poly = mapGlobal.getView().calculateExtent(mapGlobal.getSize());

  //     //var poly = mapGlobal.getExtent().toGeometry().toString();

  //     console.log(poly);
  // }

  // placeMap() {
  //     return new Promise((resolve, reject) => {  // https://stackoverflow.com/questions/40126630/angular-2-waiting-for-boolean-to-be-true-before-executing-service

  //         let ol = this.get();

  //        // alert('ol.service map');
  //         // Both lnglat and zoom need to be set or map does not load
  //         this.lnglat = [-93.49401, 45.08203];
  //         this.zoom = 10;

  //         var vectorStyle = new ol.style.Style({
  //             image: new ol.style.Circle({
  //                 radius: 4,
  //                 fill: new ol.style.Fill({
  //                     color: '#1b465a'
  //                 }),
  //                 stroke: new ol.style.Stroke({
  //                     color: '#020815',
  //                     width: 1
  //                 })
  //             })
  //         });

  //         var customStyleFunction = function (feature, resolution) {
  //             //debug  console.log('resolution='+resolution);

  //             let strokecolor;
  //             let _radius = 4;

  //             //    if (resolution > 14)
  //             //      _radius = 3;
  //             //    else
  //             //      _radius = 10;

  //             if (feature.get('source') === 'navteq') { // black icon
  //                 strokecolor = '#133277';
  //             } else if (feature.get('source') === '') { // blue
  //                 strokecolor = '#f61212';
  //             } else {
  //                 strokecolor = '#198cff';
  //             }

  //             return [new ol.style.Style({
  //                 image: new ol.style.Circle({
  //                     // fill: new ol.style.Fill({
  //                     //     color: '#1b465a'
  //                     // }),
  //                     stroke: new ol.style.Stroke({
  //                         color: strokecolor,
  //                         width: 1
  //                     }),
  //                     radius: _radius
  //                 })
  //             })];
  //         };

  //         let OSM = new ol.layer.Tile({
  //             //source: new ol.source.Stamen({ layer: 'watercolor' })
  //             //source: new ol.source.Stamen({ layer: 'toner' })
  //             //source: new ol.source.Stamen({ layer: 'toner-lines' })
  //             source: new ol.source.Stamen({ layer: 'terrain' })
  //             //source: ol.source.BingMaps({}),
  //             //source: new ol.source.OSM(),
  //             // maxResolution: 50, // was 20 
  //         });

  //         let geoJsonSource = new ol.layer.VectorTile({
  //             // style: function(feature, resolution) {
  //             //    console.log('resolution='+resolution);
  //             // },
  //             style: customStyleFunction, // <= working style from above
  //             // minResolution: 1, // was 0
  //             maxResolution: 9, // was 20 
  //             source: new ol.source.VectorTile({

  //                 projection: 'EPSG:3857',
  //                 name: "homes",
  //                 format: new ol.format.GeoJSON({ defaultProjection: 'EPSG:4326' }),
  //                 // tilePixelRatio: 16,
  //                 tileGrid: ol.tilegrid.createXYZ({
  //                     tileSize: [256, 256],
  //                     extent: ol.proj.get('EPSG:3857').getExtent(),
  //                 }),
  //                 url: 'http://www.geo.localhost:8080/api/v1/Address/GeoTile/{z}/{x}/{y}.json'

  //             })
  //         });

  //         //tiledSource.setVisible(false);
  //         // this._vectorLayerGeoJson = vectorgeojson.setVisible();

  //         // 'http://geocode.localhost:8080/api/v1/Contact/Geo?CityName=Maple%20Grove&StateName=MN';

  //         let geoPngSource = new ol.layer.Tile({

  //             minResolution: 6,  // hides or shows based on zoom
  //             // maxResolution: 10,
  //             source: new ol.source.XYZ({
  //                 url: 'http://www.geo.localhost:8080/api/v1/Address/PngTile/{z}/{x}/{y}.png'
  //             })
  //         });

  //         // https://codepen.io/barbalex/pen/fBpyb
  //         // create a vector layer used for editing

  //         let geoDrawSource = new ol.layer.Vector({
  //             name: 'draw_vectorlayer',
  //             source: new ol.source.Vector(),
  //             style: new ol.style.Style({
  //                 fill: new ol.style.Fill({
  //                     color: 'rgba(255, 255, 255, 0.2)'
  //                 }),
  //                 stroke: new ol.style.Stroke({
  //                     color: '#3393ff', // #ffcc33',
  //                     width: 4
  //                 }),
  //                 image: new ol.style.Circle({
  //                     radius: 7,
  //                     fill: new ol.style.Fill({
  //                         color: '#ffcc33'
  //                     })
  //                 })
  //             })
  //         });

  //         //
  //         // Move vectors to global
  //         //
  //         vectorGeoJson = geoJsonSource;
  //         vectorGeoPng = geoPngSource;
  //         vectorGeoDraw = geoDrawSource;

  //         this._map = new ol.Map({
  //             target: 'map',
  //             interactions: ol.interaction.defaults({ doubleClickZoom: false }), // disable zoom double click
  //             layers: [
  //                 OSM,
  //                 geoJsonSource,
  //                 geoPngSource,
  //                 geoDrawSource, // Polygon drawing

  //             ],
  //             //renderer: 'canvas', // required for vector tiles
  //             view: new ol.View({

  //                 center: ol.proj.fromLonLat(this.lnglat),
  //                 zoom: 10, // this.zoom,
  //                 minZoom: 5,
  //                 maxZoom: 18,
  //                 projection: ol.proj.get('EPSG:3857'),
  //                 displayProjection: ol.proj.get("EPSG: 4326")
  //             })
  //         });

  //         mapGlobal = this._map; // Need for click popups;

  //         /**
  //          * Popup
  //          **/
  //         var container = document.getElementById('ol-popup');
  //         var content_element = document.getElementById('ol-popup-content');
  //         var closer = document.getElementById('ol-popup-closer');

  //         closer.onclick = function () {
  //             overlay.setPosition(undefined);
  //             closer.blur();
  //             return false;
  //         };

  //         var overlay = new ol.Overlay({
  //             element: container,
  //             autoPan: true,
  //             offset: [0, -10]
  //         });
  //         this._map.addOverlay(overlay);

  //         var fullscreen = new ol.control.FullScreen();
  //         this._map.addControl(fullscreen);

  //         // change mouse cursor when over marker
  //         // http://jsfiddle.net/jonataswalker/r6f3s6r0/
  //         this._map.on('pointermove', function (e) {
  //             // if (e.dragging) {
  //             //     $(element).popover('destroy');
  //             //     return;
  //             // }
  //             var pixel = mapGlobal.getEventPixel(e.originalEvent);
  //             var hit = mapGlobal.hasFeatureAtPixel(pixel);
  //             var target = mapGlobal.getTarget();

  //             target = typeof target === "string" ?
  //                 document.getElementById(target) : target;

  //             target.style.cursor = hit ? 'pointer' : '';

  //             // mapGlobal.getTarget().style.cursor = hit ? 'pointer' : '';
  //         });

  //         this._map.on('click', function (evt) {
  //             // Popup example
  //             // http://plnkr.co/edit/GvdVNE?p=preview
  //             //
  //             if (mapGlobal == null)
  //                 alert('_map is null');

  //             var feature = mapGlobal.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
  //                 return feature;
  //             });
  //             if
  //             (feature) {
  //                 var geometry = feature.getGeometry();
  //                 var coord = geometry.getCoordinates();

  //                 var content = '<h3>' + feature.get('id') + '</h3>';
  //                 content += '<h5>' + feature.get('address') + '</h5>';
  //                 content += '<br><h5>' + feature.get('source') + '</h5>';


  //                 content_element.innerHTML = content;
  //                 //    content_element.innerHTML = "Hello";
  //                 overlay.setPosition(coord);

  //                 console.info(feature.getProperties());
  //             }
  //             else {
  //                 overlay.setPosition(undefined);
  //             }
  //         });


  //         this._map.getView().on('change:resolution', function (e) {

  //             // BIGGER the number the closer to the ground and roads
  //             // LARGER the number the closer to space you are!
  //             console.log(mapGlobal.getView().getZoom());

  //             // if (mapGlobal.getView().getZoom() > 5) {
  //             //   this._vectorLayerGeoJson.setVisible(false);
  //             //   this._vectorSource.setVisible(true);
  //             // }
  //             // else {
  //             //   this._vectorSource.setVisible(true);
  //             //   this._vectorLayerGeoJson.setVisible(true);
  //             // }
  //         });



  //         resolve(true); // or false

  //         // return this._vectorSource;

  //     }); // end promise
  // }


  // // https://gist.github.com/mbertrand/5218300

  // // getTurfCutter() {
  // //     //https://codepen.io/barbalex/pen/fBpyb
  // //     this.addDrawInteraction();
  // // }

  // getVector() {
  //     return this._vectorSource;
  // }

  // ///
  // /// https://gis.stackexchange.com/questions/146691/loading-geojson-via-ajax-after-adding-layer-to-openlayers-3
  // /// 
  // addGeoJson(geojsonObject) {

  //     let ol = this.get();

  //     console.log('before loading GeoJSON!');


  //     // this.getMapPolygon();

  //     // let iconStyle = new ol.style.Style({
  //     //     image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
  //     //         opacity: 0.75,
  //     //         anchor: [0.5, 1],
  //     //         src: '//cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/location-alt-32.png'
  //     //     }))
  //     // });

  //     console.log('loading GeoJson count=' + geojsonObject.features.length);

  //     let projection = mapGlobal.getView().getProjection();

  //     //console.log('projection=');
  //     //console.log(projection);

  //     let myNewGeoJSON = new ol.format.GeoJSON();
  //     let featuresSearch = myNewGeoJSON.readFeatures(geojsonObject, { featureProjection: projection });

  //     // console.log(featuresSearch);


  //     if (this._vectorSourceGeoJson == null)
  //         console.log("addGeoJson() => this._vectorSourceGeoJson == null");

  //     this._vectorSourceGeoJson.addFeatures(featuresSearch);

  //     this._vectorSourceGeoJson.changed();


  //     console.log('done loading GeoJSON!');

  // }

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



} // end