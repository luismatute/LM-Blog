define("ghost/views/post-settings-menu", 
  ["ghost/utils/date-formatting","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    /* global moment */
    var formatDate = __dependency1__.formatDate;

    var PostSettingsMenuView = Ember.View.extend({
        templateName: 'post-settings-menu',

        publishedAtBinding: Ember.Binding.oneWay('controller.publishedAt'),

        datePlaceholder: Ember.computed('controller.publishedAt', function () {
            return formatDate(moment());
        })
    });

    __exports__["default"] = PostSettingsMenuView;
  });