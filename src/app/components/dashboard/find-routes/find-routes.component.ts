import { Component, OnInit, AfterContentInit } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import {GoogleMapsService} from '../../../shared/services/google-maps.service'
import {LocationService} from '../../../shared/services/location.service';
import {RouteService} from '../../../shared/services/route.service';
import {Buffer} from 'buffer';
@Component({
  selector: 'app-find-routes',
  templateUrl: './find-routes.component.html',
  styleUrls: ['./find-routes.component.scss']
})

export class FindRoutesComponent implements OnInit{
  @ViewChild('poop') mapElement: any;
  @ViewChild('poop2') mapElement2: any;
  map: google.maps.Map;
  public pos;

  public waypoints: google.maps.DirectionsGeocodedWaypoint;
  public c1isShown: boolean;
  public c2isShown: boolean;
  hasRoute:boolean;
 
  marker: google.maps.Marker;
  directionsResult: google.maps.DirectionsResult;

  // Warning flag & message.
  warning: boolean;
  message: string;
 

  currentLat: any = 100000;
  currentLong: any = 100000;
  mapProp = {
    center: new google.maps.LatLng(44.5793, -90.8143),
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  

  public tabs: String[];
  constructor(
    public mapService: GoogleMapsService,
    public locationService: LocationService,
    public routeService: RouteService,
 
  ) {
   
   }

   
   ngOnInit(): void {
    //set circular rotue form to true visibile
    this.c1isShown = true;
    this.c2isShown= false;

    this.hasRoute = false;
  

    
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProp);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay  = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      panel: this.mapElement.nativeElement
    });
    
  }

  public toggleA(): void { 

      this.c1isShown= true;
      this.c2isShown = false;
      console.log("c1 =" + this.c1isShown);
      console.log("c2 =" + this.c2isShown);
 
  
}
  public toggleB(): void { 
 
    this.c1isShown= false;
    this.c2isShown = true;
    console.log("c1 =" + this.c1isShown);
    console.log("c2 =" + this.c2isShown);

  

  }


  onSubmitRoute(routeObject){

    this.warning = false;
    this.message = "";
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay  = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map, 
      panel: this.mapElement.nativeElement
    });
      this.mapService.GetRoute(routeObject).forEach(
        (result) => {
          //disply route on map
          this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProp);
          directionsDisplay.setMap(this.map);
          directionsDisplay.setDirections(result);
          this.directionsResult = result;
        }).then(() => console.log('Route display complete'))
        .catch((error: google.maps.DirectionsStatus) => {
          if (error === google.maps.DirectionsStatus.ZERO_RESULTS) {
            this.message = "zero results";
            this.warning = true;
            }
        });
        this.hasRoute= true;
        
        google.maps.event.addListener(directionsDisplay, 'directions_changed', function(){
          this.waypoints = directionsDisplay.getDirections().geocoded_waypoints
        })
  }


  onFindMe(position: google.maps.LatLng){
    // this.currentLat = position.coords.latitude;
    // this.currentLong = position.coords.longitude;

    this.map.panTo(position);
    this.map.setZoom(15);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: position,
        map: this.map,
        title: 'Starting Location'
      });
    }
    else {
      this.marker.setPosition(position);
    }
  }


  saveRoute(){
    if (this.hasRoute){
      var dirResult ={
        dir_result: this.directionsResult
      }
      
      let objJsonStr = JSON.stringify(dirResult);
    let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
      this.routeService.SaveRoute(objJsonB64)
      console.log("route save attempted")
    }else{
      console.log( "No route available to save");
    }
  }
 
  
 
 
}
