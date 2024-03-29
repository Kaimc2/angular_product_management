import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  imageUrl = '../../assets/placeholder.jpg';
  yatta = '../../assets/yatta/yatta.gif';
  activatingYatta = false;

  changeImage() {
    this.activatingYatta = !this.activatingYatta;
    let audio = new Audio('../../assets/yatta/yatta.mp3');
    audio.play();
  }
}
