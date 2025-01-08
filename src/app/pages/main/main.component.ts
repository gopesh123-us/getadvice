import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(private httpClient: HttpClient) {}
  choice: string = '';
  message: string = '';
  advice: string = '';

  handleChoice(event: any) {
    const choosenNumber: any = event.target.value;
    if (!event.target.value) {
      this.message = '';
      this.advice = '';
    } else {
      if (
        choosenNumber > 10 ||
        choosenNumber < 1 ||
        !this.isNumeric(parseInt(choosenNumber))
      ) {
        this.message = 'Invalid choice';
        this.advice = '';
      } else {
        this.choice = choosenNumber;
        this.message = 'Your choice is ' + this.choice;
        this.fetchDetails();
      }
    }
  }
  private isNumeric(str: any) {
    return typeof str === 'number' && !isNaN(str);
  }
  private fetchDetails() {
    this.httpClient
      .get('https://api.adviceslip.com/advice')
      .subscribe((response: any) => {
        this.advice = response.slip.advice;
      });
  }
}
