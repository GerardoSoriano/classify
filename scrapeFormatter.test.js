/**
 * testing scrapeFormatter.js's scrapeFormatter function
 */
const scrapeFormatter = require('./scrapeFormatter');
const { describe, it, expect } = require('@jest/globals');
const fs = require('fs');
describe('scrapeFormatter', () => {
    let data;
    let reformatted;

    beforeEach(() => {
    //Creates a new variable called data and reformatted that contain an example of data to be reformatted before each test
    data = { "CS": [
        {
            "course name": [
                "Principles of Computing - 16565 - CS 100 - 001"
            ],
            "type": [
                "Class"
            ],
            "time": [
                "3:00 pm - 4:15 pm"
            ],
            "days": [
                "MW"
            ],
            "where": [
                "James Buchanan Hall D023"
            ],
            "date range": [
                "Jan 16, 2024 - May 09, 2024"
            ],
            "schedule type": [
                "Lecture"]
                ,
            "instructor": [
                "Ahmed Bin Zaman (P)"
            ]
        }
    ]};

    data2 = { "CS": [
        {
            "course name": [
                "Principles of Computing - 16565 - CS 100 - 001"
            ],
            "type": [
                "Class"
            ],
            "time": [
                "3:00 pm - 4:15 pm"
            ],
            "days": [
                "MW"
            ],
            "where": [
                "James Buchanan Hall D023"
            ],
            "date range": [
                "Jan 16, 2024 - May 09, 2024"
            ],
            "schedule type": [
                "Lecture"]
                ,
            "instructor": [
                "Ahmed Bin Zaman (P)"
            ]
        },
        {
            "course name": [
                "Principles of Computing - 19992 - CS 100 - DL2"
            ],
            "type": [
                "Class"
            ],
            "time": [
                "1:30 pm - 2:45 pm"
            ],
            "days": [
                "MW"
            ],
            "where": [
                "ON LINE"
            ],
            "date range": [
                "Jan 16, 2024 - May 09, 2024"
            ],
            "schedule type": [
                "Lecture"
            ],
            "instructor": [
                "Ana Loreto Gonzalez Hernandez (P)"
            ]
        }
    ]};

    reformatted = {
        "CS": [
            {
                "crn": "16565",
                "instructor": "Ahmed Bin Zaman",
                "title": "Principles of Computing",
                "dcode": "CS",
                "cno": "100",
                "section": "001",
                "type": "Class",
                "time": "3:00 pm - 4:15 pm",
                "days": "MW",
                "where": "James Buchanan Hall D023",
                "date range": "Jan 16, 2024 - May 09, 2024",
                "schedule type": "Lecture"
            }
        ]
    };
    reformatted2 = {
        "CS": [
            {
                "crn": "16565",
                "instructor": "Ahmed Bin Zaman",
                "title": "Principles of Computing",
                "dcode": "CS",
                "cno": "100",
                "section": "001",
                "type": "Class",
                "time": "3:00 pm - 4:15 pm",
                "days": "MW",
                "where": "James Buchanan Hall D023",
                "date range": "Jan 16, 2024 - May 09, 2024",
                "schedule type": "Lecture"
            },
            {
                "crn": "19992",
                "instructor": "TBA",
                "title": "Principles of Computing",
                "dcode": "CS",
                "cno": "100",
                "section": "DL2",
                "type": "Class",
                "time": "1:30 pm - 2:45 pm",
                "days": "MW",
                "where": "ON LINE",
                "date range": "Jan 16, 2024 - May 09, 2024",
                "schedule type": "Lecture"
            },
        ]
    };
    }); 

    it('should return the reformatted data', () => {
        //runs unformatted data through the scrapeFormatter function and checks to see if the reformatted data is correctly
        const reformattedData = scrapeFormatter(data);
        expect(reformattedData).toEqual(reformatted);
    });

    it('should return the reformatted data2', () => {
        //runs unformatted data through the scrapeFormatter function and checks to see if the reformatted data is correctly with multiple courses, proving that the looping is working correctly
        const reformattedData2 = scrapeFormatter(data2);
        expect(reformattedData2).toEqual(reformatted2);    
    });

    it('should return the same data as the input is reformatted already', () => {
        //runs reformatted data through the scrapFormatter function and checks to see if the data remains unchanged as it is already in the correct format
        const reformattedData = scrapeFormatter(reformatted);
        expect(reformattedData).toEqual(reformatted);
    });
    
    
});
