
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//document.addEventListener("deviceready", onDeviceReady, false);





var app = angular.module('game', ['ngMaterial']).directive('resize', ['$window', function ($window) {
        return {
            link: function (scope, el, attrs) {
                var initialWidth = $window.innerWidth
                $window.in



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
        } else {
            if (soundStart == 'true')
            {
                soundStart = true;
            } else {
                soundStart = false;
            }

        }




        $scope.params = {
            clickSound: soundStart
        };

        $scope.params.showWrong = false;
        $scope.params.showOk = false;
        $scope.params.showFirst = false;
        $scope.showOk = false;
        $scope.showResults = false;

        $scope.$watch('params.clickSound', function (newValue, oldValue) {


            // Check if value has changes
            window.localStorage['params.clickSound'] = newValue;


            // Do anything you like here
        });


        $scope.game = false;
        $scope.prolog = true;
        var sound = '';
        var gameClass = ''


        $scope.newGame = function (t)
        {
            $scope.hideAll();
            $scope.resetFight();
            $scope.timerCounterValue = '00:00:00';
            $scope.currentIndex = '';
            $scope.nextIndex = 1;
            $scope.gameMessage = '';
            $scope.params.showWrong = false;
            $scope.params.showOk = false;
            $scope.params.showFirst = false;
            $scope.showOk = false;
            if (t)
            {
                $('.mdl-layout__obfuscator').click();
            }
            $scope.startGame();
        }


        $scope.startGame = function ()
        {


            $scope.game = true;
            $scope.showResults = $scope.getResults();


            console.log($scope.showResults)
            $scope.prolog = false;
            $('.mnCont').show();
            $('.mdl-layout__header').show();
            $('.mdl-layout__drawer').show();
            $('.mdl-layout__content').show();
            $('.gameCanvas').show();
            $scope.fight();
            sound = new Howl({
                urls: ['media/error.mp3'],
                onend: function () {
                    // console.log('Finished!');
                },
                onloaderror: function () {
                    // console.log('Error!');
                },
            })

            for (i = 0; i < coords.length; i++)
            {
                coords[i].color = getRandomInt(0, 255) + ', ' + getRandomInt(0, 255) + ', ' + getRandomInt(0, 255);
                coords[i].oldColor = coords[i].color;

            }
            angular.element('.mysvg').attr('width', $window.innerWidth + 'px');
            angular.element('.mysvg').attr('height', ($window.innerHeight - 31) + 'px');

            $scope.relations = [];
            $scope.items = coords;

            gameClass = new Gm;

            gameClass.setRelation(relation);


            randomed = gameClass.getRandomize();
            for (i = 0; i < randomed.length; i++)
            {

                coords[i].gameIndex = randomed[i];
                texts[gameClass.findNumberIndex(coords[i].idx)].gameIndex = randomed[i];

                texts[i].text = randomed[i];

            }

            $scope.texts = texts;

        }






        $scope.tempFigureIndex = 0;
        $scope.currentIndex = '';
        $scope.nextIndex = 1;
        $scope.gameMessage = ''


        $scope.someClick = function (itemIdx, textIdx)
        {

            item = $scope.items[itemIdx];
            text = $scope.texts[textIdx];
            if (!gameClass.isStarted())
            {


            }



            clikedIndex = item.gameIndex;
            //console.log(clikedIndex)
            if (!gameClass.chekItem(clikedIndex))
            {

                $scope.blinkColor(item, false)
                $scope.params.showWrong = true;
                $scope.showOk = false;
                return;
            }

            console.log(gameClass.isEnd());
            if (gameClass.isEnd())
            {
                //stop timer
                $scope.stopFight();
                //hide game 

                //show result


                $scope.displayResult();

                //
                //show share window
                //
                $scope.pushResults($scope.timerCounter);

                // 




                console.log('congradulation');
            }



            $scope.params.showFirst = true
            $scope.params.showWrong = false;
            $scope.showOk = true;
            //console.log($scope.params.showOk)
            $scope.blinkColor(item, true)
            $scope.currentIndex = gameClass.getCurrenNumber()
            $scope.nextIndex = gameClass.getNextNumber()
        }

        $scope.blinkColor = function (item, color)
        {


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

        $scope.isWin = function ()
        {
            if (gameClass.isEnd())
            {
                return true;
            }
            return false
        }

        $scope.pauseGame = function ()
        {
            $scope.stopFight();
        }

        $scope.continueGame = function ()
        {
            $scope.hideAll();
            $('.gameCanvas').show()
            $scope.fight();
        }



        $scope.resizeTimer = function (def)
        {
            returnValu = true;
            if (def == undefined)
            {
                returnValu = false;
                def = $scope.timerCounter;
            }




            var sec_num = def; // don't forget the second param
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
            if (returnValu)
            {
                return hours + ':' + minutes + ':' + seconds;
            } else {
                $scope.timerCounterValue = hours + ':' + minutes + ':' + seconds;
            }




        }
//window.localStorage['results'] = ''
//console.log(window.localStorage['results'])

        $scope.pushResults = function (value)
        {

            tresults = window.localStorage['bestresults'];
            window.localStorage['lastresults'] = value;

            tresults = parseInt(tresults);

            console.log(tresults)
            if (tresults != undefined && tresults > value)
            {

                window.localStorage['bestresults'] = value;

            } else {
                if (isNaN(tresults))
                {
                    window.localStorage['bestresults'] = value;
                }
            }



//            if (tresults == undefined || tresults == '')
//            {
//                tp = new Array();
//                tp.push(value);
//                window.localStorage['results'] = angular.toJson(tp)
//            } else {
//
//                tp = angular.fromJson(tresults);
//                
//                
//                console.log(tp)
//                tp.push(value);
//                window.localStorage['results'] = angular.toJson(tp)
//            }

            // console.log(window.localStorage['results']);

        }
        $scope.getResults = function ()
        {
            bestresults = window.localStorage['bestresults'];
            lastresults = window.localStorage['lastresults'];
            if (lastresults == undefined)
            {
                return false;
            }

            $scope.bestresults = window.localStorage['bestresults'];
            $scope.lastresults = window.localStorage['lastresults'];
            return true;
        }

        $scope.displayResultsLayout = function (t)
        {
            $scope.pauseGame();
            $scope.hideAll();
            $scope.getResults();
            $('.allresult').show();
            if (t)
            {
                $('.mdl-layout__obfuscator').click();
            }
        }
        $scope.displayResult = function ()
        {
            $scope.hideAll();
            $('.result').show();

        }


        $scope.hideAll = function ()
        {
            $('.gameCanvas').hide();
            $('.startPage').hide();
            $('.result').hide();
            $('.allresult').hide();

        }



    }]);






