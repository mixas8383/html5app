
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var app = angular.module('game', []);
app.controller('gameCtrl', ['$scope', '$interval', function ($scope, $interval) {



        for (i = 0; i < coords.length; i++)
        {
            coords[i].color = getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255);
        }

        Math.random()
        $scope.items = coords;
        $scope.texts = texts;
        $scope.sectorClick = function (a, b, c, d)
        {
            a.cords = '';

 
        }


       
        $scope.timerCounter = 0;
      

        var stop;
        $scope.fight = function () {
            // Don't start a new fight if we are already fighting
            if (angular.isDefined(stop))
                return;

            stop = $interval(function () {
               $scope.timerCounter++;
            }, 1000);
        };

        $scope.stopFight = function () {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        };

        $scope.resetFight = function () {
            $scope.timerCounter = 0;
           
        };

        $scope.$on('$destroy', function () {
            // Make sure that the interval is destroyed too
            $scope.stopFight();
        });

    }]);


