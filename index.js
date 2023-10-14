"use strict";

const fs = require('fs');
const http = require('http'); 

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Kody.js!\n');
});

// Specify the file path
const filePath = './data.json'; 

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    
    //  read from the file asynchronously
    const filePath = './data.json'; 

    fs.readFile(filePath, 'utf8', (err, fileContent) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Process the file content or perform any necessary setup
        console.log('File content:');
        console.log(fileContent);
    });


});

function parseCoursesFromFile(filePath) {
    const fileData = fs.readFileSync(filePath, 'utf8');

    try {
      const coursesData = JSON.parse(fileData);
      const courseList = [];
  
      coursesData.forEach((courseData) => {
        const {
          title,
          courseNumber,
          campus,
          section,
          subjectDescription,
          hours,
          "meeting times": meetingTimes,
          instructor
        } = courseData;
  
        const meetingDays = {};
  
        for (const day in meetingTimes) {
          const { "start-time": startTime, "end-time": endTime } = meetingTimes[day];
          meetingDays[day] = { "start-time": startTime, "end-time": endTime };
        }
  
        const course = new Course(title, courseNumber, campus, section, subjectDescription, hours, meetingDays, instructor);
        courseList.push(course);
      });
  
      return courseList;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return [];
    }
}
  