const Course = require('./Course');
const { describe, it, expect } = require('@jest/globals');
describe('Course', () => {
    let course;
  
    beforeEach(() => {
      // Create a new instance of index before each test
      course = new Course('Ahmed Bin Zaman','Principles of Computing','16565','CS','100','001','Class','3:00 pm - 4:15 pm','MW','James Buchanan Hall D023','Jan 16, 2024 - May 09, 2024','Lecture');
      
    });

    it('should return the prof name', () =>{
        const profName = course.getInstructor();
        expect(profName).toBe('Ahmed Bin Zaman');
    });
    it('should set the name to John Doe', () =>{
        course.setInstructor('John Doe');
        expect(course.getInstructor()).toBe('John Doe');
    });
    


    it('should return the class title', () =>{
        const classTitle = course.getTitle();
        expect(classTitle).toBe('Principles of Computing');
    });
    it('should set the title to Intro to Statictics', () =>{
        course.setTitle('Intro to Statictics');
        expect(course.getTitle()).toBe('Intro to Statictics');
    });
    


    it('should return the crn number', () =>{
        const crn = course.getCrn();
        expect(crn).toBe('16565');
    });
    it('should set the crn number to 12345', () =>{
        course.setCrn('12345');
        expect(course.getCrn()).toBe('12345');
    });



    it('should return the dcode', () =>{
        const dcode = course.getDcode();
        expect(dcode).toBe('CS');
    });
    it('should set the course dcode to STAT', () =>{
        course.setDcode('STAT');
        expect(course.getDcode()).toBe('STAT');
    });



    it('should return the course number', () =>{
        const cNumb = course.getCno();
        expect(cNumb).toBe('100');
    });
    it('should set the course number to 101', () =>{
        course.setCno('101');
        expect(course.getCno()).toBe('101');
    });


    it('should return the section number', () =>{
        const secNumb = course.getSection();
        expect(secNumb).toBe('001');
    });
    it('should set the section to 003', () =>{
        course.setSection('003');
        expect(course.getSection()).toBe('003');
    });



    it('should return the type of course', () =>{
        const type = course.getType();
        expect(type).toBe('Class');
    });
    it('should set the type of course to recitation', () =>{
        course.setType('Recitation');
        expect(course.getType()).toBe('Recitation');
    });


    it('should return the timings', () =>{
        const times = course.getTime();
        expect(times).toBe('3:00 pm - 4:15 pm');
    });
    it('should set the timings to 10:00 am - 10:50 am', () =>{
        course.setTime('10:00 am - 10:50 am');
        expect(course.getTime()).toBe('10:00 am - 10:50 am');
    });


    it('should return the days', () =>{
        const days = course.getDays();
        expect(days).toBe('MW');
    });
    it('should set days to be R', () =>{
        course.setDays('R');
        expect(course.getDay()).toBe('R');
    });
    

    it('should return the where the course occurs', () =>{
        const location = course.getWhere();
        expect(location).toBe('James Buchanan Hall D023');
    });
    it('should set the location to be in Horizon Hall 2004', () =>{
        course.setWhere('Horizon Hall 2004');
        expect(course.getWhere()).toBe('Horizon Hall 2004');
    });




    it('should return what day the cours estarts and ends', () =>{
        const startDayEndDay = course.getDateRange();
        expect(startDayEndDay).toBe('Jan 16, 2024 - May 09, 2024');
    });
    it('should set the day the course starts and ends to May 12, 2024 - July 8th, 2024', () =>{
        course.setDateRange('May 12, 2024 - July 8th, 2024');
        expect(course.getDateRange()).toBe('May 12, 2024 - July 8th, 2024');
    });


    it('should return what day the cours estarts and ends', () =>{
        const scheduleType = course.getScheduleType();
        expect(scheduleType).toBe('Lecture');
    });
    it('should set the scheudle type to be Collaborative Class', () =>{
        course.setScheduleType('Collaborative Class');
        expect(course.getScheduleType()).toBe('Collaborative Class');
    });

    


    


    
});
