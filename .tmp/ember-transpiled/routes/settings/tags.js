define("ghost/routes/settings/tags", 
  ["ghost/routes/authenticated","ghost/mixins/current-user-settings","ghost/mixins/pagination-route","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var AuthenticatedRoute = __dependency1__["default"];
    var CurrentUserSettings = __dependency2__["default"];
    var PaginationRouteMixin = __dependency3__["default"];

    var TagsRoute = AuthenticatedRoute.extend(CurrentUserSettings, PaginationRouteMixin, {

        actions: {
            willTransition: function () {
                this.send('closeSettingsMenu');
            }
        },

        titleToken: 'Tags',

        beforeModel: function () {
            if (!this.get('config.tagsUI')) {
                return this.transitionTo('settings.general');
            }

            return this.currentUser()
                .then(this.transitionAuthor());
        },

        model: function () {
            return this.store.find('tag');
        },

        setupController: function (controller, model) {
            this._super(controller, model);
            this.setupPagination();
        },

        renderTemplate: function (controller, model) {
            this._super(controller, model);
            this.render('settings/tags/settings-menu', {
                into: 'application',
                outlet: 'settings-menu',
                view: 'settings/tags/settings-menu'
            });
        }
    });

    __exports__["default"] = TagsRoute;
  });