
app.controller('MainController', ['$scope', '$http', '$location', '$anchorScroll', '$document', '$rootScope', '$timeout', 
    'productService','detailsService', 'recentlyViewedService', 'masterJSONService','routeTrackingService',
    function ($scope, $http, $location, $anchorScroll, $document, $rootScope, $timeout, productService, detailsService,
        recentlyViewedService, masterJSONService, routeTrackingService)
{
    //'$scope.product = productService' attaches $scope.product to the 'productService' service 
    $scope.product = productService;
    $scope.details = detailsService;
    $scope.recentlyViewed = recentlyViewedService;

    //$scope.viewProduct is called when user clicks on title of product to view product details
    $scope.viewProductFromRecentlyViewed = function (ev, location) {
        
        var masterParse = JSON.parse(JSON.stringify($scope.masterJSON, null, 4));
        //console.log("master Parse: " + masterParse[0].Listing.Price);
        //get item JSON passed via the click event in the recentlyViewed column
        $scope.recentlySelectedProduct = ev.target.attributes.data.value;
        //parse the JSON object into a JS obect named 'productJSON'
        //var viewedJSON = JSON.parse($scope.testJSON);
        //console.log($scope.masterJSON.length);
        
        var foundIndex = 0;
        console.log("$scope.recentlySelectedProduct: " + $scope.recentlySelectedProduct);
        for (i = 0; i < $scope.masterJSON.length; i++) {
            if (masterParse[i].Listing.Title == $scope.recentlySelectedProduct) {
                foundIndex = i;
            }
        }
        var recentViewedProduct = JSON.parse(JSON.stringify($scope.masterJSON[foundIndex],null,4));
        //console.log("Final!: " + masterParse[foundIndex].Listing.Price);
        //console.log("Yep: " + recentViewedProduct.Listing.Title);
        $scope.viewProduct("",recentViewedProduct);
    }
    $scope.viewProduct = function (ev, question) {
        $scope.checkQuestion = question;
        //console.log("Hello");
        //console.log($scope.checkQuestion);
        //get item JSON passed via the click event
        $scope.myJSON = [];
        var productJSON = [];
        if (ev.target == undefined) {
            //console.log("Undefinedooed!");
            $scope.myJSON = $scope.checkQuestion;
            //console.log($scope.myJSON.Listing.Title);
            productJSON = JSON.parse(JSON.stringify($scope.checkQuestion, null, 4));
        }
        else {
            $scope.myJSON = ev.target.attributes.data.value;
            productJSON = JSON.parse($scope.myJSON);
        }
        //parse the JSON object into a JS obect named 'productJSON'
        
        
        //begin product listing
        

        //$scope.product.* is bound to productService service
        $scope.product.title = productJSON.Listing.Title;
        $scope.product.img = productJSON.Listing.Pic;
        $scope.product.price = productJSON.Listing.Price;
        //end product listing
        
        //begin recently viewed
        //get current product object and convert to JSON
        var recentlyViewedJSON = JSON.stringify($scope.product, null, 4);
        //add current product JSON to scope
        //$scope.Recent = recentlyViewedService;
        var recentViewJSON = JSON.parse(recentlyViewedJSON);
        //console.log("Check JSON: " + JSON.stringify($scope.Recent, null, 4));
        //find first empty array index and add current product
        for (i = 1; i < 10; i++) {
            if (recentlyViewedService[0] == undefined) {

                //add recently viewed product to scope 
                $scope.recentlyViewed[0] = recentlyViewedJSON;
                break
            }
            else {
                //console.log("got Here Start: " + recentlyViewedJSON);//works - do not edit
                //console.log("got Here Start Too: " + $scope.recentlyViewed[0]);//works - do not edit
                //if ($scope.recentlyViewed[9] != undefined) {
                //    delete $scope.recentlyViewed[9];
                //    console.log("$scope.recentlyViewed[1]; :"+ $scope.recentlyViewed[1]);
                //}
                if ($scope.recentlyViewed[i] == undefined) {
                    //Check if product already exists in recently viewed array
                    var checkRecentNew = JSON.parse(recentlyViewedJSON);
                    var alreadyExists = false;
                    if (ev.target == undefined) {

                    }
                    for (p = 0; p < 10; p++) {
                        //compare product titles in recentlyViewedService to currently selected product
                        if ($scope.recentlyViewed[p]) {
                            var checkRecent = JSON.parse($scope.recentlyViewed[p]);
                            if (checkRecent.title == checkRecentNew.title) {
                                alreadyExists = true;
                            }
                        }
                    }
                    if (alreadyExists == false) {
                        //add unique recently viewed product to scope 
                        $scope.recentlyViewed[i] = recentlyViewedJSON;
                        console.log("$scope.recentlyViewed.length: " + $scope.recentlyViewed.length)
                    }
                }
                else {
                    //break;
                }
            }
        }
        if (ev.target == undefined) {
            //console.log("from recent: " + JSON.stringify($scope.recentlyViewed,null,4));
        }
        //console.log("got Here Start: " + JSON.stringify($scope.recentlyViewed, null, 4));//works - do not edit
        //end recently viewed
        
        //begin product details
        $scope.Details = productJSON.Details;
        //console.log("Details: " + $scope.Details);
        //clear items out of detailsService service so each product viewed has a clean array of details
        for (i = 0; i < 50; i++) {
            if (detailsService[i] != undefined) {

                detailsService[i] = null;
            }
        }
        //add details from JSON object to detailsService service
        for (i = 0; i < $scope.Details.length; i++) {
        
            $scope.details[i] = $scope.Details[i];
        }
        //end product details
        //set /Product page redirect
        //console.log("Before Page Call: " + $scope.product.title);
        //console.log("Before Page Call Service: " + productService.title);
        if (ev.target == undefined) {
            $scope.productPage = "/ProductRecent";
        }
        else {
            $scope.productPage = "/Product";
        }
        $location.url($scope.productPage);
        
    }

    //Dynamic varibles which control page titles and headings
    $scope.title = "Cleanroom Products";
    $scope.Consumables = "Featured Consumables";
    
    //myView is the navigation menu button click event with changeView parameters like Modular, consumables, etc...
    $scope.myView = function (changeView) {
        $location.url(changeView);
        
        $scope.title = "Cleanroom " + changeView;
        
    };

    //date/year added to copyright footer
    $scope.date = new Date();
    //

    //Begin Back to top click event
    $scope.topClick = function () {
        var duration = 1000; //milliseconds
        var offset = 30;
        var someElement = angular.element(document.getElementById('top'));
        if ($(someElement).length > 0) {
            $document.scrollToElement(someElement, offset, duration);
        }
    }
    //End Back to top click event

    //Begin Add hastag to url which trigeers scroll event
    $scope.$on('$viewContentLoaded', function () {
        //$("input[name^='item']").val("1");        
        $location.hash('2');
        
    });
    //End Add hastag to url which trigeers scroll to event

    //Begin using angular-scroll plugin//
    $anchorScroll.yOffset = 75;
    //var top = 400;
    var duration = 1000; //milliseconds

    var offset = 30; //pixels; adjust for floating menu, context etc
    //Scroll to #some-id with 30 px "padding"
    //Note: Use this in a directive, not with document.getElementById 
    var someElement = angular.element(document.getElementById('2'));
    if ($(someElement).length > 0) {
        $document.scrollToElement(someElement, offset, duration);
    }
    //End using angular-scroll plugin//

    // Begin verbose getJSON data files, refactor when possible
    $scope.masterJSON = [];
    $http.get('../JSON/Booties.json').success(function (data) {
        $scope.booties = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/BouffantBeard.json').success(function (data) {
        $scope.Bouffant = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/ddConsumables.json').success(function (data) {
        //this is where the Consumables DD Selector gets it's choices
        $scope.myOptions = data;
    });
    $http.get('../JSON/furniture.json').success(function (data) {
        $scope.furniture = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/FacemasksHoods.json').success(function (data) {
        $scope.Facemasks = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/Coats.json').success(function (data) {
        $scope.Coats = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/Coveralls.json').success(function (data) {
        $scope.Coveralls = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/StickyMats.json').success(function (data) {
        $scope.StickyMats = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/FingerCots.json').success(function (data) {
        $scope.FingerCots = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/GlovesVinyl.json').success(function (data) {
        $scope.GlovesVinyl = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/GlovesLatex.json').success(function (data) {
        $scope.GlovesLatex = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/GlovesNitrile.json').success(function (data) {
        $scope.GlovesNitrile = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/hepa.json').success(function (data) {
        $scope.hepa = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/BioSafetyCabinets.json').success(function (data) {
        $scope.BioSafetyCabinets = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/Softwall.json').success(function (data) {
        $scope.Softwall = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
    });
    $http.get('../JSON/Modular.json').success(function (data) {
        $scope.Modular = data;
        $scope.masterJSON = $scope.masterJSON.concat(data);
        console.log("masterJSON: " + $scope.masterJSON.length);
    });
    masterJSONService = $scope.masterJSON;
    //End verbose getJSON data files, refactor when possible
    
}]);

app.run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function (event, newUrl, oldUrl) {
        //console.log("$location.absUrl(): " + $location.absUrl());
        if (event != undefined) {
            //console.log("Event: " + event[0]);
        }
    });
});   

app.controller('AboutUsController', function ($scope) {

});
app.controller('TimeoutController', function ($scope, $interval) {
    var intervalPromise;
    $scope.btnClick = function () {
        intervalPromise = $interval(function () {
            //alert('Modular');
            }
        )
    }
});
