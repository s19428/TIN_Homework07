
const http = require('http');
const url = require('url');

function add(c, d)
{
    return c + d;
}
function sub(c, d)
{
    return c - d;
}
function mul(c, d)
{
    return c * d;
}
function div(c, d)
{
    return c / d;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

http.createServer(function (req, res) {
    const queryObject = url.parse(req.url,true).query;
    console.log(queryObject);
    var operation = queryObject.a; // in (add, sub, mul, div)
    if(!isNumber(queryObject.b) || !isNumber(queryObject.c))
    {
        res.end("wrong input");
    }
    var c = parseInt(queryObject.b);
    var d = parseInt(queryObject.c);

    var result;

    switch(operation)
    {
        case "add":
            result = add(c, d);
            break;
        case "sub":
            result = sub(c, d);
            break;
        case "mul":
            result = mul(c, d);
            break;
        case "div":
            result = div(c, d);
            break;
        default:
            res.end("wrong input");
            break;
    }

    console.log("result = " + result);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('result = ' + result);
  }).listen(8080);