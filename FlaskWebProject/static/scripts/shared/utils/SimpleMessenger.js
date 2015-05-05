define([
  'dojo/_base/declare',
  'dojo/Evented'
], function(
  declare,
  Evented
) {

  return declare([
    Evented
  ], {

    publish: function(type, data) {
      this.emit(type, data);
    }

  });

});
