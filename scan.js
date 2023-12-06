var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "...", "secretAccessKey": "..."
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
let coursesTaughtbyProf = function(instructor){
    var params = {
        ExpressionAttributeValues: {
            ":instructor": instructor
        },
        FilterExpression: "instructor = :instructor",
        KeyConditionExpression: 'instructor = :instructor',
        TableName: "prof-info",
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.log("prof-info::coursesTaughtbyProf::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("prof-info::coursesTaughtbyProf::success - " + JSON.stringify(data, null, 2));
        }
    })
}


let coursesWithDcodeAndCno = function(dcode, cno){
    let params = {
        ExpressionAttributeValues: {
            ":dcode": dcode,
            ":cno": cno
        },
        FilterExpression: "dcode = :dcode and cno = :cno",
        TableName: "prof-info"
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.log("course-info::coursesWithDcodeAndCno::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("course-info::coursesWithDcodeAndCno::success - " + JSON.stringify(data, null, 2));
        }
    })
}

let getInstructors = function(){
    return new Promise((resolve, reject) => {
        let params = {
            TableName: "prof-info",
            ProjectionExpression: "instructor"
        };
        docClient.scan(params, function (err, data) {
            if (err) {
                console.log("prof-info::getInstructors::error - " + JSON.stringify(err, null, 2));
                reject(err);
            }
            else {
                const instructors = data.Items.map(item => item.instructor);
                console.log("prof-info::getInstructors::success - " + JSON.stringify(data, null, 2));
                resolve(instructors);
            }
        });
    });
};

const fs = require('fs');

getInstructors().then((instructors) => {
    const uniqueInstructors = [...new Set(instructors)]; // Remove duplicates
    const sortedInstructors = uniqueInstructors.sort(); // Sort alphabetically

    const instNames = JSON.stringify(sortedInstructors);
    fs.writeFile('instNames.json', instNames, (err) => {
        if (err) {
            console.error("Error writing to instNames.json:", err);
        } else {
            console.log("instNames.json has been created successfully.");
        }
    });
});
module.exports = {
    coursesTaughtbyProf,
    coursesWithDcodeAndCno,
    getInstructors
};
