rig.js
======

Temporally extend an object's capabilities.

synopsis
--------

Create a rig

    var $ = rig.builder({
       'string' : {
         capitalize: function () {
           return this.charAt(0).toUpperCase() + this.substr(1);
         }
       },
       'array' : {
         compact: function () {
           var result = [];
           for (var i = 0; i < this.length; i++) {
             if (this[i]) result.push(this[i]);
           }
           return result;
         }
       }
    });

Apply it to a couple objects, to use new functionality
    
    $("rig").capitalize();                   // "Rig"
    $(["hello", "", "world", ""]).compact(); // ["hello", "world"]
    
