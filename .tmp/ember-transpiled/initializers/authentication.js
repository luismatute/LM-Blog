define("ghost/initializers/authentication", 
  ["ghost/utils/ghost-paths","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ghostPaths = __dependency1__["default"];

    var Ghost,
        AuthenticationInitializer;

    Ghost = ghostPaths();

    AuthenticationInitializer = {
        name: 'authentication',
        before: 'simple-auth',
        after: 'registerTrailingLocationHistory',

        initialize: function (container) {
            window.ENV = window.ENV || {};

            window.ENV['simple-auth'] = {
                authenticationRoute: 'signin',
                routeAfterAuthentication: 'content',
                authorizer: 'simple-auth-authorizer:oauth2-bearer'
            };

            SimpleAuth.Session.reopen({
                user: Ember.computed(function () {
                    return container.lookup('store:main').find('user', 'me');
                })
            });

            SimpleAuth.Authenticators.OAuth2.reopen({
                serverTokenEndpoint: Ghost.apiRoot + '/authentication/token',
                serverTokenRevocationEndpoint: Ghost.apiRoot + '/authentication/revoke',
                refreshAccessTokens: true,
                makeRequest: function (url, data) {
                    data.client_id = 'ghost-admin';
                    return this._super(url, data);
                }
            });

            SimpleAuth.Stores.LocalStorage.reopen({
                key: 'ghost' + (Ghost.subdir.indexOf('/') === 0 ? '-' + Ghost.subdir.substr(1) : '') + ':session'
            });
        }
    };

    __exports__["default"] = AuthenticationInitializer;
  });