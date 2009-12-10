var rig = (function (global) {
    //
    //   // usage
    //
    //   var $ = rig.builder({
    //      'string' : {
    //        capitalize: function () {
    //          return this.charAt(0).toUpperCase() + this.substr(1);
    //        }
    //      },
    //      'array' : {
    //        compact: function () {
    //          var result = [];
    //          for (var i = 0; i < this.length; i++) {
    //            if (this[i]) result.push(this[i]);
    //          }
    //          return result;
    //        }
    //      }
    //   });
    //
    //   $("rig").capitalize();                   // "Rig"
    //   $(["hello", "", "world", ""]).compact(); // ["hello", "world"]
    //
    var extensions = {
      'string'  : {},
      'number'  : {},
      'array'   : {},
      'function': {},
      'regexp'  : {},
      'object'  : {}
    };

    var extend = function (obj, type) {
      var ext = extensions[type.name.toLowerCase()];
      for (var e in ext) { obj[e] = ext[e] }
      return obj;
    };

    return {
      // return a build() function, for the purpose of rigging objects.
      builder: function (exts) {
        extensions = exts;
        return this.build;
      },

      // detect what the object is, and extend it accordingly.
      build: function (obj) {
        var types = [Array, Function, Number, String, RegExp, Object];
        var type = global[(typeof obj).charAt(0).toUpperCase() + 
                          (typeof obj).substr(1)];

        // So it's an object, but lets find out what's hidden inside of it.
        // For some reason typeof() returns 'function' in safari,
        // so we check the instance for function just in case.
        if (typeof(obj) === 'object' || typeof(obj) === 'function') {
          for (var i = 0; i < types.length; i++) {
            if (obj instanceof types[i]) {
              return extend(obj, types[i]);
            }
          }
        } else {
          // Wrap the literal in an object, so we can extend it.
          return extend(new(type)(obj), type);
        }
      },
    };
// Send the global object to the function. If we aren't in a browser,
// assume we are using Node.js, cause why else would you be running
// JS on the server?
})(typeof(window) === 'undefined' ? GLOBAL : window);

// If we are using rig as a Common.js module, expose build()
if (typeof exports !== 'undefined') exports.builder = rig.builder;

