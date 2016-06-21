
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//document.addEventListener("deviceready", onDeviceReady, false);





var app = angular.module('game', ['ngMaterial']).directive('resize', ['$window', function ($window) {
        return {
            link: function (scope, el, attrs) {
                var initialWidth = $window.innerWidth
                $window.in
                console.log(initialWidth)


                angular.element($window).on('resize', function () {
                    el.css('width', $window.innerWidth);
                    el.css('height', $window.innerHeight * 0.92);


                });
            }
        };
    }]);
app.controller('gameCtrl', ['$scope', '$interval', '$window', function ($scope, $interval, $window) {




        soundStart = window.localStorage['params.clickSound']


        if (soundStart == undefined)
        {
            soundStart = true;
        }else {
            if(soundStart == 'true')
            {
                soundStart = true;
            }else {
                soundStart = false;
            }

        }
 
        
        
console.log(soundStart)
        $scope.params = {
            clickSound: soundStart
        };


        $scope.$watch('params.clickSound', function (newValue, oldValue) {

            console.log(newValue)
            // Check if value has changes
            window.localStorage['params.clickSound'] = newValue;


            // Do anything you like here
        });


        $scope.game = false;
        $scope.prolog = true;

        $scope.startGame = function ()
        {

            console.log('-----');

            $scope.game = true;

            $scope.prolog = false;
            $('.mnCont').show();
            $('.mdl-layout__header').show();
            $('.mdl-layout__drawer').show();
            $('.mdl-layout__content').show();
            $scope.fight();
        }


        var sound = new Howl({
            urls: ['media/error.mp3'],
            onend: function () {
                console.log('Finished!');
            },
            onloaderror: function () {
                console.log('Error!');
            },
        });



        for (i = 0; i < coords.length; i++)
        {
            coords[i].color = getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255);
            coords[i].oldColor = coords[i].color;

        }

        // $('.mysvg').css('width', $window.innerWidth)
        angular.element('.mysvg').attr('width', $window.innerWidth + 'px');
        angular.element('.mysvg').attr('height', ($window.innerHeight * 0.92) + 'px');
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


            }
            clikedIndex = item.gameIndex;
            console.log(clikedIndex)
            if (!gameClass.chekItem(clikedIndex))
            {

                $scope.blinkColor(item, false)
                $scope.gameMessage = 'wrong item'
                return;
            }
            $scope.blinkColor(item, true)
            $scope.currentIndex = gameClass.getCurrenNumber()
            $scope.nextIndex = gameClass.getNextNumber()
        }


        $scope.blinkColor = function (item, color)
        {
            
            console.log($scope.params.clickSound)
            if ($scope.params.clickSound == true)
            {
                sound.play();
            }
 
            if (color)
            {
                green = '00, 255, 00';
            } else {
                green = '255 , 00, 00';
            }
            item.color = green;
            var t = false
            i = 0;

            ss = $interval(function () {

                if (t)
                {
                    item.color = item.oldColor;
                } else {
                    item.color = green;
                }

                t = !t;
                if (i > 3)
                {
                    $interval.cancel(ss);
                    item.color = item.oldColor;
                }
                i++;
            }, 50);
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
        $scope.timerCounterValue = 0;


        var stop;
        $scope.fight = function () {
            // Don't start a new fight if we are already fighting
            if (angular.isDefined(stop))
                return;

            stop = $interval(function () {
                $scope.timerCounter++;
                $scope.resizeTimer();
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


        $scope.resizeTimer = function ()
        {

            var sec_num = $scope.timerCounter; // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            $scope.timerCounterValue = hours + ':' + minutes + ':' + seconds;


        }





    }]);






