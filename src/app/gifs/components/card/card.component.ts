import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input() gif!: Gif;

  constructor() { }

  ngOnInit(): void {
    if(!this.gif) throw new Error('Gif property is required');
  }

}
