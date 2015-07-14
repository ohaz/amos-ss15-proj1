define([
  'require',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/json',
  'dojo/on',
  'dojo/dom-attr',
  'dojo/dom-class',
  'dojo/hash',
  'shared/utils/noClickDelay',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/text!./templates/AppController.html',

  'shared/widgets/TopBarMenu',
  'dojo/query' // for event delegation
], function(
  require,
  declare,
  lang,
  json,
  on,
  domAttr,
  domClass,
  hash,
  noClickDelay,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template
) {

  var _bind = lang.hitch;

  return declare([
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin
  ], {

    templateString: template,

    _setSettingsPageMidAttr: function(settingsPageMid) {
      if (settingsPageMid) {
        this._enableSettingsButton();
      } else {
        this._disableSettingsButton();
      }

      this._set('settingsPageMid', settingsPageMid);
    },

    constructor: function() {
      this.stack = [];
      this.currentPage = null;
      this.settingsPageMid = null;
    },

    startup: function() {
      noClickDelay(this.domNode);
      this._poulateTitle();

      hash("", true);

      this.navigateTo(this.initialPage);

      this.connect(window, "onhashchange", _bind(this, this.onHashChange));

      on(this.backButtonNode, 'click', _bind(this, this.back))
      on(this.settingsButtonNode, 'click', _bind(this, this.onSettingsClick));
      on(this.domNode, 'a:click', this._createClickHandler());

      this.inherited(arguments);
    },

    onHashChange: function(event) {
      var mid = "";
      var pageParams = {};
      var h = decodeURIComponent(hash()).match(/([a-zA-Z]+);?(.*)?/);

      if(h != null && h.length > 0) {
        mid = h[1];
        if(h.length > 1)
          pageParams = json.fromJson(h[2]);
      }

      var popIndex = this._findInStack(mid);

      if(popIndex < 0) {
        // history forward event
        this.navigateTo(mid, pageParams);
      } else if(popIndex < this.stack.length -1) {
        // history back event, pop till we reach target
        while(popIndex < this.stack.length) {
          this.transitionBack();
          popIndex++;
        }
      }
    },

    onSettingsClick: function(event) {
      if (this.settingsPageMid) {
        this.navigateTo(this.settingsPageMid);
      }
    },

    navigateTo: function(pageMid, pageParams) {
      function onLoad(Page) {
        var defaultParams = {
          config: this.config,
          rechner: this.rechner,
          appFrame: this
        };

        pageParams = pageParams || {};

        var page = new Page(lang.mixin(defaultParams, pageParams));
        page._mid = pageMid;
        this.transitionTo(page, pageParams);
      }

      this._loadPageConstructor(_bind(this, onLoad), pageMid);
    },

    transitionTo: function(page, pageParams) {
      this._pushPageToStack(page);
      this._replaceCurrentPage(page);
      page.startup(true /* omitNoClickDelay */);
      this._updateHash(page, pageParams);
    },

    transitionBack: function() {
      var lastPage = this._popPageFromStack();
      var page = this._peekStack();
      this._replaceCurrentPage(page);
      lastPage.destroy();
    },

    back: function() {
      window.history.back();
    },

    confirm: function(options) {
      if (window.confirm('Sind Sie sicher?')) {
        options.destroy.callback.call(options.destroy.context || null);
      }
    },

    updateSettingsUrl: function(url) {
      // noop
    },

    _findInStack: function(mid) {
      if(mid == "")
        return 0;

      for(var i in this.stack) {
          var page = this.stack[i];
          if(page._mid == mid)
            return i;
      }
      return -1;
    },

    _updateHash: function(page, pageParams) {
      if(page._mid != this.initialPage) {
        var h = page._mid;
        if(pageParams != undefined) {
          h += ";" + json.toJson(pageParams);
        }

        hash(encodeURIComponent(h));
      }
    },

    _createClickHandler: function() {
      var self = this;

      return function(event) {
        // 'this' points to link element
        var targetPage,
            targetParams;

        targetPage = domAttr.get(this, 'data-target-page');
        targetParams = domAttr.get(this, 'data-target-params');

        if (targetPage) {
          if (targetParams) {
            targetParams = json.fromJson(targetParams);
          }

          event.preventDefault();
          self.navigateTo(targetPage, targetParams);
        }
      };
    },

    _peekStack: function() {
      return this.stack[this.stack.length-1];
    },

    _pushPageToStack: function(page) {
      if (page) {
        this.stack.push(page);
      }
    },

    _popPageFromStack: function() {
      var page = this.stack.pop();

      if (!page) {
        console.log('empty stack');
        return null;
      }

      return page;
    },

    _replaceCurrentPage: function(page) {
      if (!page) {
        return;
      }

      if (this.currentPage) {
        this.currentPage.detach();
      }

      this.set('settingsPageMid', page.get('settingsPage'));
      page.placeAt(this.stageNode);
      this.currentPage = page;
    },

    _enableSettingsButton: function() {
      domClass.remove(this.settingsButtonNode, 'hidden');
    },

    _disableSettingsButton: function() {
      domClass.add(this.settingsButtonNode, 'hidden');
    },

    _loadPageConstructor: function(callback, pageMid) {
      require([this.packageName + '/widgets/' + pageMid], callback);
    },

    _poulateTitle: function() {
      var title = document.getElementsByTagName('title')[0];
      this.titleNode.innerHTML = title ? title.innerHTML : '';
    }

  });
});
