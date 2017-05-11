import { Component, ViewChild, Renderer, OnInit } from '@angular/core';
//import {Component} from '@angular/core';
//import { Component, OnInit } from '@angular/core';

declare var ol: any; // required for mapping to work;



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})

export class MapComponent implements OnInit {
  //@ViewChild('map') map;
 
  ol: any;
  flickrSource = new ol.source.Vector()
  flickrVector;
  flickerfeatures = [];
  symbols = [];
  symbolCount;
  constructor(public renderer: Renderer) {
    console.log('constructor app-map');

  }

  ngOnInit() { }

//http://openlayersbook.github.io/ch11-creating-web-map-apps/example-11.html
  setDataSourceMap(contacts) {

    //this.flickrSource.clear();

    var feature2, geometry2;
    var current = 1;
    //var features2 = new Array(contacts.length);
    console.log('setDataSourceMap() loading ' + contacts.length + ' contacts');
    for (var i in contacts) {

      var item = contacts[i];

     // console.log(contacts[i].firstName);
      // console.log('loop=' + i);

      if (item.latitude == 0 || item.longitude == 0)
        continue;

     console.log(item.firstName + ' lon=' + item.longitude +' lat=' + item.latitude);
     var geometry2 = new ol.geom.Point(this.getPointFromLongLat(item.longitude, item.latitude));
     feature2 = new ol.Feature(geometry2);
    // feature2.setGeometry(geo);

    //  feature2 = new ol.Feature({
    //     labelPoint: new ol.geom.Point(this.getPointFromLongLat(item.longitude, item.latitude)),
    //     geometry: new ol.geom.Point(this.getPointFromLongLat(item.longitude, item.latitude ))
    //   });

      feature2.setStyle(
        new ol.style.Style({
          image: this.symbols[2]
        })
      );

     this.flickrSource.addFeature(feature2);
     // this.flickrSource.push (feature2);

    } //for end

  }
  getPointFromLongLat (long, lat) {
    //console.log('getPointFromLongLat() = '+long);
    return ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857')
   }

