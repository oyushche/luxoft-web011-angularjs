
var mongoClient = require("mongodb").MongoClient;
ObjectID = require("mongodb").ObjectID;

var assert = require("assert");

var dbConnectionUrl = 'mongodb://localhost:27017/birds';
var db;

var manyBirds =
[
    {id: 0, type: 'Eagle', inStock: 24, sold: 3},
    {id: 1, type: 'Duck', inStock: 15, sold: 12},
    {id: 2, type: 'Crow', inStock: 3, sold: 36},
    {id: 3, type: 'Chicken', inStock: 40, sold: 16}
];

var oneBird = {id: 4, type: 'Owl', inStock: 4, sold: 2};

var async = require("async");

var initNextFunction = function(name)
{
    console.log();
    console.log("================== " + name + " ========================");
    console.log();
};

async.waterfall([
    function (cb)
    {
        initNextFunction("Connect to DB");

        mongoClient.connect(dbConnectionUrl, function (err, dbase)
        {
            assert.equal(null, err);
            console.log("Connected to " + dbConnectionUrl);
            db = dbase;
            cb(null);
        });
    }
    ,function (cb)
    {
        initNextFunction("Insert " + manyBirds.length + " Birds");

        db.collection("birds").insertMany(manyBirds, { w: 1 }, function (err, result)
        {
            assert.equal(null, err);
            console.log(JSON.stringify(result, 0, 2));
            cb(null);
        });
    }
    ,function (cb)
    {
        initNextFunction("Insert One Bird");

        db.collection("birds").insertOne(oneBird, { w: 1 }, function (err, result)
        {
            assert.equal(null, err);
            console.log("result.insertedIdt: " + result.insertedId);

            cb(null, result.insertedId);
        });
    }
    ,function (id, cb)
    {
        initNextFunction("Update last added bird");

        db.collection("birds").updateOne({"_id": ObjectID(id)}, {$set: {sold: 3, inStock: 3}}, {w: 'majority'}, function (err, result)
        {
            var cursor =  db.collection("birds").find({"_id": ObjectID(id)});

            cursor.on("data", function (bird)
            {
                console.log(bird);
            });

            cursor.once("end", function ()
            {
                cb(null, id);
            });
        });
    }
    ,function (id, cb)
    {
        initNextFunction("Delete last added bird");

        db.collection("birds").deleteOne({ "_id": ObjectID(id) }, { w: 1 }, function (err, result)
        {
            console.log("result.deletedCount: " + result.deletedCount + " { id: " + id + " }");
            cb(null);
        });
    }
    ,function (cb)
    {
        initNextFunction("Find first 20 birds ordered by type");

        var cursor =  db.collection("birds")
            .find({})
            .sort({ type: 1 })
            .limit(20)
            ;

        cursor.on("data", function (bird)
        {
            console.log(bird);
        });

        cursor.once("end", function ()
        {
            cb(null);
        });
    }
    ,function (cb)
    {
        initNextFunction("Clear DB");

        db.collection("birds").deleteMany({}, {w: 1}, function (err, result)
        {
            console.log("result.deletedCount: " + result.deletedCount);
            cb(null);
        });
    }
    ],
    function (err, results)
    {
        initNextFunction("Close connection");
        db.close();
    }
);