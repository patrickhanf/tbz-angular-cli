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

    turfActionSelected: string = 'draw';
    turfActions = [
        { value: 'draw', icon: 'rounded_corner'},
        { value: 'modify', icon: ''}
        ];

    onTurfActionSelected(selected: String) {

        // Issue below is up because the angular model is out-of-sync with the event.
        // https://github.com/angular/material2/issues/448
        // console.log('clicked onTurfActionSelected()' + this.turfActionSelected + ' selected=='+ selected);

        //this.olService.getTurfCutter(select_interaction, modify_interaction);

        if (selected == 'draw')
            this.olService.addDrawInteraction();
        else
            this.olService.addModifyInteraction();
    }

    onTurfActionDelete()
    {
        // https://medium.com/@tarik.nzl/making-use-of-dialogs-in-material-2-mddialog-7533d27df41
         this.olService.deleteTurfMap();
    }

    // //private map;
    // public layers = [];
    // public vectorSource;
    // private vectorDraw;
    // private vectorSourceDraw;

    constructor(private olService: OlService) {


        //this.vectorSource = this.olService.vector;
        //  this.olservice.lnglat = this.lnglat; // [-93.49401, 45.08203];
        //   this.olservice.zoom = this.zoom; // 7;

        //this.olService.vectorSource = this.olService.addLayer();

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