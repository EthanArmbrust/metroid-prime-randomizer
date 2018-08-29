import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas, faDownload, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { fab, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';

library.add(fas, faDownload, faExclamationTriangle);
library.add(fab, faGithub, faDiscord);
dom.watch();

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  version: string = environment.version;
  showNav = false;
  helpItems: Array<object> = [
    { link: '/help/modes', text: 'Modes' },
    { link: '/help/logics', text: 'Logics' },
    { link: '/help/artifacts', text: 'Artifacts' }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showNav = false;
    });
  }

  ngOnInit() {
  }

}
