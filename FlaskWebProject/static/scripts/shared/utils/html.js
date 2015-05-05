define([
  'dojo/_base/window',
  './string',
  'dojo/dom-class'
], function(
  win,
  string,
  domClass
) {

  return {
    setText: function(node, text) {
      var textNode = win.doc.createTextNode(text);
      node.innerHTML = '';
      node.appendChild(textNode);
    },

    escape: function(text) {
      var node,
          textNode;

      textNode = win.doc.createTextNode(text);
      node = win.doc.createElement('div');
      node.appendChild(textNode);
      return node.innerHTML;
    },

    getData: function(node, key) {
      return node.dataset ?
        node.dataset[key] :
        node.getAttribute('data-' + string.toDashed(key));
    },

    hide: function(node) {
      domClass.add(node, 'hidden');
    },

    show: function(node) {
      domClass.remove(node, 'hidden');
    },

    getViewportRect: function(node) {
      var rect;

      if (node && node.getBoundingClientRect) {
        rect = node.getBoundingClientRect();
        return {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        };
      } else {
        return null;
      }
    },

    hasFocus: function(node) {
      return !!(node && document.activeElement === node);
    }
  };

});
