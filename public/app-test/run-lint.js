phantom.injectJs('./lib/phantom-lint/PhantomLint.js');
PhantomLint.init({
   filepaths : [
      '../',
      '../lib/DPM/'
   ],
   exclusions : [
      '../lib/',
      '../app-test/lib/'
   ],
   jsLint   : './lib/phantom-lint/jslint.js',
   //logFile   : 'lint-errors.txt',
   logFile   : 'CONSOLE',
   stopOnFirstError: false,
   verbose: false
});
