
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , getWeighInData = require('./routes/GetWeighInData')
  , soap = require('soap')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(soapMiddleware());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/GetWeighInData', getWeighInData.getWeighInData);
app.get('/GetWeighInDataByParticipantID', getWeighInData.getWeighInDataByParticipantID);
app.get('/GetWeighInDataByDateRangeAndParticipantID', getWeighInData.getWeighInDataByDateRangeAndParticipantID);
app.get('/GetWeighInDataByDateRange', getWeighInData.getWeighInDataByDateRange);
app.get('/listAPI', getWeighInData.listAPI);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

function soapMiddleware(options){
  var url = 'IHWService.wsdl';
  return function(req, res, next){
    soap.createClient(url, function(err, client){
      req.soapClient = client;
      next();
    });
  }
  
}
