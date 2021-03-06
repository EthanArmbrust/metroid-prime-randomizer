import { app, ipcMain } from 'electron';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import * as path from 'path';

import { Utilities } from '../Utilities';
import { Randomizer } from '../randomizer/Randomizer';
import { Config } from '../randomizer/Config';
const ProgressBar = require('electron-progressbar');

export class Patcher {
  private appRoot: string;
  private randomPrime: any;
  private serve: boolean;
  private defaultOutputFolderName = 'prime-randomizer-output';

  constructor() {
    this.serve = Utilities.isServe();
    this.appRoot = Utilities.getAppRoot();
    const randomPrimePath = this.getRandomPrimePath();

    // Gracefully handle unresolved randomprime native path
    try {
      this.randomPrime = require(randomPrimePath);
    } catch (err) {
      throw new ReferenceError('Cannot resolve the randomprime native module: ' + randomPrimePath);
    }

    // Handle IPC randomizer call from renderer
    ipcMain.on('randomizer', (event, arg) => {
      this.runRandomizerAndPatchIso(arg, event);
    });
  }

  public runRandomizerAndPatchIso(randomizerConfig, event) {
    // Open indeterminate progress bar
    const progressBar = new ProgressBar({
      title: 'Generating Seed',
      text: 'Getting Ready...',
      indeterminate: false
    });

    progressBar.text = 'Placing items...';

    // Create randomizer object and run based on settings
    const randomizer = new Randomizer(randomizerConfig);
    randomizer.randomize();

    const outputFile = 'Prime_' + randomizerConfig.permalink;

    // If no folder is specified, use default output folder
    if (!randomizerConfig.outputFolder) {
      randomizerConfig.outputFolder = path.join(app.getPath('documents'), 'Metroid Prime Randomizer');

      // Create default output folder if it doesn't exist
      if (!existsSync(randomizerConfig.outputFolder)) {
        try {
          mkdirSync(randomizerConfig.outputFolder);
        } catch (err) {
          const dirError = new Error(err);
          event.sender.send('patch-error', dirError.toString());
        }
      }
    }

    if (randomizerConfig.spoiler) {
      progressBar.text = 'Creating spoiler log...';
      this.writeSpoilerLog(randomizer, randomizerConfig, path.join(randomizerConfig.outputFolder, outputFile + '_spoiler.txt'));
    }

    if (randomizerConfig.generateRom) {
      progressBar.text = 'Patching ROM...';
      const layoutDescriptor = randomizer.getWorld().generateLayout();
      const configObj = {
        input_iso: randomizerConfig.baseIso,
        output_iso: path.join(randomizerConfig.outputFolder, outputFile + '.' + randomizerConfig.fileType),
        iso_format: randomizerConfig.fileType,
        layout_string: layoutDescriptor,
        skip_frigate: randomizerConfig.skipFrigate,
        skip_hudmenus: randomizerConfig.skipHudPopups,
        obfuscate_items: randomizerConfig.obfuscateItems,
        quiet: true,
        comment: 'prime-randomizer-web ' + randomizerConfig.version + ' permalink: ' + randomizerConfig.permalink
      };

      this.randomPrime.patchRandomizedGame(JSON.stringify(configObj), message => {
        const messageObj: { type: string, percent: number, msg: string } = JSON.parse(message);
        switch (messageObj.type) {
          case 'progress': {
            // event.sender.send('patch-progress', messageObj);
            progressBar.value = messageObj.percent;
            progressBar.detail = messageObj.msg;
            break;
          }
          case 'success': {
            event.sender.send('patch-success', 'ROM patched successfully.\n\nIt can be found at ' + randomizerConfig.outputFolder);
            break;
          }
          case 'error': {
            progressBar.close();
            event.sender.send('patch-error', messageObj.msg);
            break;
          }
          default: {
            progressBar.close();
            event.sender.send('patch-error', 'An unknown error occurred.');
          }
        }
      });
    } else {
      progressBar.close();
      event.sender.send('patch-success', 'ROM patched successfully.\n\nIt can be found at ' + randomizerConfig.outputFolder);
    }
  }

  public writeSpoilerLog(randomizer: Randomizer, game: any, filePath: string) {
    const spoiler = this.generateSpoilerLog(randomizer, game);
    writeFileSync(filePath, spoiler);
  }

  generateSpoilerLog(randomizer: Randomizer, game: any) {
    const spoiler: any = { info: {} };
    const config = new Config();

    spoiler.info.version = game.version;
    spoiler.info.permalink = game.permalink;
    spoiler.info.seed = game.seed;
    spoiler.info.settings = Object.keys(game)
    .filter(key => {
      const option = config.getOptionByName(key);
      return option && option.shared;
    })
    .reduce((obj, key) => {
      obj[key] = game[key];
      return obj;
    }, {});
    spoiler.locations = JSON.parse(randomizer.getWorld().toJson());
    spoiler.walkthrough = randomizer.getWorld().getWalkthrough();

    return JSON.stringify(spoiler, null, '\t');
  }

  getRandomPrimePath(): string {
    const buildPath = 'build/Release/randomprime';

    // Return if running in development mode
    if (this.serve) {
      return path.join(this.appRoot, buildPath);
    }

    switch (process.platform) {
      case 'darwin': {
        return path.join(app.getAppPath(), '../..', buildPath);
      }
      default: {
        return path.join(this.appRoot, buildPath);
      }
    }
  }
}
