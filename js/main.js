
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Gm = function () {
    this.relations = null;
    this.state = 0;// o game init 1- game starter 2-game wone 
    this.currentNumber = 0;
    this.currentNextNumber = 1;


    this.setRelation = function (array)
    {
        this.relations = array;
    }

    this.findNumberIndex = function (i)
    {
        return this.relations[i];
    }
    this.findSectorIndex = function (k)
    {

        for (i = 0; i < this.relations.length; i++)
        {
            if (k == this.relations[i])
            {
                return i;
            }
        }

    }

    this.start = function ()
    {
        this.state = 1;
    }
    this.incrementCounter = function ()
    {
        this.currentNumber++;
        this.currentNextNumber++;
    }




    this.getRandomize = function ()
    {
        var array = new Array();
        for (i = 0; i < 90; i++)
        {
            array[i] = i + 1;
        }


        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }




};



var app = angular.module('game', []);
app.controller('gameCtrl', ['$scope', '$interval', function ($scope, $interval) {



        for (i = 0; i < coords.length; i++)
        {
            coords[i].color = getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255);
        }

        gameClass = new Gm;

        $scope.tempFigureIndex = 0;
        $scope.relations = [];
        $scope.items = coords;
        $scope.currentIndex = 0;
        gameClass.setRelation(relation);


        randomed = gameClass.getRandomize();
        for (i = 0; i < randomed.length; i++)
        {

            coords[i].gameIndex = randomed[i];
            texts[gameClass.findNumberIndex(coords[i].idx)].gameIndex = randomed[i];
            console.log(texts[i].idx)
            texts[i].text = randomed[i];

        }

        $scope.texts = texts;





        $scope.sectorClick = function (item)
        {

            item.cords = '';
            $scope.tempFigureIndex = item.idx;

            selfIdx = gameClass.findNumberIndex(item.idx);
            $scope.texts[selfIdx].x = -1;
            $scope.texts[selfIdx].y = -1;
            $scope.currentIndex = item.gameIndex;

        }



        $scope.numberClick = function (a, b, c, d)
        {




            a.cords = '';

            sectorIdx = gameClass.findSectorIndex(a.idx);

            $scope.items[sectorIdx].cords = '';


            a.text = '';
            a.x = -100;
            a.y = -100;
            $scope.tempFigureIndex = -1;
            $scope.currentIndex = a.gameIndex;
            console.log($scope.relations);
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






