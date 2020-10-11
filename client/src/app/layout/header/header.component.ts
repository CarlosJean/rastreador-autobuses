import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() menuCollapsed = new EventEmitter<boolean>();
  collapsed:boolean = true;

  constructor() { }

  ngOnInit(): void {
    
  }

  collapseMenu(){
    if(this.collapsed){
      this.collapsed = false;
      this.menuCollapsed.emit(false);
    } 
    if(!this.collapsed) {
      this.collapsed = true;
      this.menuCollapsed.emit(true);    
    }
  }

}
