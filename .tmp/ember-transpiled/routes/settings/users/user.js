define("ghost/routes/settings/users/user", 
  ["ghost/routes/authenticated","ghost/mixins/style-body","ghost/mixins/shortcuts-route","ghost/utils/ctrl-or-cmd","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var AuthenticatedRoute = __dependency1__["default"];
    var styleBody = __dependency2__["default"];
    var ShortcutsRoute = __dependency3__["default"];
    var ctrlOrCmd = __dependency4__["default"];

    var shortcuts = {},
        SettingsUserRoute;

    shortcuts[ctrlOrCmd + '+s'] = {action: 'save'};

    SettingsUserRoute = AuthenticatedRoute.extend(styleBody, ShortcutsRoute, {
        titleToken: 'User',

        classNames: ['settings-view-user'],

        model: function (params) {
            var self = this;
            // TODO: Make custom user adapter that uses /api/users/:slug endpoint
            // return this.store.find('user', { slug: params.slug });

            // Instead, get all the users and then find by slug
            return this.store.find('user').then(function (result) {
                var user = result.findBy('slug', params.slug);

                if (!user) {
                    return self.transitionTo('error404', 'settings/users/' + params.slug);
                }

                return user;
            });
        },

        afterModel: function (user) {
            var self = this;
            this.store.find('user', 'me').then(function (currentUser) {
                var isOwnProfile = user.get('id') === currentUser.get('id'),
                    isAuthor = currentUser.get('isAuthor'),
                    isEditor = currentUser.get('isEditor');
                if (isAuthor && !isOwnProfile) {
                    self.transitionTo('settings.users.user', currentUser);
                } else if (isEditor && !isOwnProfile && !user.get('isAuthor')) {
                    self.transitionTo('settings.users');
                }
            });
        },

        deactivate: function () {
            var model = this.modelFor('settings.users.user');

            // we want to revert any unsaved changes on exit
            if (model && model.get('isDirty')) {
                model.rollback();
            }

            this._super();
        },

        shortcuts: shortcuts,

        actions: {
            save: function () {
                this.get('controller').send('save');
            }
        }
    });

    __exports__["default"] = SettingsUserRoute;
  });