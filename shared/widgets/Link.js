define([
  'dojo/_base/declare',
  'shared/_WidgetBase',
  'shared/widgets/_TapHighlightNodeMixin',
  'dijit/_Container',
  'dojo/dom-attr',
  'dojo/_base/json',
  'dojo/io-query'
], function(
  declare,
  _WidgetBase,
  _TapHighlightNodeMixin,
  _Container,
  domAttr,
  json,
  ioQuery
) {

  return declare('shared.widgets.Link', [
    _WidgetBase,
    _Container,
    _TapHighlightNodeMixin
  ], {

    templateString: '<a data-dojo-attach-point="containerNode"></a>',

    _setTargetPageAttr: { node: 'domNode', attribute: 'data-target-page' },

    _setTargetParamsAttr: function(targetParams) {
      domAttr.set(this.domNode, 'data-target-params', json.toJson(targetParams));
      this._set('targetParams', targetParams);
      this._updateHref();
    },

    targetDocument: '#',
    _setTargetDocumentAttr: function(targetDocument) {
      this._set('targetDocument', targetDocument);
      this._updateHref();
    },

    targetTitle: '',
    _setTargetTitleAttr: function(targetTitle) {
      this._set('targetTitle', targetTitle);
      this._updateHref();
    },

    _updateHref: function() {
      var document = this.get('targetDocument') || '#',
          title = this.get('targetTitle'),
          params = this.get('targetParams') || {},
          queryString;

      if (title) {
        params.title = title;
      }

      queryString = ioQuery.objectToQuery(params);
      if (queryString) {
        document += '?' + queryString;
      }

      this.set('href', document);
    }

  });


});
