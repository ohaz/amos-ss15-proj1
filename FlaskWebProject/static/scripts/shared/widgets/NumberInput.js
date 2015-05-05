define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/number',
  'dojo/keys',
  'dojo/dom-style',
  'dojo/dom-class',
  'shared/_WidgetBase',
  'shared/utils/number',
  'shared/env'
], function(
  declare,
  lang,
  dojoNumber,
  keys,
  domStyle,
  domClass,
  _WidgetBase,
  number,
  has
) {

  var _round = dojoNumber.round,
      _parseNumber = dojoNumber.parse,
      _formatNumber = number.format,
      _bind = lang.hitch,
      NumberInputBase,
      additionalMembers = {};

  NumberInputBase = declare(_WidgetBase, {

    templateString: '<input type="text" data-dojo-attach-point="inputNode">',
    baseClass: 'number-input',
    value: 0,
    places: 0,
    formatNumber: _formatNumber,

    _setValueAttr: function(value) {
      if (value !== undefined) {
        if (typeof value !== 'number') {
          value = _parseNumber(value) || 0;
        }
        if (isNaN(value)) {
          value = 0;
        }

        value = _round(value, this.get('places'));
      }

      if (value !== this.get('value')) {
        this._set('value', value);
      }
      this._updateNodeValue();
    },

    _setPlacesAttr: function(places) {
      this.formatNumber = _formatNumber.withPlaces(places);
      this._set('places', places);
      this._updateNodeValue();
    },

    postCreate: function() {
      var node = this.inputNode;

      this.inherited(arguments);

      this._setSelectionRange = node.setSelectionRange ?
        _bind(node, 'setSelectionRange', 0, 999) :
        function() {};

      this.connect(node, 'keypress', this.onKeypress);
      this.connect(node, 'focus', this.onFocus);
      this.connect(node, 'blur', this.onBlur);
      this._updateNodeValue();
    },

    selectInput: function() {
      setTimeout(this._setSelectionRange, 0);
    },

    onKeypress: function(event) {
      var key = event.keyCode;

      if ((key < 48 || key > 57) && // 0-9
        key !== 44 &&               // ','
        key !== 45 &&               // '-'
        key !== keys.BACKSPACE &&
        key !== keys.TAB &&
        key !== keys.LEFT_ARROW &&
        key !== keys.RIGHT_ARROW) {
        event.preventDefault();
      }

      if (key === keys.ENTER) {
        this.inputNode.blur();
      }
    },

    onFocus: function() {
      var node = this.inputNode;

      node.value = node.value.replace(/\./g, '');
      this.selectInput();
    },

    onBlur: function() {
      this.set('value', this.inputNode.value.replace(/\./g, ''));
      this._updateNodeValue();
      this.emit('change', this.get('value'));
    },

    _updateNodeValue: function() {
      var value = this.get('value'),
          node = this.inputNode;

      if (value !== undefined) {
        node.value = this.formatNumber(value);
      } else {
        node.value = '';
      }
    }

  });

  if (has('ios')) {
    additionalMembers = {
      templateString: '<div><input type="number" data-dojo-attach-point="inputNode"><span class="number-input-value" data-dojo-attach-point="outputNode"></span></div>',

      postCreate: function() {
        this.inherited(arguments);

        domClass.add(this.domNode, 'number-input-ios');
      },

      onFocus: function() {
        setTimeout(_bind(this, this._switchToTextMode), 0);
      },

      onBlur: function() {
        domStyle.set(this.inputNode, 'opacity', '0');
        domStyle.set(this.outputNode, 'opacity', '1');
        this.set('value', this.inputNode.value);
        this._updateNodeValue();
        this._switchToNumberMode();
        this.emit('change', this.get('value'));
      },

      _switchToTextMode: function() {
        this.inputNode.type = 'text';
        this.inputNode.value = this.formatNumber(this.get('value')).replace(/\./g, '');
        domStyle.set(this.inputNode, 'opacity', '1');
        domStyle.set(this.outputNode, 'opacity', '0');
        this.selectInput();
      },

      _switchToNumberMode: function() {
        this.inputNode.type = 'number';
        this.inputNode.value = '';
      },

      _updateNodeValue: function() {
        var value = this.get('value'),
          node = this.outputNode;

        // TOOD: use html.setText()
        if (value !== undefined) {
          node.innerText = this.formatNumber(value);
        } else {
          node.innerText = '';
        }
      }
    };
  }

  return declare('shared.widgets.NumberInput', NumberInputBase, additionalMembers);

});
