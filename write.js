      
var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "...", "secretAccessKey": "..."
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let save = function () {

    var input = {
        "title": "Analysis of algo",
		"subject-description": "computer science",
		"course-number": "483",
		"section": "001",
		"hours": "3",
		"crn": "10614",
		"term": "spring 2024",
		"instructor": "Russel Katherine",
		"meeting times": {
			"monday": {
				"start-time": "01:30",
				"end-time": "3:00"
			},
			"wednesday": {
				"start-time": "01:30",
				"end-time": "3:00"
			}
					
		},
		"campus": "Fairfax"
    };
    var params = {
        TableName: "prof-info",
        Item:  input
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("prof-info::save::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("prof-info::save::success" );                      
        }
    });
}

save();
