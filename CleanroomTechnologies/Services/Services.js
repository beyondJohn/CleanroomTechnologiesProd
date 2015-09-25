
app.service('getJSONService', function ($http) {
    this.getJSON = function (resource) {
        var fileName = resource;
        //return keyword super important here, without it data doesnt get back to the controller when using $http.get 
        return $http.get('../JSON/' + fileName + '.json').success(function (data) {
        })
    };
});
app.service('landingPageService', function () {
    return {}

});
app.service('selectedService', function () {
    return {}

});
app.service('productService', function () {
    return {}

});
app.service('detailsService', function () {
    return {}

});
app.service('recentlyViewedService', function () {
    return {}

});
app.service('masterJSONService', function () {
    return {}

});
app.service('routeTrackingService', function () {
    return {}

});
app.service('buildDetailsService', function () {
    this.mystring = "";
    this.myBuild = function (passedString) {
        //console.log("Service: " + passedString);
        
    }
    return this.mystring

});