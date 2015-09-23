angular.module('jpDirectives',[]).directive('jpLandingPageScope', function ($compile, $http, getJSONService) {
    return {
        link: function (scope, el, attrs) {
            var obj = $.parseJSON(JSON.parse(JSON.stringify(attrs.landingpage)));
            //Begin WORKING $http get getJSON in DIRECTIVE
            $http.get('../JSON/BioSafetyCabinets.json').success(function (data) {
                scope.BioSafetyCabinets = data;
            });
            var jsonParse = JSON.parse(JSON.stringify(scope.BioSafetyCabinets, null, 4));
            console.log("scope.productJSON: " + jsonParse[0].Listing.Title);
            //End WORKING $http get getJSON in DIRECTIVE
            scope.productJSON = getJSONService.getJSON("booties");
            //var jsonParse1 = JSON.parse(JSON.stringify(scope.productJSON, null, 4));
            console.log("getJSONService: " + scope.productJSON[0]);
            console.log("attrs.landingpage: " + attrs.landingpage);//do not edit/delete

            //This array matches Consumables drop down selection to $scope variable of JSON object
            var nameArray = ['booties', 'Bouffant', 'Facemasks', 'Coats', 'Coveralls', 'StickyMats', 'FingerCots', 'GlovesVinyl', 'GlovesLatex', 'GlovesNitrile'];
            scope.productJSON = obj;
            var count = 0;
            scope.pageContent = "";
            angular.forEach(scope.productJSON, function () {
                var countProducts = 0;
                scope.pageContent += '' +
                    '<div class="container col-lg-4 col-sm-4" >' +
                        '<fieldset>' +
                            '<legend>' + scope.productJSON[count].title +
                            '</legend>' +
                            '<div class="panel panel-default">' +
                                '<div class="panel-heading">' +
                                scope.productJSON[count].product[0] + ' ( ' + scope.productJSON[count].product.length + ' ) ' +
                                '</div>' +
                                '<div class="panel-body">';
                angular.forEach(scope.productJSON[count].product, function () {
                    scope.pageContent += scope.productJSON[count].product[countProducts] + '<br />';
                    countProducts++;
                });
                scope.pageContent +=
                '</div>' +
            '<div class="panel-footer"></div>' +
            '</div>' +
        '</fieldset>' +
    '</div>' +
'';
                count++;
            });
            console.log("count: " + count);


            ($('#divContent').html(scope.pageContent));
        }
    }
});
//return {
    //    scope: { landingpage: '=' },// without this the product does not refresh when a recently viewed product it is clicked
    //    restrict: 'E',
    //    replace: true,
    //    controller: function(){
    //        console.log("Hello");
    //    },
    //    template: '<div ng-repeat="type in landingArea">' +
    //        '<div class="container col-lg-4 col-sm-4" >' +
    //                '<fieldset>' +
    //                    '<legend>landingpage.title</legend>' +
    //                    '<div class="panel panel-default">' +
    //                        '<div class="panel-heading">landingpage.title</div>' +
    //                        '<div class="panel-body" ng-repeat="product in landingpage.products">Panel Content</div>' +
    //                        '<div class="panel-footer">Panel Footer</div>' +
    //                    '</div>' +
    //                '</fieldset>' +
    //            '</div></div>',
    //    link: function (scope, el, attrs) {
    //        console.log("Hello");
    //        var productJSON = JSON.parse(attrs.landingpage);
    //    }
    //}
