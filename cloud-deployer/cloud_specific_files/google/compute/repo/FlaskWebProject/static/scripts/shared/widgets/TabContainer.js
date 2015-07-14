define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/query',
  'dojo/dom-prop',
  'dojo/dom-class',
  'dojo/dom-construct',
  'shared/utils/html',
  'shared/utils/urlParams',
  '../_WidgetBase',
  'dojo/text!./templates/TabContainer.html'
], function(
  declare,
  lang,
  on,
  query,
  domProp,
  domClass,
  domConstruct,
  html,
  urlParams,
  _WidgetBase,
  template
) {

  return declare('shared.widgets.TabContainer', _WidgetBase, {

    templateString : template,
    _listNode : null,
    _tabList : {},
    _tabIds: [],
    _selectedTab : null,

    postCreate : function() {
      this.inherited(arguments);

      function initTab(thisNode) {
        //start building up our tab object
        var tabObj = {
          paneNode: thisNode,
          label: html.getData(thisNode, 'tabTitle') || 'Undefined'
        };

        //get the tab name, we'll need this!
        var tabId = html.getData(thisNode, 'tabId');

        //add a list item and an anchor tag to the list
        var tabItem = domConstruct.create('li', {
          className: 'tab',
          'data-tab-id':tabId
        }, this._listNode);
        var tabLabel = domConstruct.create('span', {
          innerHTML: tabObj.label,
          className: 'tab-label'
        }, tabItem);
        tabObj.tabNode = tabItem;

        //connect the onclick event of our new link
        on(tabItem, 'click', lang.hitch(this, '_ontabItemClick'));

        //now add our tabObj to the dijit level tabList so we can
        //get to it later
        this._tabList[tabId] = tabObj;
        this._tabIds.push(tabId);

        //get hold of the selected attr, to see if it should
        //be initially visible - last one found will win this battle
        var tabSelectedAttr = html.getData(thisNode, 'tabSelected');
        var isSelected = tabSelectedAttr !== 'false' && tabSelectedAttr != null;

        if (!isSelected) {
          //not selected, so adding hidden class
          //(hidden class defined in global css as display:none)
          domClass.add(thisNode, 'hidden');
        }
        else {
          //this ones selected, so put the name into our selectedTab var
          this._selectedTab = tabId;
          //add a 'selected' class to our tab list item
          domClass.add(tabItem, 'selected');
        }
      }

      //look for divs with a tab attr inside my container node!
      query('> [data-tab-id]', this.containerNode).forEach(initTab, this);

      if (this.urlParam && urlParams[this.urlParam]) {
        this.selectTabByIndex(urlParams[this.urlParam]);
      }
    },

    selectTabByIndex: function(index) {
      if (this._tabIds.length > 0 && index < this._tabIds.length && index >= 0) {
        this.switchTab(this._tabIds[index]);
      }
    },

    _ontabItemClick : function(evt) {
      //get the tab attr from the clicked link and send to our switch tab function
      //we are doing this so that the switch tab method can also be accessed from
      //elsewhere, ie. a page controller.
      this.switchTab(html.getData(evt.currentTarget, 'tabId'));
    },

    switchTab : function(tabId) {
      //tabId is the name of the tab we are looking to show

      if (!this._tabList[tabId]) {
        return;
      }

      //hide current tab pane and then show the new tab pane
      domClass.add(this._tabList[this._selectedTab].paneNode, 'hidden');
      domClass.remove(this._tabList[tabId].paneNode, 'hidden');

      //remove 'selected' from the old tab list item and add
      //it to the new one
      domClass.remove(this._tabList[this._selectedTab].tabNode, 'selected');
      domClass.add(this._tabList[tabId].tabNode, 'selected');

      //now that it's done, change our selectedTab var
      this._selectedTab = tabId;

      //now fire an 'onTabChange' event so pageController can connect
      //and act upon it if required.
      this.onTabChange(tabId);
    },

    //Simple onTabChange event, connecting function will receive the
    //tab name that is now being displayed.
    onTabChange : function(tabId) {}
  });

});
