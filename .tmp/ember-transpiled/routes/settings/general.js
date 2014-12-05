define("ghost/routes/settings/general", 
  ["ghost/routes/authenticated","ghost/mixins/loading-indicator","ghost/mixins/current-user-settings","ghost/mixins/style-body","ghost/mixins/shortcuts-route","ghost/utils/ctrl-or-cmd","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __exports__) {
    "use strict";
    var AuthenticatedRoute = __dependency1__["default"];
    var loadingIndicator = __dependency2__["default"];
    var CurrentUserSettings = __dependency3__["default"];
    var styleBody = __dependency4__["default"];
    var ShortcutsRoute = __dependency5__["default"];
    var ctrlOrCmd = __dependency6__["default"];

    var shortcuts = {},
        SettingsGeneralRoute;

    shortcuts[ctrlOrCmd + '+s'] = {action: 'save'};

    SettingsGeneralRoute = AuthenticatedRoute.extend(styleBody, loadingIndicator, CurrentUserSettings, ShortcutsRoute, {
        titleToken: 'General',

        classNames: ['settings-view-general'],

        beforeModel: function () {
            return this.currentUser()
                .then(this.transitionAuthor())
                .then(this.transitionEditor());
        },

        model: function () {
            return this.store.find('setting', {type: 'blog,theme'}).then(function (records) {
                return records.get('firstObject');
            });
        },

        shortcuts: shortcuts,

        actions: {
            save: function () {
                this.get('controller').send('save');
            }
        }
    });

    __exports__["default"] = SettingsGeneralRoute;
  });