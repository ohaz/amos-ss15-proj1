define([
  'dojo/_base/window',
  'shared/env' // populate 'has'
], function(
  window,
  has
) {

  var hasTouch,
      win,
      doc,
      body;

  win = window.global;
  doc = window.doc;
  body = window.body();

  function NoClickDelay(el) {
    // restrict NoClickDelay to iOS devices since this is the only
    // platform this works reliably
    if (has('ios') && has('touch')) {
      el.addEventListener('touchstart', this, false);
      el.addEventListener('touchmove', this, false);
      el.addEventListener('touchend', this, false);
    }
  }

  NoClickDelay.prototype = {

    handleEvent: function(e) {
      switch(e.type) {
      case 'touchstart':
        this.onTouchStart(e);
        break;
      case 'touchmove':
        this.onTouchMove(e);
        break;
      case 'touchend':
        this.onTouchEnd(e);
        break;
      }
    },

    onTouchStart: function(e) {
      this.moved = false;
      this.start = +(new Date());
    },

    onTouchMove: function(e) {
      this.moved = true;
    },

    onTouchEnd: function(e) {
      var touch = e.changedTouches && e.changedTouches[0],
          now = +(new Date()),
          target,
          event;

      if (touch && !this.moved && now - this.start < 200) {
        target = doc.elementFromPoint(touch.clientX, touch.clientY);
        if (target.nodeType === Node.TEXT_NODE) {
          target = target.parentNode;
        }

        // Prevent the actual click from going though - unless the
        // target node is a SELECT or INPUT, in which case only
        // non-programmatic clicks are permitted to open the options
        // list and so the original event is required.
        if (!(target instanceof HTMLSelectElement || target instanceof HTMLInputElement)) {
          e.preventDefault();

          event = doc.createEvent('MouseEvents');
          event.initEvent('click', true /* bubbles */, true /* cancelable */);
          event.vClick = true;
          target.dispatchEvent(event);
        }
      }
    }
  };

  return function(domNode) {
    new NoClickDelay(domNode || body);
  };

});
