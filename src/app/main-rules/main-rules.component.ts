import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RandomizerService } from '../services/randomizer.service';
import { RandomizerLogic } from '../../../common/randomizer/enums/RandomizerLogic';

@Component({
  selector: 'app-main-rules',
  templateUrl: './main-rules.component.html',
  styleUrls: ['./main-rules.component.scss']
})
export class MainRulesComponent implements OnInit {
  @Input('group') settingsForm: FormGroup;
  dropdowns: any = {};
  defaultLogic = RandomizerLogic.NO_GLITCHES;

  constructor(private randomizerService: RandomizerService) {
    this.dropdowns = this.randomizerService.getSettings();
  }

  ngOnInit() {}

}
