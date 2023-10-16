var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIA4AXXOUIYQWFOG2B2", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneByKey = function () {
    var params = {
        TableName: "prof-info",
        Key: {
            "name": "Wassim Masri"
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("prof-info::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("prof-info::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
    })
}


fetchOneByKey();