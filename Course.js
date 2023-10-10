class Course {

    /*
    * @param {string} title 
    * @param {MeetDays} meetingDays - object representing the date and time.
    */
    constructor(title, courseNumber, campus, section, subjectDescription, hours, meetingDays) {
        this._title = title;
        this._courseNumber = courseNumber;
        this._campus = campus;
        this._section = section;
        this._subjectDescription = subjectDescription;
        this._hours = hours;
        this._meetingDays = meetingDays;
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
}