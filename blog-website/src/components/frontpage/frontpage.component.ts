import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],
})

export class Frontpage {
  title = "Hello!"
}
