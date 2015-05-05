define([
  'dojo/_base/window',
  'dojo/_base/config',
  'dojo/has',

  'dojo/_base/sniff' // populate 'has'
], function(
  window,
  config,
  has
) {

  var global = window.global,
      body = window.body();

  has.add('localStorage', 'localStorage' in global);

  // Read CSS property
  // see http://adactio.com/journal/5429/
  var computedStyle = global.getComputedStyle(body,':after');
  if (computedStyle && computedStyle.getPropertyValue) {
    has.add('widescreen', computedStyle.getPropertyValue('content').indexOf('widescreen') !== -1);
  }

  return has;

});
