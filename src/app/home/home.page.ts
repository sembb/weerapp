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

  constructor(private WeerService: WeerService) {}

  ngOnInit(){
    this.city = this.WeerService.city;
    this.WeerService.searchData(this.city).subscribe(data =>{
      data = JSON.stringify(data['main']['temp']);
      this.weerdata = data;
    });
  }

  withSearch(searchValue: string){
    if(searchValue == ''){
      this.city = 'Amsterdam';
    }else{
    this.city = searchValue;
    }
    this.WeerService.searchData(searchValue).subscribe( data =>{
      data = JSON.stringify(data['main']['temp']);
      this.weerdata = data;
    }, err => {
      this.weerdata = "Er is geen resultaat gevonden voor " + this.city;
    });
  }

}
