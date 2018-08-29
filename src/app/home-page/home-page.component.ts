import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas, faDownload } from '@fortawesome/free-solid-svg-icons';
import { fab, faDiscord } from '@fortawesome/free-brands-svg-icons';

library.add(fas, faDownload);
library.add(fab, faDiscord);
dom.watch();

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  version: string = environment.version;
  constructor() { }

  ngOnInit() {
  }

}
