class Course {

    /** 
    * @param {string} title 
    * @param {int} courseNumber
    * @param {string} campus
    * @param {int} section - class section
    * @param {string} subjectDescription
    * @param {int} hours - credit hours
    * @param {MeetDays} meetingDays - object representing the date and time.
    */

    /*
    * Should we ommit meeting days and section and just have the course with a map of professors that teach it and their score for that class?
    * this would make it easier for search by class ability, we can just return the course and list the projessors teaching it
    * Or we can mention the professor for that section and meeting times etc.
    * 
    * I'm including instructor for now
    */
    constructor(title, courseNumber, campus, section, subjectDescription, hours, meetingDays, instructor) {
        this._title = title;
        this._courseNumber = courseNumber;
        this._campus = campus;
        this._section = section;
        this._subjectDescription = subjectDescription;
        this._hours = hours;
        this._meetingDays = meetingDays;
        this._instructor = instructor;
    }

    // Getters
    getTitle() {
        return this._title;
    }

    getCourseNumber() {
        return this._courseNumber;
    }

    getCampus() {
        return this._campus;
    }

    getSection() {
        return this._section;
    }

    getSubjectDescription() {
        return this._subjectDescription;
    }

    getHours() {
        return this._hours;
    }

    getMeetingDays() {
        return this._meetingDays;
    }

    getInstructor() {
        return this._instructor;
    }

    // Setters
    setTitle(newTitle) {
        this._title = newTitle;
    }

    setCourseNumber(newCourseNumber) {
        this._courseNumber = newCourseNumber;
    }

    setCampus(newCampus) {
        this._campus = newCampus;
    }

    setSection(newSection) {
        this._section = newSection;
    }

    setSubjectDescription(newDescription) {
        this._subjectDescription = newDescription;
    }

    setHours(newHours) {
        this._hours = newHours;
    }

    setMeetingDays(newMeetingDays) {
        this._meetingDays = newMeetingDays;
    }

    setInstructor(instructor) {
        this._instructor = instructor;
    }
}