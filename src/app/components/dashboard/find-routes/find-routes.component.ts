import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import {GoogleMapsService} from '../../../shared/services/google-maps.service'

@Component({
  selector: 'app-find-routes',
  templateUrl: './find-routes.component.html',
  styleUrls: ['./find-routes.component.scss']
})

export class FindRoutesComponent implements OnInit {
  @ViewChild('poop') mapElement: any;
  @ViewChild('poop2') mapElement2: any;
  map: google.maps.Map;
  public isViewable: boolean;

 
  marker: google.maps.Marker;
  heading: String = 'N';
  
  setHeading(heading) {
    this.heading = heading;
  }

  currentLat: any = 100000;
  currentLong: any = 100000;

  directionsService: google.maps.DirectionsService;
  directionsRequest :
  {
    origin: google.maps.LatLng | String | google.maps.Place,
    destination: google.maps.LatLng | String | google.maps.Place,
    travelMode: google.maps.TravelMode,
    transitOptions: google.maps.TransitOptions,
    drivingOptions: google.maps.DrivingOptions,
    unitSystem: google.maps.UnitSystem,
    waypoints: google.maps.DirectionsWaypoint,
    optimizeWaypoints: Boolean,
    provideRouteAlternatives: Boolean,
    avoidFerries: Boolean,
    avoidHighways: Boolean,
  
  };

  waypoints: google.maps.DirectionsWaypoint[] ;

  constructor(
    public mapService: GoogleMapsService,
  ) {
 
   
   }

   ngOnInit(): void {
    //set circular rotue form to true visibile
    this.isViewable = true;
    var mapProp = {
      center: new google.maps.LatLng(44.5793, -90.8143),
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
    
  }

  public toggle(): void { 
    
    this.isViewable = !this.isViewable; 
  }


  findMe() {
    

    var options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };

    function success(pos) {
      this.showPosition(pos);
    
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }


      navigator.geolocation.getCurrentPosition((position)=>{
        this.showPosition(position);
      }, error, options);


  }

  showPosition(position) {
   
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);
    this.map.setZoom(15);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Starting Location'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  findRoute(startPos, waypoints?: Array<any>,  endPos?){

  } 

  findWaypoints (startPos, startHeading, endPos?){
    if (endPos){
        ///calculate route to the end point
        //call findRoute(startPos, endPos)
    }else{
      //calculate wayponts starting in starting direction
      switch(startHeading){
        case 'N' :
          break;
        case 'NE' :
          break;
        case 'NW' :
          break;
        case 'S' :
          break;
        case 'SE' :
          break;
        case 'SW' :
          break;   
        case 'E' :
          break;   
        case 'W' :
          break;      
        
      }
    }
  }

  onFindMe(position: any){
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);
    this.map.setZoom(15);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Starting Location'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  
 

}
