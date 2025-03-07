import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-stat-box',
  standalone: false,
  templateUrl: './stat-box.component.html',
  styleUrl: './stat-box.component.scss'
})
export class StatBoxComponent {
  @Input() title!: String;
  @Input() countElement!: number;
}
