import { Component, ViewChild, Renderer, OnInit } from '@angular/core';

//import * as ol from 'openlayers';


declare var ol: any; // required for mapping to work;
// declare var vectorSource: any; // required for mapping to work;
// declare var vectorLayer: any; // required for mapping to work;



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
   styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  //@ViewChild('map') map;
 

  ol: any;
  map;
  vectorSource: any;
  vectorLayer: any;
  symbols = [];
  symbolCount;
  constructor(public renderer: Renderer) {
    console.log('constructor app-map');

    this.vectorSource = this.vectorSource = new ol.source.Vector({
                projection: 'EPSG:4326'
            });
    this.vectorLayer = new ol.layer.Vector({
      source: this.vectorSource
    });



  }

  ngOnInit() { }

//http://openlayersbook.github.io/ch11-creating-web-map-apps/example-11.html
  setDataSourceMap(contacts) {



 // this.vectorSource.clear();
    console.log('hide - setDataSourceMap() loading ' + contacts.length + ' contacts');
    this.vectorSource.setVisible(false);
this.createFeature(-93.49401 ,45.08203);
 // this.createFeature(-93.4014555,44.9864688);
                     var i, lat, lon, geom, feature, features = [];
                for(i=0; i< 10; i++) {
                    lat = Math.random() * 174 - 87;
                    lon = Math.random() * 360 - 180;

                    geom = new ol.geom.Circle(
                        ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'), 
                        100000
                    );

                    feature = new ol.Feature(geom);
                   // features.push(feature);
                    this.vectorSource.addFeatures([feature]);
                }    
           //     this.vectorSource.addFeatures(features);
    //var features2 = new Array(contacts.length);

    // for (var ii in contacts) {

    //   var item = contacts[ii];

    //  // console.log(contacts[i].firstName);
    //   // console.log('loop=' + i);

    //   if (item.latitude == 0 || item.longitude == 0)
    //     continue;

    // var geom = new ol.geom.Circle(
    //                     ol.proj.transform([item.longitude, item.latitude], 'EPSG:4326', 'EPSG:3857'), 
    //                     100000
    //                 );

    //                 var feature = new ol.Feature(geom);
    //                 features.push(feature);

    //  console.log(item.firstName + ' lon=' + item.longitude +' lat=' + item.latitude);

    // this.vectorSource.addFeatures(features);

    // } //for end
this.vectorSource.setVisible(true);
console.log('show = setDataSourceMap() loading ' + contacts.length + ' contacts');
  }
  getPointFromLongLat (long, lat) {
    //console.log('getPointFromLongLat() = '+long);
    return ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857')
   }

  createFeature(long, lat) {
    var features = [];
  
    var feature = new ol.Feature({
      type: 'place',
              name: "Patrick Hanf",
     //   labelPoint: new ol.geom.Point(this.getPointFromLongLat(long, lat)),
        geometry:  new ol.geom.Point(this.getPointFromLongLat(long, lat))
    });
    //feature.setStyle(styles.icon);
    features.push(feature);
    this.vectorSource.addFeature(feature);
  }

  ngAfterViewInit() {


// http://stackoverflow.com/questions/36139170/how-to-hide-and-show-features-in-open-layers-3-redraw
//
// https://gis.stackexchange.com/questions/219349/how-to-create-a-custom-tile-map-with-its-own-extent-in-openlayers-3
//
//
// var tileLayer = new ol.layer.Tile({
//     source: new ol.source.XYZ({
//       //  projection: projection25833,
//         url: "{z}/{x}/{-y}.png",
//      //   extent: [364900,5791100,420900,5847100],
//         tileSize: [256, 256],
//         minZoom: 0,
//         maxZoom: 4
//     })
// });


   var mmap = this.map = new ol.Map({
        target: 'map',
       // renderer: 'webgl', // Force the renderer to be used
        layers: [
          new ol.layer.Tile({
            //source: new ol.source.Stamen({ layer: 'watercolor' })
            //source: new ol.source.Stamen({ layer: 'toner' })
            //source: new ol.source.Stamen({ layer: 'toner-lines' })
            //source: new ol.source.Stamen({ layer: 'terrain' })
            //source: ol.source.BingMaps({}),
            source: new ol.source.OSM()
          }),
         // tileLayer,
          this.vectorLayer
        ],
        view: new ol.View({
          // center:  [44.9864688, -93.4014555],
          center: this.getPointFromLongLat(-92.57080078125, 45.04247805089153),
          
          //  center: ol.proj.transform([-93.4014555, 44.9864688 ], 'EPSG:900913'),
          zoom: 7,
        //  minZoom: 4,
        //  maxZoom: 18,
        })
      });


    // console.log(this.map);
    console.log('ngOnInit app-map');



    this.createFeature(-93.49401 ,45.08203);


    // this.vectorSource = new ol.source.Vector({
    //   features: features
    // });

    // this.vectorLayer = new ol.layer.Vector({
    //   source: this.vectorSource
    // });
    //vector.setVisible(false);
    /// ORG
      // var map = new ol.Map({
      //   target: "map",
      //   layers: [
      //     new ol.layer.Tile({
      //       source: new ol.source.OSM()
      //     }),
      //     this.vectorLayer,
      //    // this.flickrVector
      //   ],
      //   view: new ol.View({
      //     // center:  [44.9864688, -93.4014555],
      //     center: this.getPointFromLongLat(-92.57080078125, 45.04247805089153),
          
      //     //  center: ol.proj.transform([-93.4014555, 44.9864688 ], 'EPSG:900913'),
      //     zoom: 7,
      //     minZoom: 4,
      //     maxZoom: 18,
      //   })
      // });

    //http://stackoverflow.com/questions/35875270/turn-off-image-smoothing-in-openlayers-3/35877192
    //     this.map.on('precompose', function(evt) {
    //   evt.context.imageSmoothingEnabled = false;
    //   evt.context.webkitImageSmoothingEnabled = false;
    //   evt.context.mozImageSmoothingEnabled = false;
    //   evt.context.msImageSmoothingEnabled = false;
    // });

/**
 * Popup
 **/
  var container = document.getElementById('popup');
  var content_element = document.getElementById('popup-content');
  var closer = document.getElementById('popup-closer'); 

var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    offset: [0, -10]
});
this.map.addOverlay(overlay);

