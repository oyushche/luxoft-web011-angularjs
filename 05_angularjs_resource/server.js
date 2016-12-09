var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000);

var users = [
    {id: 1, name: "Oleg"},
    {id: 2, name: "Irina"},
    {id: 3, name: "Bogan"}
];

var getUserById = function (id)
{
    var result = {};

    for (var i = 0; i < users.length; i++)
    {
        if (users[i].id == id)
        {
            result = users[i];
            break;
        }
    }

    return result;
};

app.get("/user/:userId", function (req, res)
{
    var result = getUserById(req.params.userId);

    res.send(result);
});

app.post("/user/:userId", function (req, res)
{
    var user = req.body;
    users.push(user);

    res.end();
});

app.put("/user/:userId", function (req, res)
{
    var result = getUserById(req.params.userId);

    if (result.id != null) {
        result.name = req.body.name;
    }

    res.send(result);
});

app.delete("/user/:userId", function (req, res)
{
    var id = req.params.userId;

    var newUsers = [];
    for (var i = 0; i < users.length; i++)
    {
        if (users[i].id != id)
        {
            newUsers.push(users[i]);
        }
    }
    users = newUsers;

    res.end();
});