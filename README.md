# Filler - A Phaser + TypeScript & Cordova filler game

This game is under construction. So much and so quickly in fact that there may be bugs. Uses a [template by fractile81](https://github.com/fractile81/cordova-phaser-ts-jed). Below is helpful stuff that guy wrote.

Both [Jed](https://slexaxton.github.io/Jed/) and [po2json](https://github.com/mikeedwards/po2json) have been included to assist in any internationalization (i18n) efforts.

The workflow provided will assume control of the `www` directory.  Any content added or changed in this directory manually will be overridden or removed by the provided Grunt tasks.

Features include:
* [Phaser](http://phaser.io/) 
* [Grunt](http://gruntjs.com/) - New to Grunt? Check out [http://gruntjs.com/getting-started](http://gruntjs.com/getting-started) to see how to set it up.
  * [Express](https://github.com/blai/grunt-express) - Provides a Grunt-based server used in tandem with `grunt-contrib-watch` to provide live-reloading when debugging.
* [Typescript](https://www.typescriptlang.org/)
  * [TSLint](https://palantir.github.io/tslint/) - Verify TypeScript against Phaser's recommended code styles.
  * [Typings](https://www.npmjs.com/package/typings) - Provides typing information for TypeScript development.
  * [webpack](https://webpack.js.org/) - Combines source code and typings to compile TypeScript into a single JavaScript package.
* [Jed](https://slexaxton.github.io/Jed/)
  * [po2json](https://github.com/mikeedwards/po2json) - Convert your translation files into JSON that can be used by Jed.

## Quickstart
Run the following:

```
npm install
```

After installation, all packages should be ready to use in the `<directory>` indicated.  You should update the generic `package.json` and `src/html/index.html` files to with the name and version of the project, as applicable.

To initially populate the `www` directory, or update the `www` directory with any changes, use the following command:

```
grunt build
```

Top start a server for the project, use the command:

```
grunt serve
```

This will start a server at [http://localhost:9000](http://localhost:9000) on your computer.  You can open this page in your default browser by changing the command to `grunt open serve`.

While being served, you can use `F5` (or `<cmd>-R`) to reload the page in the browser.  Use `<ctrl>-C` on the command line to stop the server.

Or, if you plan to actively develop your project and need live reload, use the command:

```
grunt debug
```

This will copy any asset or static file changes immediately, as well as recompile any changed TypeScript files.  The task will automatically reload the page opened in your browser once the changes propagate into the `www` directory.

The page served by this task can also be manually reloaded in the browser, or aborted on the command line.

If you only want to update code changes without a server, you can use the command:

```
grunt watch
```

## Grunt Tasks
You can always use `grunt -h` to list all available tasks.  Below is a list of useful tasks.

- **build** - Clears all content out of `www`, then compiles and copies code and assets into the same directory.
- **serve** - Start a server at [http://localhost:9000](http://localhost:9000).  Press `<ctrl>-C` on the command line to stop the task.
- **debug** - Same as `serve`, but provides live reload for the served files. The `watch` task is called to trigger the live reload.  Press `<ctrl>-C` on the command line to stop the task.
- **lint** - Run all linters and code validation tasks.
- **open** - Open [http://localhost:9000](http://localhost:9000) in your default browser.

## License
Copyright 2016 Craig A. Hancock

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

http://www.apache.org/licenses/LICENSE-2.0 

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
