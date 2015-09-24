angular.module('jpDirectives').directive('jpLandingPageScope', function ($compile, $http, getJSONService, masterJSONService) {
    return {
        link: function (scope, el, attrs) {

            //pass getJSON a parameter to get it to work. For some reason the getJSON var accesses the masterJSONService. Weird!
            var getJSON = getJSONService.getJSON("booties");
            getJSON.then(function (data) {//.then is need to await the asynchronos $http get completion
                scope.masterJSON = scope.masterJSON.concat(data);
                //console.log(data.data);
                masterJSONService = scope.masterJSON;
                //pass masterJSONService out of getJSON.then promise back to scope
                scope.getComplete(masterJSONService);
            });
            //gets executed after $http get promise is completed above
            scope.getComplete = function (myService) {
                scope.checkMaster = myService;
                //console.log("scope.checkMaster: " + scope.checkMaster[0].Listing.Price);//Works, do not edit/delete
                //This array matches Consumables drop down selection to $scope variable of JSON object
                var nameArray = ['HEPA Filtration Units', 'Biological Safety Cabinets', 'Modular', 'Softwall Cleanrooms', 'Furniture', 'Bouffant & Beard Covers', 'Facemasks & Hoods', 'Coats', 'Coveralls', 'StickyMats', 'Finger Cots', 'Gloves Vinyl', 'Gloves Latex', 'Gloves Nitrile'];
                var countProductsArray = [];
                scope.pageContent = '';
                scope.pageContent += '<div class="container" id="2"><div class="row"><div class="col-sm-8">' +
                    '<accordion close-others="oneAtATime">';
                for (i = 0; i < nameArray.length ; i++)
                {
                    var countProducts = 0;
                    for(j = 0; j < (scope.checkMaster.length - 1); j++)
                    {
                        if (nameArray[i] == scope.checkMaster[j].Category) {
                            countProducts++;
                        }
                    }
                    countProductsArray[i] = countProducts;
                    if(i == 0){
                        scope.pageContent +=
                        '<accordion-group style="text-align:center;" heading="' +
                        nameArray[i] + ' ( ' + countProducts + ' ) ' +
                        '" is-open="status.isFirstOpen" is-disabled="status.isFirstDisabled">';
                        for (f = 0; f < (scope.checkMaster.length - 1) ; f++) {
                            if (nameArray[i] == scope.checkMaster[f].Category) {
                                scope.pageContent += '' +
                                '<a href="#">' +
                                scope.checkMaster[f].Listing.Title +
                                '<br /><img src="'+
                                scope.checkMaster[f].Listing.Pic +
                                '" width="70" /><br />' +
                                scope.checkMaster[f].Listing.Price +
                                '</a><br /><br />';
                            }
                        }
                        scope.pageContent += '</accordion-group>';
                    }
                    else {
                        scope.pageContent +=
                        '<accordion-group style="text-align:center;" heading="' +
                        nameArray[i] + ' ( ' + countProducts + ' ) ' + ' ">'; 
                        for (f = 0; f < (scope.checkMaster.length - 1) ; f++)
                                        {
                                            if (nameArray[i] == scope.checkMaster[f].Category){
                                                scope.pageContent += '' +
                                                '<a href="#">' +
                                                scope.checkMaster[f].Listing.Title +
                                                '<br /><img src="' +
                                                scope.checkMaster[f].Listing.Pic +
                                                '" width="70" /><br />' +
                                                scope.checkMaster[f].Listing.Price +
                                                '</a><br /><br />';
                                            }
                                        }
                        scope.pageContent += '</accordion-group>';
                    }

                }
                scope.pageContent += '</accordion></div>' +
                            '<div class="col-sm-3" style="border:1px solid #808080; border-radius:4px; text-align:center">'+
                                '<br /><br />'+
                                'Recently Viewed<hr /><br />'+
                                '<div id="divRecent" style="text-align:center; padding-left:10px; font-size:small;">'+
                                'You haven\'t viewed other items yet. This list will populate as you browse further. Thank you!' +
                                '<br /><br />' +
                                '<jp-recently-viewed-scope item="{{recentlyViewed}}" on-edit="viewProductFromRecentlyViewed(ev,location)"></jp-recently-viewed-scope>' +
                            '' +
                        '</div></div>';
                $compile($('#divContent').html(scope.pageContent))(scope);

            };
            
        }
    }
});
////Begin WORKING $http get getJSON in DIRECTIVE
//$http.get('../JSON/BioSafetyCabinets.json').success(function (data) {
//    scope.BioSafetyCabinets = data;
//});
//var jsonParse = JSON.parse(JSON.stringify(scope.BioSafetyCabinets, null, 4));
//console.log("scope.productJSON: " + jsonParse[0].Listing.Title);
////End WORKING $http get getJSON in DIRECTIVE
//
//
//scope.pageContent += '' +
//    '<div class="container col-lg-4 col-sm-4" >' +
//        '<fieldset>' +
//            '<legend>' + nameArray[i] +
//            '</legend>' +
//            '<div class="panel panel-default">' +
//                '<div class="panel-heading">' +
//                nameArray[i] + ' ( ' + countProducts + ' ) ' +
//                '</div>' +
//                '<div class="panel-body">';
//                for (f = 0; f < (scope.checkMaster.length - 1) ; f++)
//                {
//                    if (nameArray[i] == scope.checkMaster[f].Category){
//                        scope.pageContent += '' +
//                        '<a href="#">' +
//                        scope.checkMaster[f].Listing.Title +
//                        '</a><br /><br />';
//                    }
//                }
//                scope.pageContent +=
//                '</div>' +
//            '<div class="panel-footer"></div>' +
//            '</div>' +
//        '</fieldset>' +
//    '</div>' +
//'';
//
//
//var obj = $.parseJSON(JSON.parse(JSON.stringify(attrs.landingpage)));
//console.log("attrs.landingpage: " + attrs.landingpage);//do not edit/delete
//scope.productJSON = obj;
//var count = 0;
//scope.pageContent = "";
//angular.forEach(scope.productJSON, function () {
//    var countProducts = 0;
//    scope.pageContent += '' +
//        '<div class="container col-lg-4 col-sm-4" >' +
//            '<fieldset>' +
//                '<legend>' + scope.productJSON[count].title +
//                '</legend>' +
//                '<div class="panel panel-default">' +
//                    '<div class="panel-heading">' +
//                    scope.productJSON[count].product[0] + ' ( ' + scope.productJSON[count].product.length + ' ) ' +
//                    '</div>' +
//                    '<div class="panel-body">';
//                    angular.forEach(scope.productJSON[count].product, function () {
//                        scope.pageContent += scope.productJSON[count].product[countProducts] + '<br />';
//                        countProducts++;
//                    });
//                    scope.pageContent +=
//                    '</div>' +
//                '<div class="panel-footer"></div>' +
//                '</div>' +
//            '</fieldset>' +
//        '</div>' +
//    '';
//    count++;
//});
//console.log("count: " + count);
//($('#divContent').html(scope.pageContent));
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
