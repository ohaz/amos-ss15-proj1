define([
  'dojo/text',
  'dojo/_base/array'
], function(
  text,
  array
){

  var buildMap = {};

  function csvParse(data) {
    var row,
        result = [];

    array.forEach(data.split('\n'), function(r) {
      if (r.indexOf(';') < 0) {
        return;
      }

      row = [];
      result.push(row);
      array.forEach(r.split(';'), function(c) {
        row.push(c);
      });
    });

    return result;
  }

  return {
    load : function(name, req, onLoad, config) {
      text.load(name, req, function(text) {
        onLoad(csvParse(text));
      });


//      text.get(req.toUrl(name), function(data){
//        if (config.isBuild) {
//          buildMap[name] = data;
//          onLoad(data);
//        } else {
//          onLoad(csvParse(data));
//        }
//      });
    }

//    write : function(pluginName, moduleName, write){
//      if(moduleName in buildMap){
//        var content = buildMap[moduleName];
//        write('define("'+ pluginName +'!'+ moduleName +'", function(){ return '+ content +';});\n');
//      }
//    }

  };
});
