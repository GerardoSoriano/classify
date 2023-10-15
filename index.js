"use strict";

const fs = require('fs');
const http = require('http'); 


// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello, Kody.js!\n');
// });

// Specify the file path
const filePath = './data.json'; 

// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);

    
//     //  read from the file asynchronously
//     const filePath = './patriotWeb_scraper/spring24_formatted.json';  

//     fs.readFile(filePath, 'utf8', (err, fileContent) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return;
//         }

//         // Process the file content or perform any necessary setup
//         // console.log('File content:');
//         // console.log(fileContent);

//     });


  // console.log("HEY" + getInstructorsFromFile('./patriotWeb_scraper/spring24.json'));


// });

function parseCoursesFromFile(filePath) {
    const fileData = fs.readFileSync(filePath, 'utf8');

    try {
      const coursesData = JSON.parse(fileData);
      const courseList = [];
  
      coursesData.forEach((courseData) => {
        const {
          instructor,
          title,
          crn,
          dcode,
          cno,
          section,
          type,
          time,
          days,
          where,
          date_range,
          schedule_type
        } = courseData;
  
        // const meetingDays = {};
  
        // for (const day in meetingTimes) {
        //   const { "start-time": startTime, "end-time": endTime } = meetingTimes[day];
        //   meetingDays[day] = { "start-time": startTime, "end-time": endTime };
        // }
  
        const course = new Course(instructor,title,crn,dcode,cno,section,type,time,days,where,date_range,schedule_type);
        courseList.push(course);
      });
  
      return courseList;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return [];
    }
}
//Uses Set
function getInstructorsFromFile(filePath, callback) {
  const instructorList = new Set();

  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
  
    try {
      const all = JSON.parse(fileData);
      const coursesData = all.CS;
  
      if (Array.isArray(coursesData)) {
        coursesData.forEach((courseData) => {

          const {
            "instructor": instructor
          } = courseData;
  
          if (instructor !== "TBA") {
            instructorList.add(instructor.substring(0, instructor.length - 4));
          }
        });
      } else {
        console.error("coursesData is not an array.");
      }
    } catch (parseErr) {
      console.error("Error parsing the JSON:", parseErr);
    }
    //console.log(instructorList);
    callback(Array.from(instructorList));
  });
}



const prof = getInstructorsFromFile('./patriotWeb_scraper/spring24.json', (instructors) => {console.log(instructors); });

//console.log("its this one " + prof);


/**
 * 
 * @param {map of professor to list} professorsMap 
 * @returns 
 */
function sortProfessorsGivenCourse(professorsMap) {
  const sortedList = Array.from(professorsMap.entries())
      .map(([professor, score]) => ({
          professor,
          score: score !== undefined ? score : -1
      }))
      .sort((a, b) => b.score - a.score);

  return sortedList.map(item => item.professor);
}

module.exports = { sortProfessorsGivenCourse };