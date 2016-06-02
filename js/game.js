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

    this.chekItem = function (item)
    {
        if (item == this.currentNextNumber)
        {

            this.incrementCounter();
            return true;
        }
        return false;
    }

    this.getCurrenNumber = function ()
    {
        return this.currentNumber;
    }
    this.getNextNumber = function ()
    {
        return this.currentNextNumber;
    }

    this.isStarted = function ()
    {
        if (this.state == 1)
        {
            return true;
        }

        return false;
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

