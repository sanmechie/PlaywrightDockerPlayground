import { Component, Input, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { City } from './city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cities!: City[];
  message: string = '';

  @Input() cityDetails = { name: '', area: 0 };
  constructor(private dataservice: DataService) {}

  ngOnInit(): void {
    this.dataservice.getCities().subscribe((data: any) => {
      this.cities = data;
    });
  }

  addCity(cityDetails: any) {
    if (cityDetails.name === '') {
      this.message = 'Name cannot be empty';
      return;
    }

    if (Number(cityDetails.area) <= 0) {
      this.message = 'Area should be greater than 0';
      return;
    }
    this.dataservice.addCity(cityDetails).subscribe((data: any) => {
      if (data === `${cityDetails.name} already exists`) {
        this.message = data;
      } else {
        this.message = `${cityDetails.name} posted successfuly`;
        this.ngOnInit();
      }
    });
  }
}
