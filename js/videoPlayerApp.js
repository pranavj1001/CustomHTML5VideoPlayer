var videoPlayerApp = angular.module('videoPlayerApp', []);

//Controller
videoPlayerApp.controller('VideoController', ['$scope', '$window', '$interval', function($scope, $window, $interval) {
    
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
    
    //scope var for the scrub bar also known as progress bar
    $scope.scrubTop = -1000;
    $scope.scrubLeft = -1000;
    $scope.vidHeightCenter = -1000;
    $scope.vidWidthCenter = -1000;
    
    //interval function will run this code after every 100 milliseconds
    $interval(function(){
        var time = $scope.videoDisplay.currentTime;
        var duration = $scope.videoDisplay.duration;
        var w = time / duration * 100;
        var p = document.getElementById('progressMeterFull').offsetLeft + document.getElementById('progressMeterFull').offsetWidth;
        $scope.scrubLeft = (time / duration * p) - 7;
        $scope.updateLayout();
        $scope.updateLayout();
    },100);
    
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
        if(!$scope.videoDisplay.seeking){
            $scope.currentTime = e.target.currentTime;
            if($scope.currentTime == $scope.totalTime){
                $scope.videoDisplay.pause();
                $scope.videoPlaying = false;
                $scope.currentTime = 0;
                $('#playBtn').children("span").toggleClass("glyphicon-play", true);
                $('#playBtn').children("span").toggleClass("glyphicon-pause", false);
            }
        }
    };

    //function to make sure that updated changes get reflected on the main video Player 
    $scope.updateLayout = function() {
        $scope.scrubTop = document.getElementById('progressMeterFull').offsetTop-2;
        $scope.vidHeightCenter =  $scope.videoDisplay.offsetHeight/2 - 50;
        $scope.vidWidthCenter = $scope.videoDisplay.offsetWidth/2 - 50;
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    };
    
    //function to jump into a particular point from the progress bar
    $scope.videoSeek = function($event) {
        var w = document.getElementById('progressMeterFull').offsetWidth;
        var d = $scope.videoDisplay.duration;
        var s = Math.round($event.pageX / w * d);
        $scope.videoDisplay.currentTime = s;
    }
    
    $scope.initPlayer();
    
}]);

//Filter to display a more friendly time display
videoPlayerApp.filter('time', function() {
    
    return function(seconds) {
        
        var hh = Math.floor(seconds / 3600), mm = Math.floor(seconds / 60) % 60, ss = Math.floor(seconds) % 60;
        return hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
        
    };
    
});

