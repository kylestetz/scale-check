function getWeighInData(encodedUrl, callback){
  $.getJSON('/GetWeighInData?group=' + encodedUrl, function(data){
    // reverse the list so that the most recent item is first
    callback(data);
  });
}

function getWeighInDataByDateRangeAndParticipantID(groupEncoded, startDate, endDate, participantID, callback){
  var route = '/getWeighInDataByDateRangeAndParticipantID?group=' + groupEncoded + '&startDate=' + startDate + '&endDate=' + endDate + '&participantid=' + participantID;
  $.getJSON(route, function(data){
    // reverse the list so that the most recent item is first
    callback(data);
  });
}

function getWeighInDataByParticipantID(groupEncoded, participantID, callback){
  var route = '/getWeighInDataByParticipantID?group=' + groupEncoded + '&participantid=' + participantID;
  $.getJSON(route, function(data){
    callback(data);
  });
}

function getWeighInDataByDateRange(groupEncoded, startDate, endDate, callback){
  var route = '/getWeighInDataByDateRange?group=' + groupEncoded + '&startDate=' + startDate + '&endDate=' + endDate;
  $.getJSON(route, function(data){
    callback(data);
  });
}