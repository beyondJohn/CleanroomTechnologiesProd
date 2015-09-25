angular.module('jpDirectives', ['ngSanitize']);
angular.module('jpDirectives').directive('jpProductViewScope', function ($compile) {
    return {
        scope:{product:'='},// without this the product does not refresh when a recently viewed product it is clicked
        restrict: 'E',
        replace: true,
        link: function (scope, el, attrs) {
            var productJSON = JSON.parse(attrs.item);
            console.log("jpProductViewScopeAttrs: " + attrs.item);
            scope.buildProduct = "";
            scope.product = productJSON;
            //console.log("scope.product: " + productJSON.title);
            //attrs.$observe('product', function () {
            //    console.log('Scope changed ATTRS! ' + productJSON.title);

            //});
            
            scope.buildProduct += "<br /><span style=\"font-family:Arial Calibri; font-size:x-large;\">" + productJSON.title + "</span>"
            +"<br /><br />"
            +"<img src=\"" + productJSON.img + "\" style=\"max-height:270px;\"  />"
            + "<br /><br />"
            + "<span style=\"font-family: Arial Calibri; font-size:large; padding-top:10px; color:#163587;\">" + productJSON.price + "</span><br /><br />";
            
            $compile($('#divProduct').html(scope.buildProduct))(scope);
            
        }
    };
}).directive('jpRecentlyViewedScope', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            onEdit: '&',
            recentlyViewed: '='
        }
        ,
        link: function (scope, el, attrs) {
            scope.CheckIfRequestedByRecentlyViewed = attrs.item;
            //console.log("CheckIfRequestedByRecentlyViewed" + scope.CheckIfRequestedByRecentlyViewed);
            scope.addToCart = function (ev, index) {
                scope.recentlySelectedProduct = ev.target.attributes.data.value;
                alert("Added to your cart:\n\n" + scope.recentlySelectedProduct + "\n\n Thank you!");
            }
            var productJSON = JSON.parse(attrs.item);
            scope.buildRecentList = "";
            scope.Products = productJSON;
            //console.log("Event after attrs observed");
            var recentArray = [];
            //build array putting most recent viewed in a descending list
            for (i = 0; scope.Products[i] != undefined; i++) {
                recentArray.unshift(scope.Products[i]);
                //console.log("scope.Products[i]" + scope.Products[i]);
            }
            console.log("jpRecentlyViewedScopeRecentArray.unshift: " + recentArray);
            for (i = 0; i < 50; i++) {
                //recently viewed PAGE grabs the current product being viewed and adds it to the recently viewed CONTAINER
                if (scope.CheckIfRequestedByRecentlyViewed != undefined) {
                    //grab all items until receiving undefined notification
                    if (scope.Products[i] != undefined) {
                        var Recent = JSON.parse(recentArray[i]);
                        //console.log("Recent.title: " + Recent.title);
                        scope.buildRecentList += "<div style=\"cursor:pointer; position:relative;\">"
                            + "<div ng-click=\"onEdit({ev: $event, myName: question})\" data=\"" + Recent.title.replace("\"", "&quot;") + "\" >"
                            + Recent.title + "</div>"
                            + "<div style=\"margin-left:auto; margin-right:auto;\">"
                            + "<img src=\"" + Recent.img + "\" style=\"max-height:100px;\" alt=\"productImage\"><br />"
                            + "<span style=\"color:red;\">" + Recent.price + "</span><br />"
                            //+ "<span>Quantity: <input id=\"input"+ i +"\" type=\"number\" min=\"0\" max=\"50\" style=\"width:50px;\"></span>" +
                            + "<span><input type=\"button\" id=\"btn1\" value=\"Add to Cart\" ng-click=\"addToCart($event)\" data=\"" + Recent.title + "\"   /></span>"
                            + "</div>"
                            + "</div><hr /><br />";
                    }
                    else {
                        break;
                    }
                }
                //This request comes from the product page and does not add the product being viewed into the recently viewed items until after another item is viewed
                else {
                    //don't grab the last item in the array, which is the item currently viewed in product page
                    if (scope.Products[i + 1] != undefined) {
                        var Recent = JSON.parse(recentArray[i + 1]);
                        //console.log("Recent.title: " + Recent.title);
                        scope.buildRecentList += "<div style=\"cursor:pointer; position:relative;\">"
                            + "<div ng-click=\"onEdit({ev: $event, myName: question})\" data=\"" + Recent.title + "\" >"
                            + Recent.title + "</div>"
                            + "<div style=\"margin-left:auto; margin-right:auto;\">"
                            + "<img src=\"" + Recent.img + "\" style=\"max-height:100px;\" alt=\"productImage\"><br />"
                            + "<span style=\"color:red;\">" + Recent.price + "</span><br />"
                            //+ "<span>Quantity: <input id=\"input"+ i +"\" type=\"number\" min=\"0\" max=\"50\" style=\"width:50px;\"></span>" +
                            + "<span><input type=\"button\" id=\"btn1\" value=\"Add to Cart\" ng-click=\"addToCart($event)\" data=\"" + Recent.title + "\"   /></span>"
                            + "</div>"
                            + "</div><hr /><br />";
                        //scope.buildRecentList += "<div id=\"myTarget\" style=\"position:relative; width:100%;\"  ng-click=\"onEdit({ev: $event, myName: location})\" data=\""+productJSON +"\"><div style=\"position:relative; text-align:center; margin-left:auto; margin-right:auto; \"><span style=\"text-decoration:underline;\">" + Recent.title + "</span><br />"
                        //    + "<img src=\"" + Recent.img + "\" style=\"max-height:100px;   /><br /><span style=\"color:red;\">"
                        //    + Recent.price + "</span><input type=\"button\" id=\"btn1\" value=\"Add to Cart\"  /></span></div><div><br /><br />";
                    }
                    else {
                        break;
                    }
                }
            }
            if(scope.Products[1] != undefined)
                $compile($('#divRecent').html(scope.buildRecentList))(scope);
        }
    };
}).directive('jpDetailsScope', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        link: function (scope, el, attrs) {
            var productJSON = JSON.parse(attrs.item);
            scope.buildDetails = "";
            scope.Details = productJSON;
            //console.log("Before Loop: "+attrs.item.length);
            for (i = 0; i < 50; i++) {

                if (scope.Details[i] != undefined) {

                    if (scope.Details[i].length < 300) {
                        //console.log(scope.Details[i].length);
                        scope.buildDetails += "<img src=\"../Images/rsz_checkmark.jpg\" width=\"15\" height=\"15\" />&nbsp;&nbsp;" + scope.Details[i].trim() + "<br />";
                    }
                    else {
                        //**Todo**place larger bullet items beneth the product listing.
                    }
                }
                else {
                    break;
                }
            }

            //console.log("After Loop: " + scope.Details[10]);
            $('#divDetails').html(scope.buildDetails);
            //$compile($('#divDetails').html('<jp-details-scope items="' + attrs.item + '" ></jp-details-scope>'))(scope);
            console.log("jpDetailsScope:" + attrs.item);
            scope.internalControl = "Hey There Control Internal";
        }
    };
}).directive('jpSelectConsumables1', ['$compile', function ($compile) {
    return {
        replace: true,
        restrict: 'AE',
        scope: false,
        template: function (element, attrs) {
            if (!angular.isDefined(attrs.defaultLabel))
                attrs.defaultLabel = "";

            //the following adds drop down list to page
            return '<div class="jp-select-consumables1 selector">' +
                        '<span>{{ ngModel.name || "' + attrs.defaultLabel + '"}}</span>' +
                        '<select name="' + attrs.name + '" ng-model="' + attrs.ngModel + '" ng-options="' + attrs.optexp + '"' + ((attrs.required) ? ' required' : '') + '><option value="">Select</option></select>' +
                   '</div>'
            ;
        },
        link: function (scope, el, attrs) {
            //console.log("attrs.defaultLabel: " + attrs.defaultLabel + " - attrs.name: " + attrs.name + " - attrs.ngModel: " + attrs.ngModel + " - attrs.optexp: " + attrs.optexp + " - attrs.required: " + attrs.required)
            scope.addToCart = function () {
                console.log('added To Cart');
            }
            scope.$watch(attrs.ngModel, function ($scope) {
                
                var model = scope.$eval(attrs.ngModel);

                //when value changes, update the selectConsumables text
                if (angular.isDefined(model) && angular.isDefined(model.name)) {

                    //This array matches drop down selection to $scope variable of JSON object
                    var nameArray = ['booties', 'Bouffant', 'Facemasks', 'Coats', 'Coveralls', 'StickyMats', 'FingerCots', 'GlovesVinyl', 'GlovesLatex', 'GlovesNitrile'];

                    $('#1').html('<h3 id="1" ng-bind="Consumables">' + model.name + '</h3>');
                    //$compile($('#contDiv').html('<questions items="' + nameArray[model.value] + '" on-edit="viewProduct(question)"></questions>'))(scope);
                    $compile($('#contDiv').html('<jp-product-scope1      on-edit="viewProduct(ev,question)" ></jp-product-scope1>'))(scope);
                    console.log("changed");
                }
            });
        }
    }
}]).directive('jpProductScope1', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            items: '=',
            onEdit: '&'
        },
        controller: function ($scope) {
            console.log("items: " + $scope.items)
        },
        template: '<p>' +
          '<span id="item{{index}}" ng:repeat="(index, item) in items" '
        + 'class="col-sm-3" style="margin-left:auto; margin-right:auto; width:33%; text-align:center;'
        + 'border:solid #dddddd 1px; border-radius:15px; padding-top:15px; min-width:225px; display:inline-block; vertical-align:text-top">' +
        '<span ng-bind-html="item.Listing.Title" ng-click="onEdit({ev: $event, myName: question})" data="{{item}}" style="cursor:pointer;"></span><br />' +
        '<img src="{{item.Listing.Pic}}" width="150" height="200" style="padding-top:10px;" /> <br />' +
        '<span style="color:red;">{{item.Listing.Price}}</span>' +
        '<br />Quantity: <input id="input{{index}}" type="number" min="0" max="50" style="width:50px;" />&nbsp;' +
        '<input type="button" id="btn{{index}}" value="Add to Cart" ng-click="addToCart($event)" data="{{index}}" /></span>' +//ng-click="addToCart($event)" data="{{index}}" 'data tag' passes variable value to 'addToCart' function $event
        '<br ng:show="(index+1)%4==0" />' +
        '</p>',
        link: function (scope, el, attrs) {
            $compile(el.contents())(scope.$new());
            scope.addToCart = function (index) {
                var myEvent = index.target.attributes.data.value;//this connects the 'addToCart()' function// found code at http://stackoverflow.com/questions/18029261/getting-attribute-of-element-in-ng-click-function-in-angularjs
                //the following array is needed because the angular engine adds a (bogus/commented out) child node in between every needed child node, thus the need for odd only children
                var oddArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101];
                var myEl = el[0].childNodes[oddArray[myEvent]].childNodes[8].value;
                //console.log(el[0].childNodes[oddArray[myEvent]].childNodes[0].childNodes[0]);
                //console.log(myEl);
                
                //$('#1').html('<h3 id="1" ng-bind="Consumables">Are You Kidding!</h3>');
            }
        }
    };
});
