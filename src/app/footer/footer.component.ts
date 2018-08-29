import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fab, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';

library.add(fab, faGithub, faDiscord);
dom.watch();

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: number;
  version: string = environment.version;
  constructor() { }

  ngOnInit() {
    this.year = (new Date()).getFullYear();
  }

}
