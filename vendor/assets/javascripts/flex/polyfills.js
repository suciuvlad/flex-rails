// Object.create support test, and fallback for browsers without it
if ( typeof Object.create !== 'function' ) {
  Object.create = function (o) {
      function F() {}
      F.prototype = o;
      return new F();
  };
}