define([
  'dojo/_base/declare',
  'dojo/query',
  'dojo/dom-construct',
  'dojo/dom-class',
  '../_WidgetBase',
  'dojo/text!./templates/ExpandableContainer.html'
], function(
  declare,
  query,
  domConstruct,
  domClass,
  _WidgetBase,
  template
) {

  return declare('shared.widgets.ExpandableContainer', _WidgetBase, {

    templateString: template,
    baseClass: 'container-expandable-element',

    postCreate: function() {
      var headNode,
          contentNode;

      headNode = query('> [data-expandable-head]', this.domNode)[0];
      contentNode = query('> [data-expandable-content]', this.domNode)[0];

      domConstruct.empty(this.containerNode);

      this.headNode = domConstruct.create('div', {
        className: 'head-expandable-element'
      }, this.containerNode);

      this.contentNode = domConstruct.create('div', {
        className: 'content-expandable-element'
      }, this.containerNode);

      this.setHeadWidget(headNode);
      this.setContentWidget(contentNode);

      this.connect(this.headNode, 'click', this.onHeadClick);
    },

    onHeadClick: function() {
      domClass.toggle(this.domNode, 'expanded');
    },

    setHeadWidget: function(widgetOrNode) {
      this._setWidget(this.headNode, widgetOrNode);
    },

    setContentWidget: function(widgetOrNode) {
      this._setWidget(this.contentNode, widgetOrNode);
    },

    _setWidget: function(container, widgetOrNode) {
      if (!widgetOrNode) {
        return;
      }

      domConstruct.empty(container);
      if (typeof widgetOrNode.placeAt === 'function') {
        widgetOrNode.placeAt(container);
      } else {
        container.appendChild(widgetOrNode);
      }
    }

  });

});
