import { Component, OnInit } from '@angular/core';
import { WeerService } from '../services/weer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  weerdata;
  city;
  algemeneOmschrijving;
  temp;
  weerIcon;
  metString;
  weerBackground;

  constructor(private WeerService: WeerService) {}

  ngOnInit(){
    this.city = this.WeerService.city;
    this.WeerService.searchData(this.city).subscribe(data =>{
      this.temp = JSON.stringify(data['main']['temp']);
      this.algemeneOmschrijving = JSON.stringify(data['weather'][0]['description']);
      this.metString = JSON.stringify(data['weather'][0]['icon']).replace(/\"/g, "");
      this.weerIcon = "http://openweathermap.org/img/wn/" + this.metString + "@2x.png";
      this.weerBackground = JSON.stringify(data['weather'][0]['main']).replace(/\"/g, "");
      if(this.weerBackground == 'Haze' || this.weerBackground == 'Smoke' || this.weerBackground == 'Dust' || this.weerBackground == 'Fog' || this.weerBackground == 'Sand' || this.weerBackground == 'Ash'){
        this.weerBackground = 'Mist';
      }
      this.weerBackground = "assets/images/" + this.weerBackground.toLowerCase() + '.jpg'; 
      this.weerdata = this.temp;
    });
  }

  withSearch(searchValue: string){
    if(searchValue == ''){
      this.city = 'Amsterdam';
    }else{
    this.city = searchValue;
    }
    this.WeerService.searchData(searchValue).subscribe( data =>{
      this.temp = JSON.stringify(data['main']['temp']);
      this.algemeneOmschrijving = JSON.stringify(data['weather'][0]['description']);
      this.metString = JSON.stringify(data['weather'][0]['icon']).replace(/\"/g, "");
      this.weerIcon = "http://openweathermap.org/img/wn/" + this.metString + "@2x.png";
      this.weerdata = this.temp;
      this.weerBackground = JSON.stringify(data['weather'][0]['main']).replace(/\"/g, "");
      if(this.weerBackground == 'Haze' || this.weerBackground == 'Smoke' || this.weerBackground == 'Dust' || this.weerBackground == 'Fog' || this.weerBackground == 'Sand' || this.weerBackground == 'Ash'){
        this.weerBackground = 'Mist';
      }
      this.weerBackground = "assets/images/" + this.weerBackground.toLowerCase() + '.jpg'; 
    }, err => {
      this.weerdata = "Er is geen resultaat gevonden voor " + this.city;
    });
  }

}
