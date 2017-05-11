import { Component, ViewChild, Renderer, OnInit } from '@angular/core';
//import {Component} from '@angular/core';
//import { Component, OnInit } from '@angular/core';

declare var ol: any; // required for mapping to work;



@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
})

export class MapComponent implements OnInit {
    @ViewChild('map') map;
    ol: any;
    flickrSource = new ol.source.Vector() 
    flickrLayer;
    flickerfeatures=[];
    symbols = [];
    symbolCount;
    constructor(public renderer: Renderer) {
        console.log('constructor app-map');

    }

    ngOnInit() { }

    setDataSourceMap(contacts) {
        var feature, geometry;
        var current=1;
        console.log('setDataSourceMap()');
        for (var i in contacts) {

            var item = contacts[i];

            //console.log(contacts[i].firstName);
            console.log('loop='+i);
            
            if (item.latitude == 0)
               continue;

              geometry = new ol.geom.Point([parseFloat(item.longitude), parseFloat(item.latitude)]);
             feature = new ol.Feature({
                 name: item.firstName,
                 geometry: geometry
                 });
             feature.setStyle(
                        new ol.style.Style({  image: this.symbols[2]
                        })
                    );
             
             this.flickrSource.addFeature(feature);
             //this.flickerfeatures[current] = feature;
             //current++;
             //feature.set('url', item.media.m);
             //var coordinate = [item.latitude, item.latitude]; //   ;transform([parseFloat(item.longitude), parseFloat(item.latitude)]);
             //var geometry = new ol.geom.Point(coordinate);
             //feature.setGeometry(geometry);
             

        }
    }

    ngAfterViewInit() {
   // console.log(this.map);
        console.log('ngOnInit app-map');
      //      var projection = ol.proj.get('EPSG:3857');

      var atlasManager = new ol.style.AtlasManager({
        // we increase the initial size so that all symbols fit into
        // a single atlas image
        initialSize: 512
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

      var featureCount = 50000;
      var features = new Array(featureCount);
      var feature, geometry;
      var e = 25000000;
      for (i = 0; i < featureCount; ++i) {
        geometry = new ol.geom.Point( [2 * e * Math.random() - e, 2 * e * Math.random() - e]);
        feature = new ol.Feature(geometry);
        feature.setStyle(
            new ol.style.Style({
              image: this.symbols[i % this.symbolCount]
            })
        );
        features[i] = feature;
      }

      var vectorSource = new ol.source.Vector({
        features: features
      });
      var vector = new ol.layer.Vector({
        source: vectorSource
      });
      //vector.setVisible(false);

// this.flickrSource = new ol.source.Vector({
//         features: this.flickerfeatures
//       });
this.flickrLayer = new ol.layer.Vector({
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
            //vector,
            this.flickrLayer
            ],
            view: new ol.View({
            // center:  [44.9864688, -93.4014555],
              center: ol.proj.transform([-93.4014555, 44.9864688 ], 'EPSG:4326', 'EPSG:3857'),
            //  center: ol.proj.transform([-93.4014555, 44.9864688 ], 'EPSG:900913'),
              zoom: 5,
              //minZoom: 5,
              //maxZoom: 16,
            })
          });
        

        map.getView().on('change:resolution', function (e) {

        // BIGGER the number the closer to the ground and roads
            console.log(map.getView().getZoom());

        if (map.getView().getZoom() > 5) {
            vector.setVisible(true);
        }
        else
        {
            vector.setVisible(false);
        }
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