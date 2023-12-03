var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIA4AXXOUIYQWFOG2B2", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let modify = function () {

    
    var params = {
        TableName: "prof-info",
        Key: { "name": "Wassim Masri" },
        UpdateExpression: "set updated_by = :byUser, is_deleted = :boolValue",
        ExpressionAttributeValues: {
            ":byUser": "updateUser",
            ":boolValue": true
        },
        ReturnValues: "UPDATED_NEW"

    };
    docClient.update(params, function (err, data) {

        if (err) {
            console.log("prof-info::update::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("prof-info::update::success "+JSON.stringify(data) );
        }
    });
}

modify();
        