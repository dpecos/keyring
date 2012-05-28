jasmine.Matchers.prototype.toBeArray = function(expected) {
   var equal = typeof (this.actual) == 'object' && (this.actual instanceof Array) &&
      typeof (expected) == 'object' && (expected instanceof Array) &&
      this.actual.length === expected.length;

   for (var i=0; equal && i<expected.length; i++) {
      if (this.actual[i] !== expected[i]) {
         equal = false;
      }
   }

   return equal;
}
