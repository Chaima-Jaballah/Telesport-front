import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  selectedCountryName!:String;
  constructor(private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe((param:any)=>{
      this.selectedCountryName = param.countryName;
    })
  }
}
