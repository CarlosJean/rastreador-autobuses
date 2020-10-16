import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  isCollapsed = true;
  loginModalVisible = false;

  showLoginModal(){
    this.loginModalVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.loginModalVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.loginModalVisible = false;
  }
}
