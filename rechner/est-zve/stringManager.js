define([
  "./config"
], function (
  config
) {

  var constants,
    labels;

  constants = config.constants || {};

  labels = {
    veranlagungsform: {}
  };

  labels.veranlagungsform[constants.VERANLAGUNGSFORM_EINZEL] = "Einzel";
  labels.veranlagungsform[constants.VERANLAGUNGSFORM_ZUSAMMEN] = "Zusammen";

  return {
    getLabel: function (key) {
      var label = labels[key] || {};
      return function (value) {
        return label[value] || "";
      };
    }
  };

});
