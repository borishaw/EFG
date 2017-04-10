(function () {
    var app = angular.module('efg', ['ngMask', 'ui.bootstrap', 'angular-img-cropper', 'ngFileUpload']);

    app.controller("FooterController", ['$scope', '$rootScope', '$http', 'Upload', '$timeout', function ($scope, $rootScope, $http, Upload, $timeout) {
        
        //Upload social media icons
        $scope.uploadFacebookIcon = function (file, errFiles) {
            $scope.fbFile = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file){
                file.upload = Upload.upload({
                    url: 'upload.php',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });

            }
        };

        $scope.uploadLinkedInIcon = function (file, errFiles) {
            $scope.liFile = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file){
                file.upload = Upload.upload({
                    url: 'upload.php',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });

            }
        };

        $scope.uploadBloggerIcon = function (file, errFiles) {
            $scope.blFile = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file){
                file.upload = Upload.upload({
                    url: 'upload.php',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });

            }
        };

        $scope.uploadInstagramIcon = function (file, errFiles) {
            $scope.igFile = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file){
                file.upload = Upload.upload({
                    url: 'upload.php',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });

            }
        };

        $scope.uploadTwitterIcon = function (file, errFiles) {
            $scope.twFile = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file){
                file.upload = Upload.upload({
                    url: 'upload.php',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });

            }
        };


        //Multiple employee forms
        $scope.num = 1;
        $scope.numArray = [1];

        this.allowAddNew = true;
        this.allowRemove = false;

        this.addNum = function () {
            $scope.num += 1;
            $scope.numArray.push($scope.num);

            //disable Add New button if there are 10 or more forms
            if ($scope.numArray.length >= 10) {
                this.allowAddNew = false;
            }

            if ($scope.numArray.length >= 1) {
                this.allowRemove = true;
            }
        };

        this.remove = function (removeItem) {
            $scope.numArray = jQuery.grep($scope.numArray, function (value) {
                return value != removeItem;
            });
            this.allowAddNew = true;


            //disable X button when only one form left
            if ($scope.numArray.length <= 1) {
                this.allowRemove = false;
            }
        };

        //Copy footer code to hidden input for download
        $scope.copyFooters = function(){
            var footerArray = [];

            for (var num in $scope.numArray){
                var index = parseInt(num) + 1;
                var footerCode = $.trim($('#footer' + index).html());
                footerArray.push(footerCode);
            }

            var footerArrayToJson = angular.toJson(footerArray);
            $http.post('results.php', footerArrayToJson).then(function(response){
                $rootScope.zipFile = response.data;
            });
        };

        //Crop images to fit
        $scope.cropper = {};
        $scope.cropper.sourceImage = null;
        $scope.cropper.croppedImage = null;
        $scope.bounds = {};
        $scope.bounds.left = 0;
        $scope.bounds.right = 0;
        $scope.bounds.top = 0;
        $scope.bounds.bottom = 0;

        $scope.$watch('bounds', function(newVal, oldVal){
            $scope.bounds.width = ($scope.bounds.right - $scope.bounds.left) * 0.2 + 'px';
            $scope.bounds.height = ($scope.bounds.top - $scope.bounds.bottom) * 0.2 + 'px';
            $scope.myStyle = {'height': $scope.bounds.height, 'width': $scope.bounds.width};
        }, true);

        $scope.$watch('companyUrl', function(newValue, oldValue){

            if ($scope.companyUrl){
                var sliced_http = $scope.companyUrl.slice(0, 7);
                var sliced_https = $scope.companyUrl.slice(0, 8);

                if (sliced_http == 'http://'){
                    $scope.urlSliced = $scope.companyUrl.slice(7);
                }
                else if (sliced_https == 'https://'){
                    $scope.urlSliced = $scope.companyUrl.slice(8);
                }
            }
            else {
                if ($scope.urlSliced){
                    delete $scope.urlSliced;
                }
            }
        });

    }]);

    app.directive('httpPrefix', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, controller) {
                function ensureHttpPrefix(value) {
                    // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
                    if(value && !/^(https?):\/\//i.test(value)
                        && 'http://'.indexOf(value) !== 0 && 'https://'.indexOf(value) !== 0 ) {
                        controller.$setViewValue('http://' + value);
                        controller.$render();
                        return 'http://' + value;
                    }
                    else
                        return value;
                }
                controller.$formatters.push(ensureHttpPrefix);
                controller.$parsers.splice(0, 0, ensureHttpPrefix);
            }
        };
    });

})();