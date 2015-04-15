define([
  'dojo/io-query'
], function(
  ioQuery
) {

  var uri,
      qIndex,
      queryStr,
      queryObj;

  uri = location.href;
  qIndex = uri.indexOf('?');
  queryStr = qIndex >= 0 ? uri.substring(qIndex + 1, uri.length) : '';
  queryObj = ioQuery.queryToObject(queryStr);

  return queryObj;

});