this.map.on('click', function(evt){
  // Popup example
  // http://plnkr.co/edit/GvdVNE?p=preview
  //

    var feature = this.map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
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
    else
    {
      overlay.setPosition(undefined);
    }
});


// map.on('click', function(evt) {
//   var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
//   var lon = lonlat[0];
//   var lat = lonlat[1];
//   console.log('map.click() lon='+lon+' lat='+lat);
// });

    mmap.getView().on('change:resolution', function (e) {

      // BIGGER the number the closer to the ground and roads
      // LARGER the number the closer to space you are!
      console.log(mmap.getView().getZoom());

      // if (map.getView().getZoom() > 5) {
      //   vector.setVisible(true);
      // }
      // else {
      //   vector.setVisible(false);
      // }
    });

    // var map = new ol.Map({
    //     controls: ol.control.defaults({
    //         attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
    //             collapsible: false
    //         })
    //     }).extend([
    //         new ol.control.ZoomToExtent({
    //             extent: [
    //                 813079.7791264898, 5929220.284081122,
    //                 848966.9639063801, 5936863.986909639
    //             ]
    //         })
    //     ]),
    //     layers: [
    //         new ol.layer.Tile({
    //             source: new ol.source.OSM()
    //         })
    //     ],
    //     target: 'openlayersmap',
    //     view: new ol.View({
    //         projection: 'EPSG:900913',
    //         center: [18.0, 55.4],
    //         zoom: 7
    //     })
    // });
  }



}