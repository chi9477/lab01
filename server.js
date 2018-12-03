var express = require('express');
var app = express();

const pi = 3.1416;

app.get('/square/area/:length',function(req,res){
    var result = {};
    result.length = Number(req.params.length);
    result.area = req.params.length * req.params.length;
    res.status(200).json(result).end();
});

app.get('/square/perimeter/:length',function(req,res){
    var result = {};
    result.length = Number(req.params.length);
    result.perimeter = req.params.length * 4;
    res.status(200).json(result).end();
});

app.get('/circle/area/:radius',function(req,res){
    var result = {};
    result.radius = Number(req.params.radius);
    result.area = pi * Math.pow(req.params.radius,2);
    res.status(200).json(result).end();
});

app.get('/circle/perimeter/:radius',function(req,res){
    var result = {};
    result.radius = Number(req.params.radius);
    result.perimeter = 2 * pi * req.params.radius;
    res.status(200).json(result).end();
});

app.get('*',function(req,res){
    res.status(404).end('File not found');
});

app.listen(process.env.PORT || 8099);