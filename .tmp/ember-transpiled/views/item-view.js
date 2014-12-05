define("ghost/views/item-view", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var ItemView = Ember.View.extend({
        classNameBindings: ['active'],

        active: Ember.computed('childViews.firstObject.active', function () {
            return this.get('childViews.firstObject.active');
        })
    });

    __exports__["default"] = ItemView;
  });