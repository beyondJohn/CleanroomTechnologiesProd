var app = angular.module('myApp', ['ngRoute', 'ngResource', 'duScroll', 'angularytics', 'jpDirectives']);

app.config(function ($routeProvider, $locationProvider, AngularyticsProvider) {
    $routeProvider.when('/', {
        controller: 'MainController',
        templateUrl: 'USP797Index.html'
    }).when('/Modular', {
        controller: 'MainController',
        templateUrl: 'Modular.html'
    }).when('/BSC', {
        controller: 'MainController',
        templateUrl: 'BSC.html'
    }).when('/HEPA', {
        controller: 'MainController',
        templateUrl: 'HEPA.html'
    }).when('/Furniture', {
        controller: 'MainController',
        templateUrl: 'Furniture.html'
    }).when('/Consumables', {
        controller: 'MainController',
        templateUrl: 'Consumables.html'
    }).when('/Softwall', {
        controller: 'MainController',
        templateUrl: 'Softwall.html'
    }).when('/ProductRecent', {
        controller: 'MainController',
        templateUrl: 'ProductRecent.html'
    }).when('/Product', {
        controller: 'MainController',
        templateUrl: 'Product.html'
    }).when('/AboutUs', {
        controller: 'AboutUsController',
        templateUrl: 'AboutUs.html'
    });
    AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
    //$locationProvider.html5Mode(true);
}).run(function (Angularytics) {
    Angularytics.init();
});


