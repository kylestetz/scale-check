// route for making an XML request using a group ID
// var expat = require('node-expat');
var xml2js = require('xml2js');
// var parser = new xml2js.Parser();

// function ExpatParser() {
//     var parser = new expat.Parser();
//     this.parse = function(s) {
//   parser.parse(s, false);
//     };
// }

exports.getWeighInData = function(req, res){
  // res.send(req.query.group);
  if(req.query.group){

    req.soapClient.GetWeighInData({
        "group": req.query.group
      }, function(err, unparsed_result){
        var weighInXML = unparsed_result.GetWeighInDataResult[0];
        // return res.send(weighInXML);
        //
        if(err){ res.send("error: " + err); }
        else {
          xml2js.parseString(weighInXML, function(err, json_result){
            if(err){ res.send(err); }
            else {
              res.send(JSON.stringify(json_result));
            }
          });
        }
    });
  } else if(req.query.username){
    res.send("username");
  }
  
}