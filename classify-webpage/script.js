
//var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIA4AXXOUIYQWFOG2B2", "secretAccessKey": "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"
};
  AWS.config.update(awsConfig);

  var dynamoDB = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: 'prof-info',
  };

  dynamoDB.scan(params, function (err, data) {
    if (err) {
      console.error('Error scanning DynamoDB table:', err);
    } else {
      console.log('Scan result:', data);
      // Process the data as needed
      displayResults(data.Items);
    }
  });

  function displayResults(items){
    var resultsDiv = document.getElementById('scanResults');

    if(items.length === 0){
      resultsDiv.innerHTML = '<p>No results found</p>';
    }
    else{
      //var resultList = '<ul>';
      var table = '<table border="1">';

      table += '<tr>';
      Object.keys(items[0]).forEach(function (key) {
        table += '<th>' + key.toUpperCase() + '</th>';
      });
      table += '</tr>';

      items.slice(0,10).forEach(function(item){
        table += '<tr>';
        Object.values(item).forEach(function (value){
          table += '<td>' + JSON.stringify(value).replace(/['"]+/g, '') + '</td>';
        });
        table += '</tr>';
      });

      table += '</table>';
      resultsDiv.innerHTML = table;

      // items.slice(0,10).forEach(function (item) {
      //   resultList += '<li>'+ JSON.stringify(item) +'</li>';
      // });
      // resultList += '</ul>';
      // resultsDiv.innerHTML = resultList;
    }
  }

