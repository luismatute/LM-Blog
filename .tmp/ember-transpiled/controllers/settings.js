define("ghost/controllers/settings", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var SettingsController = Ember.Controller.extend({
        showApps: Ember.computed.bool('config.apps'),
        showTags: Ember.computed.bool('config.tagsUI')
    });

    __exports__["default"] = SettingsController;
  });