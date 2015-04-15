define([
  'dojo/_base/declare',
  'dojo/has',
  'dojo/dom-class'
], function(
  declare,
  has,
  domClass
) {

  var hasTouch = has('touch'),
    actionStartEvent,
    actionEndEvent;

  actionStartEvent = hasTouch ?
    'touchstart':
    'mouseover';
  actionEndEvent = hasTouch ?
    'touchend':
    'mouseout';

  return declare(null, {

    tappedClass: 'button-tapped',
    tapableNode: null,

    postCreate: function() {
      this.tapableNode = this.tapableNode || this.buttonNode || this.domNode;
      this.connect(this.tapableNode, actionStartEvent, this._highlight);
      this.connect(this.tapableNode, actionEndEvent, this._unhighlight);
      this.connect(this.tapableNode, 'click', this._unhighlight);
    },

    _highlight: function(event) {
      domClass.add(this.tapableNode, this.tappedClass);
    },

    _unhighlight: function(event) {
      domClass.remove(this.tapableNode, this.tappedClass);
    }

  });

});
