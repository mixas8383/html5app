
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



var app = angular.module('game', []).directive('resize', ['$window', function ($window) {
        return {
            link: function (scope, el, attrs) {
                var initialWidth = $window.innerWidth
$window.in
                console.log(initialWidth)


                angular.element($window).on('resize', function () {
                    el.css('width', $window.innerWidth);
                    el.css('height', $window.innerHeight*0.92);

                    
                });
            }
        };
    }]);
app.controller('gameCtrl', ['$scope', '$interval','$window', function ($scope, $interval,$window) {

 

        for (i = 0; i < coords.length; i++)
        {
            coords[i].color = getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255);
        }
        
       // $('.mysvg').css('width', $window.innerWidth)
angular.element('.mysvg').attr('width', $window.innerWidth+'px');
angular.element('.mysvg').attr('height', ($window.innerHeight*0.92)+'px');
        gameClass = new Gm;

        $scope.tempFigureIndex = 0;
        $scope.relations = [];
        $scope.items = coords;
        $scope.currentIndex = 0;
        $scope.nextIndex = 1;
        $scope.gameMessage = ''
        gameClass.setRelation(relation);


        randomed = gameClass.getRandomize();
        for (i = 0; i < randomed.length; i++)
        {

            coords[i].gameIndex = randomed[i];
            texts[gameClass.findNumberIndex(coords[i].idx)].gameIndex = randomed[i];

            texts[i].text = randomed[i];

        }

        $scope.texts = texts;

        $scope.someClick = function (itemIdx, textIdx)
        {

            item = $scope.items[itemIdx];
            text = $scope.texts[textIdx];
            if (!gameClass.isStarted())
            {
                $scope.fight();
            }



            clikedIndex = item.gameIndex;

            console.log(clikedIndex)
            if (!gameClass.chekItem(clikedIndex))
            {
                $scope.gameMessage = 'wrong item'
                return;
            }


            console.lo

            $scope.currentIndex = gameClass.getCurrenNumber()
            $scope.nextIndex = gameClass.getNextNumber()







        }




        $scope.sectorClick = function (item)
        {
            $scope.gameMessage = '';
            selfIdx = gameClass.findNumberIndex(item.idx);
            $scope.someClick(item.idx, selfIdx)

        }



        $scope.numberClick = function (a, b, c, d)
        {
            $scope.gameMessage = '';
            sectorIdx = gameClass.findSectorIndex(a.idx);
            $scope.someClick(sectorIdx, a.idx)

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






