import { Component, OnInit } from '@angular/core';
import { WeerService } from '../services/weer.service';
import { createAnimation, Animation } from '@ionic/core';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { interval } from 'rxjs';
import { AnimationController } from '@ionic/angular';
import { clear } from 'console';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  weerdata = Array;
  city;
  metString;
  rainInterval;
  leftOffset = Array;

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
    if(this.weerdata['weerBackground'] == "Rain" || this.weerdata['weerBackground'] == "Drizzle"){
      this.rainAnimations();
      this.rainInterval = setInterval(() => {
        this.leftOffset[0] = this.randomIntFromInterval(0, 100).toString();
        this.leftOffset[1] = this.randomIntFromInterval(0, 100).toString();
        this.leftOffset[2] = this.randomIntFromInterval(0, 100).toString();
        this.leftOffset[3] = this.randomIntFromInterval(0, 100).toString();
        this.leftOffset[4] = this.randomIntFromInterval(0, 100).toString();
        this.leftOffset[5] = this.randomIntFromInterval(0, 100).toString();
        this.leftOffset[6] = this.randomIntFromInterval(0, 100).toString();
      }, 500);
    }else{
      clearInterval(this.rainInterval)
    }
    this.weerdata['weerBackground'] = "assets/images/" + this.weerdata['weerBackground'].toLowerCase() + '.jpg';
  }

  rainAnimation(name, timeout){
    const animation = createAnimation()
    .addElement(document.querySelector(name))
    .duration(500)
    .iterations(Infinity)
    .keyframes([
      { offset: 0, top: '-4px' },
      { offset: 1, top: '100%' }
    ]);
    setTimeout(() => 
    {
    animation.play()
    }, timeout)
  }

  rainAnimations(){
    this.rainAnimation('.raindrop', 0)
    this.rainAnimation('.raindrop2', 200)
    this.rainAnimation('.raindrop3', 400)
    this.rainAnimation('.raindrop4', 300)
    this.rainAnimation('.raindrop5', 500)
    this.rainAnimation('.raindrop6', 100)
    this.rainAnimation('.raindrop7', 200)
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnDestroy(){
    if(this.rainInterval){
      clearInterval(this.rainInterval);
    }
  }

}
