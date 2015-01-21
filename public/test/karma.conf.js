module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'app/bower_components/cryptojslib/rollups/aes.js',
      'app/bower_components/jquery/dist/jquery.min.js',
      'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
      'app/bower_components/angular/angular.min.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-route/angular-route.min.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'test/unit/global.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
