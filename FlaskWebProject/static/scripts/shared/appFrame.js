define([
  'dojo/_base/kernel',
  'dojo/_base/lang',
  'dojo/_base/window',
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/hash',
  'dojo/json',
  'shared/utils/html'
], function(
  kernel,
  lang,
  window,
  array,
  declare,
  hash,
  json,
  html
) {

  var ACTIONSHEET_CALLBACK = 'actionSheetCallback',
      ActionButtons,
      actionButtons;

  kernel.global[ACTIONSHEET_CALLBACK] = function(buttonName) {
    actionButtons.press(buttonName);
    actionButtons.clear();
  };


  ActionButtons = declare(null, {

    constructor: function() {
      this.clear();
    },

    add: function(name, label, callback, context) {
      this._frameOptions[name] = {
        title: label,
        callback: ACTIONSHEET_CALLBACK + '("' + name + '")'
      };
      this._buttons[name] = {
        callback: callback,
        context: context
      };
    },

    setRect: function(coords) {
      this._frameOptions['rect'] = coords;
    },

    press: function(name) {
      var pressed = this._buttons[name];

      if (!pressed) {
        return;
      }
      if (lang.isFunction(pressed.callback)) {
        pressed.callback.call(pressed.context || kernel.global);
      }
    },

    clear: function() {
      this._buttons = {};
      this._frameOptions = {};
    },

    toJSON: function() {
      return this._frameOptions;
    }
  });
  actionButtons = new ActionButtons();


  var AppFrame = declare(null, {

    send: function(message) {
      console.log('send message ' + message);
      setTimeout(function() {
        hash('!' + message);
        hash('!');
      }, 0);
    },

    back: function() {
      this.send('back');
    },

    confirm: function(options) {
      options = options || {};

      var destroy = options.destroy,
          cancel = options.cancel,
          other = options.other,
          buttonNode = options.buttonNode;

      actionButtons.clear();

      if (destroy) {
        actionButtons.add(
          'destructiveButton',
          destroy.label,
          destroy.callback,
          destroy.context
        );
      }

      if (cancel) {
        actionButtons.add(
          'cancelButton',
          cancel.label,
          cancel.callback,
          cancel.context
        );
      }

      array.forEach(other, function(otherButton, i) {
        var name = 'other-' + i;
        actionButtons.add(
          name,
          otherButton.label,
          otherButton.callback,
          otherButton.context
        );
      });

      if (buttonNode) {
        actionButtons.setRect(html.getViewportRect(buttonNode));
      }

      this.send('actionsheet/' + json.stringify(actionButtons));
    },

    updatePageInfo: function(pageinfo) {
      window.global.pageinfo = pageinfo;
      this.send('updatePageinfo');
    },

    updateSettingsUrl: function(url) {
      var pageinfo = window.global.pageinfo || {};
      pageinfo.settingsUrl = url;
      this.updatePageInfo(pageinfo);
    }

  });

  return new AppFrame();

});
