

prepareNewSection("0. Create an object");

var empty = {};

var person = { id: 0, name: "Oleg" };

var activePerson =
{
    id: 25,
    name: "Oleg",

    getName: function ()
    {
        return this.name;
    }
};

console.log(activePerson.getName());

prepareNewSection("1. Add properties at runtime");

activePerson.getId = function ()
{
    return this.id;
};

console.log(activePerson.getId());

prepareNewSection("2. Constructor functions");

function Bird(id, type)
{
    this.id = id;
    this.type = type;

    this.toString = function ()
    {
         return "id: " + id + " type: " + type;
    }
};

var eagle1 = new Bird(23, "Eagle");
var eagle2 = new Bird(43, "Eagle");

console.log(eagle1.toString());
console.log(eagle2.toString());

console.log("each object contains a copy of #toString()");
console.log("result of eagle1.toString == eagle2.toString: " + (eagle1.toString == eagle2.toString));

prepareNewSection("3. prototype");


function Animal(id, type)
{
    this.id = id;
    this.type = type;
};

Animal.prototype.toString = function ()
{
    return "id: " + id + " type: " + type;
};


var cat1 = new Animal(13, "Cat");
var cat2 = new Animal(14, "Cat");

console.log("if #toString() defined on obj.prototype you will have only one copy");
console.log("result of cat1.toString == cat2.toString: " + (cat1.toString == cat2.toString));

prepareNewSection("4. extends");

function Parent()
{
    this.id = 23;
    this.descr = "parent";

    this.toString = function ()
    {
        return this.descr;
    }
}

function Child()
{
    this.descr = "child";
    this.age = 12;
}

Child.prototype = new Parent();

var child = new Child();

console.log("child.id: " + child.id);
console.log("child.descr: " + child.descr);
console.log("child.age: " + child.age);
console.log("child.toString(): " + child.toString());
console.log(child);

prepareNewSection("5. Private data");

function Car()
{
    this.id = 34;

    var _color = "Black";

    this.getColor = function ()
    {
        return _color;
    };

    this.setColor = function (color)
    {
        _color = color;
    };
}

var car = new Car();

console.log("Car.id: " + car.id);
console.log("Car._color: " + car._color);
console.log("Car.getColor(): " + car.getColor());

car.setColor("red");
console.log("Car.getColor(): " + car.getColor());
console.log(car);

prepareNewSection("6. Function as a param");

function println(data)
{
    console.log(data)
};

function printlnArrow(data)
{
    console.log("--> " + data);
};

function printArray(arr, printFn)
{
    for (var i = 0; i < arr.length; i++)
    {
        printFn(arr[i]);
    }
}

printArray([1, 2, 3], println);

prepareNewSection("7. Callback function");

var fnA = function (callback)
{
    var result = "some test data";

    console.log("fnA has done it's job");

    callback(result);
};

var callbackForFnA = function (input)
{
    console.log("callbackForFnA called [data: " + input + "]");
};

fnA(callbackForFnA);

prepareNewSection("8.1 Closure (access closed part of the object) ");
prepareNewSection("Run this in Chrome");

var adder = function math()
{
    var sum = 0;

    return function(number)
    {
        sum += number;
        return sum;
    }
}();

adder(2);
console.dir(adder);


prepareNewSection("8.2 Closure (access closed part of the object) ");

(function ()
{
    this.check = function ()
    {
        return private();
    };

    var private = function ()
    {
        console.log("private");
    };

})();

check();


prepareNewSection("9. Return Closure");

function SecretKeeper()
{
    this.name = "Oleg";

    function getActualSecret()
    {
        console.log("Yes!!! You are lucky today: secret");
    };

    this.tryYourLuck = function()
    {
        return function (number)
        {
            if (number == 3)
            {
                return getActualSecret();
            }
            else
            {
                console.log("Not this time");
            }
        };
    }();
}

// SecretKeeper.prototype.tryYourLuck = function()
// {
//     function getActualSecret()
//     {
//         console.log("Yes!!! You are lucky today: secret");
//     };
//
//     return function (number)
//     {
//         if (number == 3)
//         {
//             return getActualSecret();
//         }
//         else
//         {
//             console.log("Not this time");
//         }
//     };
// }();


var keeper = new SecretKeeper();

keeper.tryYourLuck(14);
keeper.tryYourLuck(3);

prepareNewSection("10. call(), apply()");

var numbers = [1, 2, 3];

var fn = function (prefix, number)
{
    console.log(prefix + ": " + number);
};

function Worker(id)
{
    this.id = id;

    this.doTheJob = function(data, job)
    {
        for (var i = 0; i < data.length; i++)
        {
            // job.call(this, "worker_" + this.id, data[i]); // params comma separated
            job.apply(this, ["worker_" + this.id, data[i]]); // params as array
        }
    };
}

var w1 = new Worker(1);
var w2 = new Worker(2);

w1.doTheJob(numbers, fn);
console.log(" ");
w2.doTheJob(numbers, fn);



function prepareNewSection(data)
{
    console.log(" ");
    console.log("================ " + data + " ===============");
    console.log(" ");
}

// function Person()
// {
//     this.getName = function ()
//     {
//         return "anonymous";
//     }
// }
//
// var p1 = new Person();
// var p2 = new Person();
//
// p1.getName = function () { return "Alex"; };
// Person.getName = function () { return "Oleg"; };
//
// console.log("p1: " + p1.getName() + ", p2: " + p2.getName());
//

// function Father() { this.name = "Alex"; this.age = 40 };
// function Son() { this.age = 8 };
//
// Son.prototype = new Father();
//
// var son = new Son();
//
//
// console.log("name: " + son.name + ", age: " + son.age);


// function Cache() {}
// Cache.prototype.data = [];
// Cache.prototype.push = function (value) { this.data.push(value); };
//
// var cOne = new Cache();
// var cTwo = new Cache();
//
// cOne.push(10);
// cTwo.push(44);
//
// console.log(cOne.data.toString());

// function Person(name) {
//     this.name = name;
//     this.greet = function () {
//         console.log("Hi, my name is " + this.name);
//     }
// }
//
// function Doctor(name) {
//     Person.call(this, name);
// }
//
// Doctor.prototype = new Person();
// Doctor.prototype.greet = function () {
//     console.log("Hi, my name is Dr. " + this.name);
// };
//
// new Person("Oleg").greet();
// new Doctor("Irina").greet();


