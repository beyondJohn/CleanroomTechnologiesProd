var app = angular.module('esdApp', ['ngRoute', 'ngResource', 'duScroll', 'angularytics', 'jpDirectives', 'ngAnimate', 'ui.bootstrap']);

app.config(function ($routeProvider, $locationProvider, AngularyticsProvider) {
    $routeProvider.when('/', {
        controller: 'MainController',
        templateUrl: 'ESDIndex.html'
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
    }).when('/Product', {
        controller: 'MainController',
        templateUrl: 'Product.html'
    }).when('/AboutUs', {
        controller: 'AboutUsController',
        templateUrl: 'Views/AboutUs.html'
    });
    AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
    //$locationProvider.html5Mode(true);
}).run(function (Angularytics) {
    Angularytics.init();
});


