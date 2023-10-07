import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../movies.model";




@Component({
  selector: 'app-movie-element',
  templateUrl: './movie-element.component.html',
  styleUrls: ['./movie-element.component.scss'],
})
export class MovieElementComponent  implements OnInit {

@Input() movie:Movie={id:'q3',director:'Quentin Tarantino',name:'Neki',
  imageUrl:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.britannica.com%2F81%2F220481-050-55413025%2FQuentin-Tarantino-2020.jpg&tbnid=b7HQU3mLTjOJWM&vet=12ahUKEwjeprClvtSAAxW7_rsIHYaKCZoQMygCegUIARDxAQ..i&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Fbiography%2FQuentin-Tarantino&docid=1pwyK5_JfvEEjM&w=1121&h=1600&q=quentin%20tarantino&ved=2ahUKEwjeprClvtSAAxW7_rsIHYaKCZoQMygCegUIARDxAQ',
  critique:'Dobar',
userId:'yy'
};
  constructor() { }


  ngOnInit() {}




}
