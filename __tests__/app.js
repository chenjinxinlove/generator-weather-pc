'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-weather-pc:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true});
  });

  it('creates files', () => {
    assert.file([
      '.editorconfig', '.eslintrc.js', '.gitignore', 'gulpfile.js', 'package.json', 'webpack.config.js', 'src/js/index.js', 'src/styles/top.scss', 'src/styles/mixin/mixin.scss', 'src/pages/index.html', 'src/pages/commom/top.html'
    ]);
  });
});