  ngAfterViewInit() {
    // console.log(this.map);
    console.log('ngOnInit app-map');
    //      var projection = ol.proj.get('EPSG:3857');

    var atlasManager = new ol.style.AtlasManager({
      // we increase the initial size so that all symbols fit into
      // a single atlas image
      //initialSize: 512
    });

    var symbolInfo = [{
      opacity: 1.0,
      scale: 1.0,
      fillColor: 'rgba(176, 61, 35, 0.5)', //Red
      strokeColor: 'rgba(145, 43, 20, 0.5)'
    }, {
      opacity: 0.75,
      scale: 1.25,
      fillColor: 'rgba(70, 80, 224, 0.5)', // Blue
      strokeColor: 'rgba(12, 21, 138, 0.5)'
    }, {
      opacity: 0.5,
      scale: 1.5,
      fillColor: 'rgba(66, 150, 79, 0.5)', //Green
      strokeColor: 'rgba(20, 99, 32, 0.5)'
    }];

    // var radiuses = [3, 6, 9, 15, 19, 25];
    var radiuses = [2];
    this.symbolCount = symbolInfo.length * radiuses.length * 2;
    this.symbols = [];
    var i, j;
    for (i = 0; i < symbolInfo.length; ++i) {
      var info = symbolInfo[i];
      for (j = 0; j < radiuses.length; ++j) {
        // circle symbol
        this.symbols.push(new ol.style.Circle({
          opacity: info.opacity,
          scale: info.scale,
          radius: 5, //radiuses[j],
          fill: new ol.style.Fill({
            color: info.fillColor
          }),
          stroke: new ol.style.Stroke({
            color: info.strokeColor,
            width: 1
          }),
          // by passing the atlas manager to the symbol,
          // the symbol will be added to an atlas
          atlasManager: atlasManager
        }));

        // star symbol
        //   symbols.push(new ol.style.RegularShape({
        //     points: 8,
        //     opacity: info.opacity,
        //     scale: info.scale,
        //     radius: radiuses[j],
        //     radius2: radiuses[j] * 0.7,
        //     angle: 1.4,
        //     fill: new ol.style.Fill({
        //       color: info.fillColor
        //     }),
        //     stroke: new ol.style.Stroke({
        //       color: info.strokeColor,
        //       width: 1
        //     }),
        //     atlasManager: atlasManager
        //   }));
      }
    }

    //var featureCount = 50000;
    var featureCount = 1;

    var features = []; // new Array(featureCount);
    var feature, geometry;
    var e = 25000000;
    // for (i = 0; i < featureCount; ++i) {
    //   geometry = new ol.geom.Point([2 * e * Math.random() - e, 2 * e * Math.random() - e]);
    //   feature = new ol.Feature(geometry);
    //   feature.setStyle(
    //     new ol.style.Style({
    //       image: this.symbols[i % this.symbolCount]
    //     })
    //   );
    //   features[i] = feature;
    // }
    // geometry = new ol.geom.Point(this.getPointFromLongLat(-93.4670179, 45.1110388));



     feature = new ol.Feature({
        // labelPoint: new ol.geom.Point(this.getPointFromLongLat(-93.4965767,45.08214 )),
        // geometry: new ol.geom.Point(this.getPointFromLongLat(-93.4965767,45.08214 ))
        //labelPoint: new ol.geom.Point(this.getPointFromLongLat(-93.49437654018402 ,45.08208920262501 )),
        //geometry: new ol.geom.Point(this.getPointFromLongLat(-93.49437654018402 ,45.08208920262501 ))
        labelPoint: new ol.geom.Point(this.getPointFromLongLat(-93.49401 ,45.08203 )),
        geometry: new ol.geom.Point(this.getPointFromLongLat(-93.49401 ,45.08203 ))
      });

      feature.setStyle(
        new ol.style.Style({
          image: this.symbols[1]
        })
      );
      // var point = feature.getGeometry();
      // console.log('point'+ point);

      features.push(feature);
    // geometry = 

      // feature = new ol.Feature({
      //   labelPoint: new ol.geom.Point(this.getPointFromLongLat(-93.4670179,45.1110388 )),
      //        //   geometry: new ol.geom.Point([45.1110388, -93.4670179])
      // });
      // feature.setStyle(
      //   new ol.style.Style({
      //     image: this.symbols[1 % this.symbolCount]
      //   })
      // );
      // features[1] = feature;

    var vectorSource = new ol.source.Vector({
      features: features
    });
    var vector = new ol.layer.Vector({
      source: vectorSource
    });
    //vector.setVisible(false);


    this.flickrVector = new ol.layer.Vector({
      source: this.flickrSource,
      //style: flickrStyle
    });


    /// ORG
      var map = new ol.Map({
        target: "map",
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
          vector,
          this.flickrVector
        ],
        view: new ol.View({
          // center:  [44.9864688, -93.4014555],
          center: this.getPointFromLongLat(-92.57080078125, 45.04247805089153),
          
          //  center: ol.proj.transform([-93.4014555, 44.9864688 ], 'EPSG:900913'),
          zoom: 7,
          minZoom: 4,
          maxZoom: 18,
        })
      });

    //http://stackoverflow.com/questions/35875270/turn-off-image-smoothing-in-openlayers-3/35877192
    //     this.map.on('precompose', function(evt) {
    //   evt.context.imageSmoothingEnabled = false;
    //   evt.context.webkitImageSmoothingEnabled = false;
    //   evt.context.mozImageSmoothingEnabled = false;
    //   evt.context.msImageSmoothingEnabled = false;
    // });


map.on('click', function(evt) {
  var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
  var lon = lonlat[0];
  var lat = lonlat[1];
  console.log('map.click() lon='+lon+' lat='+lat);
});

    map.getView().on('change:resolution', function (e) {

      // BIGGER the number the closer to the ground and roads
      console.log(map.getView().getZoom());

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