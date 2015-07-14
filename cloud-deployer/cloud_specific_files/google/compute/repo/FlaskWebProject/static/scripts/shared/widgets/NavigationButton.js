define([
  'dojo/_base/declare',
  'shared/_ButtonBase'
], function(
  declare,
  _ButtonBase
) {

  return declare('shared.widgets.NavigationButton', _ButtonBase, {

    href: '',
    _setHrefAttr: { node: 'domNode' }

  });

});
