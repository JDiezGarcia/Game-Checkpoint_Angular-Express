import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-footer',
  styleUrls: ['footer.component.css'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  today: number = Date.now();
}
