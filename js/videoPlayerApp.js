var videoPlayerApp = angular.module('videoPlayerApp', []);

//Controller
videoPlayerApp.controller('VideoController', ['$scope', '$window', function($scope, $window) {
    
    $scope.videoDisplay = document.getElementById("videoOutput");
    $scope.videoSource = $window.videoSource;
    $scope.titleDisplay = $window.titleDisplay;
    $scope.videoDescription = $window.videoDescription;
    
}]);
