define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/text!./templates/TopBarMenu.html'
], function(
  declare,
  _WidgetBase,
  _TemplatedMixin,
  template
) {

  return declare('shared.widgets.TopBarMenu', [
    _WidgetBase,
    _TemplatedMixin
  ], {

    templateString: template,
    baseClass: 'submenu',

    postCreate: function() {
      this.connect(this.toggleNode, 'click', this.onToggleClick);
      this.connect(document.documentElement, 'click', this.onPageClick);

      this.inherited(arguments);
    },

    onToggleClick: function(event) {
      if (this.submenuNode.className == "invisible") {
        this._showSubMenu();
      } else {
        this._hideSubMenu();
      }
    },

    onPageClick: function(event) {
      if (!this._isChildOfMenuNode(event.target)) {
        this._hideSubMenu();
      }
    },

    _showSubMenu: function() {
      this.submenuNode.className = "visible";
      this.toggleWrapNode.className = "toggle on";
    },

    _hideSubMenu: function() {
      this.submenuNode.className = "invisible";
      this.toggleWrapNode.className = "toggle off";
    },

    _isChildOfMenuNode: function(node) {
      var submenuContainerNode = this.domNode;

      function check(n) {
        if (!n) {
          return false;
        } else if (n === submenuContainerNode) {
          return true;
        } else {
          return check(n.parentNode);
        }
      };

      return check(node);
    }
  });

});
