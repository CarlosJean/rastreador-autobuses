import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-realtime-map',
  templateUrl: './realtime-map.component.html',
  styleUrls: ['./realtime-map.component.css']
})
export class RealtimeMapComponent implements OnInit {

  @Input() location:any = {};
  constructor() { }

  ngOnInit(): void {
    console.log(location);
  }

}
