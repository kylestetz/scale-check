// route for making an XML request using a group ID
var xml2js = require('xml2js');

exports.getWeighInData = function(req, res){
  if(req.query.group){
    // this is the call to the SOAP API
    req.soapClient.GetWeighInData({
        "group": req.query.group
      }, function(err, unparsed_result){
        // the incoming data is XML stored at location 0 in a JSON object
        var weighInXML = unparsed_result.GetWeighInDataResult[0];
        if(err){ res.send("error: " + err); }
        else {
          // use xml2js to parse the XML
          xml2js.parseString(weighInXML, function(err, json_result){
            if(err){
              res.send(err);
            } else {
              // send the resulting JSON
              res.send(JSON.stringify(json_result));
            }
          });
        }
    });
  }
}

exports.getWeighInDataByParticipantID = function(req, res){
  if(req.query.group && req.query.participantid){
    // this is the call to the SOAP API
    req.soapClient.GetWeighInDataByParticipantID({
        "group": req.query.group,
        "participantid": req.query.participantid
      }, function(err, unparsed_result){
        // the incoming data is XML stored at location 0 in a JSON object
        var weighInXML = unparsed_result.GetWeighInDataByParticipantIDResult[0];
        if(err){ res.send("error: " + err); }
        else {
          // use xml2js to parse the XML
          xml2js.parseString(weighInXML, function(err, json_result){
            if(err){
              res.send(err);
            } else {
              // send the resulting JSON
              res.send(JSON.stringify(json_result));
            }
          });
        }
    });
  }
}

exports.getWeighInDataByDateRangeAndParticipantID = function(req, res){
  if(req.query.group && req.query.startDate && req.query.endDate && req.query.participantid){
    // this is the call to the SOAP API
    req.soapClient.GetWeighInDataByDateRangeAndParticipantID({
        "group": req.query.group,
        "startDate": req.query.startDate,
        "endDate": req.query.endDate,
        "participantid": req.query.participantid
      }, function(err, unparsed_result){
        // the incoming data is XML stored at location 0 in a JSON object
        var weighInXML = unparsed_result.GetWeighInDataByDateRangeAndParticipantIDResult[0];
        if(err){ res.send("error: " + err); }
        else {
          // use xml2js to parse the XML
          xml2js.parseString(weighInXML, function(err, json_result){
            if(err){
              res.send(err);
            } else {
              // send the resulting JSON
              res.send(JSON.stringify(json_result));
            }
          });
        }
    });
  }
}

exports.getWeighInDataByDateRange = function(req, res){
  if(req.query.group && req.query.startDate && req.query.endDate){
    // this is the call to the SOAP API
    req.soapClient.GetWeighInDataByDateRange({
        "group": req.query.group,
        "startDate": req.query.startDate,
        "endDate": req.query.endDate
      }, function(err, unparsed_result){
        // the incoming data is XML stored at location 0 in a JSON object
        var weighInXML = unparsed_result.GetWeighInDataByDateRangeResult[0];
        if(err){ res.send("error: " + err); }
        else {
          // use xml2js to parse the XML
          xml2js.parseString(weighInXML, function(err, json_result){
            if(err){
              res.send(err);
            } else {
              // send the resulting JSON
              res.send(JSON.stringify(json_result));
            }
          });
        }
    });
  }
}

exports.listAPI = function(req, res){
  res.send(req.soapClient.describe());
}