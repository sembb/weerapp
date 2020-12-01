import { Component, OnInit } from '@angular/core';
import { WeerService } from '../services/weer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  weerdata = Array;
  city;
  metString;


  //Inject the weerservice so i can use it here.
  constructor(private WeerService: WeerService) {}

  ngOnInit(){
      
    //On initialise get weather info and put the info in variables.
      this.city = this.WeerService.city;
      this.WeerService.searchData(this.city).subscribe(data =>{
        this.initialiseVars(data);
    });
  }

  withSearch(searchValue: string){
    //onsearch refresh the search and change the city to the input.
    if(searchValue == ''){
      this.city = 'Amsterdam';
    }else{
    this.city = searchValue;
    }
    
    this.WeerService.searchData(searchValue).subscribe( data =>{
      this.initialiseVars(data);

      //if city is not found, give an error.
    }, err => {
      this.weerdata['temp'] = "Er is geen resultaat gevonden";
      this.weerdata['algemeneOmschrijving'] = '';
    });
  }

  initialiseVars(data){
    //defines all the variables the program needs to display the weather info.
    this.weerdata['temp'] = 'Het is ' + JSON.stringify(data['main']['temp'])+'°C in '+ this.city;
    this.weerdata['algemeneOmschrijving'] = JSON.stringify(data['weather'][0]['description']);
    this.metString = JSON.stringify(data['weather'][0]['icon']).replace(/\"/g, "");
    this.weerdata['weerIcon'] = "http://openweathermap.org/img/wn/" + this.metString + "@2x.png";
    this.weerdata['weerBackground'] = JSON.stringify(data['weather'][0]['main']).replace(/\"/g, "");
    if(this.weerdata['weerBackground'] == 'Haze' || this.weerdata['weerBackground'] == 'Smoke' || this.weerdata['weerBackground'] == 'Dust' || this.weerdata['weerBackground'] == 'Fog' || this.weerdata['weerBackground'] == 'Sand' || this.weerdata['weerBackground'] == 'Ash'){
      this.weerdata['weerBackground'] = 'Mist';
    }
    this.weerdata['weerBackground'] = "assets/images/" + this.weerdata['weerBackground'].toLowerCase() + '.jpg';
  }

}
