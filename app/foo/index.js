(function() {

    // require('./foo.scss');

    var mod = angular.module('foo', []);

    mod.controller('FooController', ['$scope', fooController]);

    function fooController($scope) {
        console.log('foo controller');

        $scope.fooVar = "Foo controller variable."
    }

    module.exports = mod;
}());
