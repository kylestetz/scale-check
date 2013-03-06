$(document).ready(function(){
  // submit field & button
  var groupIdInputField = $('#group-id-input');
  var participantIdInputField = $('#participant-id-input');
  var dateInputField = $('#date-input');
  // set the date input field to today
  dateInputField.val(moment().format('YYYY-MM-DD'));
  var submitButton = $('#group-submit-button');

  // results window
  var resultsWindow = $('#results-window');

  // expand callbacks to check which fields have been filled in
  submitButton.click(function(){
    // if the group ID form is blank, we can't continue. :( bummer
    if(groupIdInputField.val() === ''){
      $('#results-window').html('<h5>Hey! The Group ID field is mandatory.</h5>');
      return;
    }

    resultsWindow.html('<h5>Loading...!</h5>');

    // if all the fields are filled in, try
    // getWeighInDataByDateRangeAndParticipantID
    if(participantIdInputField.val() && dateInputField.val()){
      var groupId = groupIdInputField.val();
      var groupEncoded = encodeURIComponent(groupId);
      var startDate = dateInputField.val();
      var endDate = moment().add('day', 1).format("YYYY-MM-DD");
      var participantID = participantIdInputField.val();

      getWeighInDataByDateRangeAndParticipantID(groupEncoded, startDate, endDate, participantID, function(data){
        data.ParticipantWeighIns.ParticipantWeighIn.reverse();
        // list each weigh-in
        var resultsHTML = ['<h5>Weigh-Ins of Participant ' + participantID + ' from ' + startDate + ' to ' + endDate + '</h5>'];
        for(var i = 0; i < data.ParticipantWeighIns.ParticipantWeighIn.length; i++){
          resultsHTML.push(formatData(data.ParticipantWeighIns.ParticipantWeighIn[i]));
        }
        resultsWindow.html(resultsHTML.join(''));
      });
    }

    // if group and participant id are filled in and NOT date, hit
    // getWeighInDataByParticipantID
    if(participantIdInputField.val() && !dateInputField.val()){
      var groupId = groupIdInputField.val();
      var groupEncoded = encodeURIComponent(groupId);
      var participantID = participantIdInputField.val();

      getWeighInDataByParticipantID(groupEncoded, participantID, function(data){
        data.ParticipantWeighIns.ParticipantWeighIn.reverse();
        // list each weigh-in
        var resultsHTML = ['<h5>Weigh-Ins of Participant ' + participantID + '</h5>'];
        for(var i = 0; i < data.ParticipantWeighIns.ParticipantWeighIn.length; i++){
          resultsHTML.push(formatData(data.ParticipantWeighIns.ParticipantWeighIn[i]));
        }
        resultsWindow.html(resultsHTML.join(''));
      });
    }

    // if group and date range are filled in but NOT participant id, hit
    // getWeighInDataByDateRange
    if(dateInputField.val() && !participantIdInputField.val()){
      var groupId = groupIdInputField.val();
      var groupEncoded = encodeURIComponent(groupId);
      var startDate = dateInputField.val();
      var endDate = moment().add('day', 1).format("YYYY-MM-DD");

      getWeighInDataByDateRange(groupEncoded, startDate, endDate, function(data){
        data.ParticipantWeighIns.ParticipantWeighIn.reverse();
        // list each weigh-in
        var resultsHTML = ['<h5>Weigh-Ins from ' + startDate + ' to ' + endDate + '</h5>'];
        for(var i = 0; i < data.ParticipantWeighIns.ParticipantWeighIn.length; i++){
          resultsHTML.push(formatData(data.ParticipantWeighIns.ParticipantWeighIn[i]));
        }
        resultsWindow.html(resultsHTML.join(''));
      });
    }

    // finally: if only group id is filled in, hit getWeighInData
    if(!participantIdInputField.val() && !dateInputField.val()){
      var encodedUrl = encodeURIComponent(groupIdInputField.val());
      getWeighInData(encodedUrl, function(data){
        data.ParticipantWeighIns.ParticipantWeighIn.reverse();
        // list each weigh-in
        var resultsHTML = ['<h5>All Weigh-Ins by Date</h5>'];
        for(var i = 0; i < data.ParticipantWeighIns.ParticipantWeighIn.length; i++){
          resultsHTML.push(formatData(data.ParticipantWeighIns.ParticipantWeighIn[i]));
        }
        resultsWindow.html(resultsHTML.join(''));
      });
    }
  });


  // formatData takes one participant from the array & returns the necessary html
  function formatData(data){
    var _html = ['<ul>'];
      _html.push('<li><p class="date-line">');
        _html.push("Date: " + data.WeighInDate[0]);
      _html.push('</p></li>');
    _html.push('</ul>');
    _html.push('<ul class="additional-data">');
      _html.push('<li>' + 'Participant ID: ' + data.ParticipantID[0] + '</li>');
      _html.push('<li>' + 'Weight: ' + data.Weight[0] + '</li>');
      _html.push('<li>' + 'BMI: ' + data.BMI[0] + '</li>');
    _html.push('</ul>');
    return _html.join('');
  }

});