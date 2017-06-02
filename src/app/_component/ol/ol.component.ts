import { Component, OnInit, Input } from '@angular/core';
import { OlService } from './ol.service';
import * as ol from 'openlayers';


var map;

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

    //private map;
    public layers = [];
    public vectorSource;
    private vectorDraw;
    private vectorSourceDraw;

    constructor(private olService : OlService) {
       
     
       //this.vectorSource = this.olService.vector;
     //  this.olservice.lnglat = this.lnglat; // [-93.49401, 45.08203];
    //   this.olservice.zoom = this.zoom; // 7;

        //this.olService.vectorSource = this.olService.addLayer();

    }

    createMap = () => {
        let ol = this.olService.get();
       
      //  this.vectorSource = this.olService.vector = new ol.source.Vector({});
        // this.vectorSource = new ol.source.Vector({});
        // define layers

        this.vectorSourceDraw = new ol.source.Vector({ wrapX: false });
        this.vectorDraw = new ol.layer.Vector({
            source: this.vectorSourceDraw
        });

        let OSM = new ol.layer.Tile({
            source: new ol.source.OSM()
        });
        OSM.set('name', 'Openstreetmap');


        let geography = new ol.layer.Tile({
            source: new ol.source.TileJSON({
                url: '',
                crossOrigin: '',
            }),
            visible: false
        });
        geography.set('name', 'Geography');



       // let vectorSource = this.olService.vector = new ol.source.Vector();
        let vector = new ol.layer.Vector({
            source: this.vectorSource
        });

        let parms = {
            target: 'map',
            layers: [this.vectorDraw, OSM , geography, vector],

            view: new ol.View({
                center: ol.proj.fromLonLat(this.lnglat),
                zoom: this.zoom,
                projection: ol.proj.get('EPSG:3857')
            })
        };


       // map = this.olService.getMap(parms);

        map = new ol.Map(parms);

        let select_interaction = new ol.interaction.Select();

        map.addInteraction(select_interaction);

        // add popup for all features
        let container = document.getElementById('ol-popup');
        let content = document.getElementById('ol-popup-content');
        let closer = document.getElementById('ol-popup-closer');


        // let popup = new ol.Overlay({
        //     element: container,
        //     autoPan: true,
        //     positioning: 'bottom-center',
        //     stopEvent: false,
        //     offset: [0, -5]
        // });

        // closer.onclick = function () {
        //     popup.setPosition(undefined);
        //     closer.blur();
        //     return false;
        // };
        // map.addOverlay(popup);

        // map.on('click', (evt) => {
        //     console.log('map click');

        //    // let map = map;

        //     let feature = map.forEachFeatureAtPixel(evt.pixel, (feat) => {
        //         return feat;
        //     });
        //     if (feature) {
        //         let coordinate = evt.coordinate;
        //         content.innerHTML = feature.get('name');
        //         popup.setPosition(coordinate);
        //     }


        // });
        //this.addLayerSwitcher([OSM, geography, boundaries]);
      //  this.addMarker([174.76, -37.10], 'Close to Auckland', 'akl1');
        //this.addMarker([173.76, -37.10], 'Out in in waters', 'pacific1');
        
    //    this.addMarker([-77.043386, 38.909635], 'Dupont Circle', 'akl1');

    //    this.addPolygon([[174.76, -37.18], [176.76, -37.18], [176.76, -38.18], [174.76, -38.18]], 'Hamilton', 'id_hamilton');

       //   this.addInteraction();

        // Get the array of features

    };

    // addPolygon = (polygon: [[number, number]], name: string, id: string) => {
    //     let ol = this.olService.get();
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

    //     let vector = this.olService.getVector();
    //     vector.addFeature(featurething);

    // };

    // addInteraction() {
    //     let ol = this.olService.get();
    //     this.draw = new ol.interaction.Draw({
    //         source: this.vectorSourceDraw,
    //         type: 'Polygon',
    //         freehand: true
    //     });

    //     map.addInteraction(this.draw);


    //     // this.draw.on('drawend', function () {
    //     //     //var features = this.draw.getSource().getFeatures();
    //     //     var features = this.draw.source.getFeatures();
    //     //     // Go through this array and get coordinates of their geometry.
    //     //     features.forEach(function (feature) {
    //     //         console.log(feature.getGeometry().getCoordinates());
    //     //     });
    //     // });



    // };


    // setMarker(coords: [number, number], name: string, id: string) {
    //     // THIS CODE FAILS BECAUSE "this.vectorSource." is null
    //     this.addMarker(coords, name, id);
    // }

    // addMarker = (coords: [number, number], name: string, id: string) => {
    //     let ol = this.olService.get();
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

    //     if (this.vectorSource == null)
    //         console.log("addMarker() => vectorSource == null");

    //     this.vectorSource.addFeature(iconFeature);
    //     this.vectorSource.changed();
    //     alert('added marker:' + name);
    // }

    addLayerSwitcher = (layers: [any]) => {

        this.layers = layers;

    }
    toggleLayer = (layer, evt) => {
        evt.target.blur();
        if (layer.getVisible()) {
            layer.setVisible(false);

        } else {
            layer.setVisible(true);
        }

    }

    ngOnInit() {
    console.log("ol.component.ngOnInit()");
    }

    ngAfterContentInit() {
    
        console.log("ol.component.ngAfterContentInit()");
       // this.createMap();
        // this.olService.placeMap(this.zoom,this.lnglat).then(() => { 
        //         alert("Map loaded by promise!");
        //     });
    }

}