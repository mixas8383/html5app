var app = angular.module("game", []);



t = new Array;
t.length
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var app = angular.module('game', []);
app.controller('gameCtrl', function($scope) {
    
    
    
    for(i = 0;i<coords.length;i++)
    {
        coords[i].color = getRandomInt(0,255)+', '+getRandomInt(0,255)+', '+getRandomInt(0,255);
    }
 
    Math.random()
    $scope.items = coords;
   
});


