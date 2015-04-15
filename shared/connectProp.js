define([
  'dojo/_base/connect'
], function(
  connect
) {

  var after = connect.connect;

  function _connect(source, srcAttr, target, targetAttr) {
    return source.watch(srcAttr, function(name, oldValue, newValue) {
      target.set(targetAttr, newValue);
    });
  }

  function _disconnect(handles) {
    return function() {
      var handle;
      while (handles && handles.length > 0) {
        handle = handles.pop();
        handle.unwatch();
      }
      handles = null;
    };
  }

  function connectProp(source, srcAttr, target, targetAttr) {
    var handle,
        handles = [],
        disconnect;

    targetAttr = targetAttr || srcAttr;

    // sync values
    target.set(targetAttr, source.get(srcAttr));

    // connect source -> target
    handle = _connect(source, srcAttr, target, targetAttr);
    handles.push(handle);

    // connect target -> source
    handle = _connect(target, targetAttr, source, srcAttr);
    handles.push(handle);

    // create disconnect function
    disconnect = _disconnect(handles);

    // attach disconnect function to destroy methods if available
    if (typeof source.destroy === 'function') {
      after(source, 'destroy', null, disconnect);
    }
    if (typeof target.destroy === 'function') {
      after(target, 'destroy', null, disconnect);
    }

    return {
      disconnect: disconnect
    };
  }

  return connectProp;

});
