'use strict';

require('./core');

require('angular');
require('angular-ui-router');
require('oclazyload');

var app = angular.module('webpackExample', [
    'ui.router',
    'oc.lazyLoad'
]);

angular.module('webpackExample')
    .config([
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        function($stateProvider, $locationProvider, $urlRouterProvider) {
            $stateProvider
                .state('foo', {
                    url: '/foo',
                    templateProvider: (function($q) {
                        return $q(function(resolve) {
                            require.ensure([], function() {
                                return resolve(require('./foo/foo.html'));
                            });
                        });
                    }),
                    controller: 'FooController',
                    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                        var deferred = $q.defer();

                        require.ensure([], function(require) {
                            var mod = require('./foo');
                            $ocLazyLoad.load({
                                name: mod.name,
                            });

                            deferred.resolve(mod.controller);
                        });

                        return deferred.promise;
                    }]
                })
                .state('bar', {
                    url: '/bar',
                    templateProvider: (function($q) {
                        return $q(function(resolve) {
                            require.ensure([], function() {
                                return resolve(require('./bar/bar.html'));
                            });
                        });
                    }),
                    controller: 'BarController as vm',
                    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                        var deferred = $q.defer();

                        require.ensure([], function(require) {
                            var mod = require('./bar');
                            $ocLazyLoad.load({
                                name: mod.name,
                            });

                            deferred.resolve(mod.controller);
                        });

                        return deferred.promise;
                    }]
                });

            $locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise('/foo');
        }
    ]);
