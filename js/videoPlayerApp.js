var videoPlayerApp = angular.module('videoPlayerApp', []);

//Controller
videoPlayerApp.controller('VideoController', ['$scope', '$window', function($scope, $window) {
    
    //scope var for the main video element.
    $scope.videoDisplay = document.getElementById("videoOutput");
    $scope.videoSource = $window.videoSource;
    $scope.titleDisplay = $window.titleDisplay;
    $scope.videoDescription = $window.videoDescription;
    
    //scope var for the ng-hide functions.
    //i.e. when the video plays hide some elements and vice versa.
    $scope.videoPlaying = false;
    
    //scope var for the time duration of the video.
    $scope.currentTime;
    $scope.totalTime;
    
    //toggle Play function.
    $scope.togglePlay = function() { 
        if($scope.videoDisplay.paused){
            $scope.videoDisplay.play();
            $scope.videoPlaying = true;
            $('#playBtn').children("span").toggleClass("glyphicon-play", false);
            $('#playBtn').children("span").toggleClass("glyphicon-pause", true);
        }else{
            $scope.videoDisplay.pause();
            $scope.videoPlaying = false;
            $('#playBtn').children("span").toggleClass("glyphicon-play", true);
            $('#playBtn').children("span").toggleClass("glyphicon-pause", false);
        }
    };
    
    //toggle Mute function.
    $scope.toggleMute = function() {
        if($scope.videoDisplay.volume == 0.0){
            $scope.videoDisplay.volume = 1.0;
            $('#muteBtn').children("span").toggleClass("glyphicon-volume-up", true);
            $('#muteBtn').children("span").toggleClass("glyphicon-volume-off", false);
        }else{
            $scope.videoDisplay.volume = 0.0;
            $('#muteBtn').children("span").toggleClass("glyphicon-volume-up", false);
            $('#muteBtn').children("span").toggleClass("glyphicon-volume-off", true);
        }
    };
    
    //initialize the Player.
    $scope.initPlayer = function() {
        $scope.currentTime = 0;
        $scope.totalTime = 0;
        //add some Event Listeners.
        $scope.videoDisplay.addEventListener("timeupdate", $scope.updateTime, true);//this event is fired when the time indicated by the currentTime attribute has been updated.
        $scope.videoDisplay.addEventListener("loadedmetadata", $scope.updateData, true);//this event is fired when the video is loaded.
    };
    
    //function to set the totalTime duration of the video.
    $scope.updateData = function(e) {
        $scope.totalTime = e.target.duration;
    };
    
    //function to update Time of the video.
    $scope.updateTime = function(e) {
        $scope.currentTime = e.target.currentTime;
        $scope.updateLayout();
    };

    //function to make sure that updated Time changes get reflected on the main video Player 
    $scope.updateLayout = function() {
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    };
    
    $scope.initPlayer();
    
}]);

//Filter to display a more friendly time display
videoPlayerApp.filter('time', function() {
    
    return function(seconds) {
        
        var hh = Math.floor(seconds / 3600), mm = Math.floor(seconds / 60) % 60, ss = Math.floor(seconds) % 60;
        return hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
        
    };
    
});

