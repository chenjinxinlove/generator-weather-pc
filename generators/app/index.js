'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stellar ' + chalk.red('generator-weather-pc') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Please input project name (weather_app):',
        default: 'weather_app'
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: 'Please input project description:'
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'Author (chenjinxinlvoe):',
        default: 'chenjinxinlvoe'
      },
      {
        type: 'list',
        name: 'projectLicense',
        message: 'Please choose license:',
        choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    var readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));
    this.fs.write(this.destinationPath('README.md'), readmeTpl({
      generatorName: 'generator-weather-pc',
      yoName: 'weather-pc'
    }));

    var pkg = this.fs.readJSON(this.templatePath('package_tmpl.json'), {});
    extend(pkg, {
      dependencies: {

      },
      devDependencies: {
        'babel-core': '^6.14.0',
        'babel-eslint': '^6.1.2',
        'babel-loader': '^6.2.5',
        'babel-plugin-transform-runtime': '^6.15.0',
        'babel-preset-es2015': '^6.14.0',
        'babel-preset-stage-2': '^6.13.0',
        'babel-runtime': '^6.11.6',
        del: '^2.2.2',
        eslint: '^3.7.1',
        'eslint-config-standard': '^6.2.1',
        'eslint-friendly-formatter': '^2.0.5',
        'eslint-loader': '^1.5.0',
        'eslint-plugin-html': '^1.3.0',
        'eslint-plugin-promise': '^2.0.1',
        'eslint-plugin-standard': '^2.0.1',
        'gulp-autoprefixer': '^3.1.1',
        'gulp-babel': '^6.1.2',
        'gulp-base64': '^0.1.3',
        'gulp-clean': '0.3.1',
        'gulp-concat': '2.6.0',
        'gulp-connect': '2.2.0',
        'gulp-css-base64': '^1.3.2',
        'gulp-css-spriter': '^0.3.3',
        'gulp-cssmin': '0.1.7',
        'gulp-file-include': '0.13.7',
        'gulp-ftp': '^1.1.0',
        'gulp-if-else': '^1.0.3',
        'gulp-imagemin': '^3.2.0',
        'gulp-less': '^3.1.0',
        'gulp-md5-plus': '0.1.8',
        'gulp-notify': '^2.2.0',
        'gulp-open': '1.0.0',
        'gulp-plumber': '^1.1.0',
        'gulp-postcss': '^6.4.0',
        'gulp-rename': '^1.2.2',
        'gulp-replace': '^0.5.4',
        'gulp-sass': '^2.3.2',
        'gulp-sequence': '^0.4.6',
        'gulp-sftp': '^0.1.5',
        'gulp-sourcemaps': '^2.5.1',
        'gulp-uglify': '^2.0.0',
        'gulp-util': '~2.2.9',
        'gulp-watch': '^4.3.9',
        'gulp-watch-path': '^0.1.0',
        'gulp-zip': '^4.0.0',
        lodash: '^4.17.4',
        'vinyl-named': '^1.1.0',
        webpack: '^1.12.14',
        'webpack-stream': '^3.2.0',
        'end-of-stream': '^1.4.0',
        gulp: '^3.9.1'
      }
    });
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push('generator-weather-pc');

    pkg.name = this.props.projectName;
    pkg.description = this.props.projectDesc;
    pkg.main = this.props.projectMain;
    pkg.author = this.props.projectAuthor;
    pkg.license = this.props.projectLicense;

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    mkdirp('src');
    mkdirp('src/i');
    mkdirp('src/js');
    mkdirp('src/styles');
    mkdirp('src/pages');
    mkdirp('src/pages/commom');
    mkdirp('src/styles/minxi');

    this.fs.copy(
      this.templatePath('.gitignore_tmpl'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('eslintrc_tmpl'),
      this.destinationPath('.eslintrc.js')
    );
    this.fs.copy(
      this.templatePath('gulpfile_tmpl.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copy(
      this.templatePath('editorconfig_tmpl'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('ftpConfig_tmpl.js'),
      this.destinationPath('ftpConfig.js')
    );
    this.fs.copy(
      this.templatePath('webpack.config_tmpl.js'),
      this.destinationPath('webpack.config.js')
    );

    this.fs.copy(
      this.templatePath('index_tmpl.html'),
      'src/pages/index.html'
    );
    this.fs.copy(
      this.templatePath('top_tmpl.html'),
      'src/pages/commom/top.html'
    );
    this.fs.copy(
      this.templatePath('mixin_tmpl.scss'),
      'src/styles/mixin/mixin.scss'
    );
    this.fs.copy(
      this.templatePath('top_tmpl.scss'),
      'src/styles/top.scss'
    );
    this.fs.copy(
      this.templatePath('index_tmpl.js'),
      'src/js/index.js'
    );
  }

  install() {
    this.installDependencies();
  }
};
