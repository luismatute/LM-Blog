define("ghost/routes/posts", 
  ["ghost/routes/authenticated","ghost/mixins/style-body","ghost/mixins/shortcuts-route","ghost/mixins/loading-indicator","ghost/mixins/pagination-route","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var AuthenticatedRoute = __dependency1__["default"];
    var styleBody = __dependency2__["default"];
    var ShortcutsRoute = __dependency3__["default"];
    var loadingIndicator = __dependency4__["default"];
    var PaginationRouteMixin = __dependency5__["default"];

    var paginationSettings,
        PostsRoute;

    paginationSettings = {
        status: 'all',
        staticPages: 'all',
        page: 1
    };

    PostsRoute = AuthenticatedRoute.extend(ShortcutsRoute, styleBody, loadingIndicator, PaginationRouteMixin, {
        titleToken: 'Content',

        classNames: ['manage'],

        model: function () {
            var self = this;

            return this.store.find('user', 'me').then(function (user) {
                if (user.get('isAuthor')) {
                    paginationSettings.author = user.get('slug');
                }

                // using `.filter` allows the template to auto-update when new models are pulled in from the server.
                // we just need to 'return true' to allow all models by default.
                return self.store.filter('post', paginationSettings, function (post) {
                    if (user.get('isAuthor')) {
                        return post.isAuthoredByUser(user);
                    }

                    return true;
                });
            });
        },

        setupController: function (controller, model) {
            this._super(controller, model);
            this.setupPagination(paginationSettings);
        },

        stepThroughPosts: function (step) {
            var currentPost = this.get('controller.currentPost'),
                posts = this.get('controller.arrangedContent'),
                length = posts.get('length'),
                newPosition;

            newPosition = posts.indexOf(currentPost) + step;

            // if we are on the first or last item
            // just do nothing (desired behavior is to not
            // loop around)
            if (newPosition >= length) {
                return;
            } else if (newPosition < 0) {
                return;
            }

            this.transitionTo('posts.post', posts.objectAt(newPosition));
        },

        scrollContent: function (amount) {
            var content = Ember.$('.js-content-preview'),
                scrolled = content.scrollTop();

            content.scrollTop(scrolled + 50 * amount);
        },

        shortcuts: {
            'up, k': 'moveUp',
            'down, j': 'moveDown',
            left: 'focusList',
            right: 'focusContent',
            c: 'newPost'
        },

        actions: {
            focusList: function () {
                this.controller.set('keyboardFocus', 'postList');
            },
            focusContent: function () {
                this.controller.set('keyboardFocus', 'postContent');
            },
            newPost: function () {
                this.transitionTo('editor.new');
            },

            moveUp: function () {
                if (this.controller.get('postContentFocused')) {
                    this.scrollContent(-1);
                } else {
                    this.stepThroughPosts(-1);
                }
            },

            moveDown: function () {
                if (this.controller.get('postContentFocused')) {
                    this.scrollContent(1);
                } else {
                    this.stepThroughPosts(1);
                }
            }
        }
    });

    __exports__["default"] = PostsRoute;
  });