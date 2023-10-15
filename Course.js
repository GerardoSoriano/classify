class Course {

    /** 
     *@param {string} instructor 
    * @param {string} title 
    * @param {int} crn - registration number for course
    * @param {string} dcode - department code (CS, HIST, SWE, etc)
    * @param {int} cno - number of course (110, 211, 262, etc)
    * @param {string} section - class section
    * @param {string} type
    * @param {string} days
    * @param {string} where
    * @param {string} date_range
    * @param {string} schedule_type - (lecture, recitation, lab, etc)
    */

    /*
    * Should we ommit meeting days and section and just have the course with a map of professors that teach it and their score for that class?
    * this would make it easier for search by class ability, we can just return the course and list the projessors teaching it
    * Or we can mention the professor for that section and meeting times etc.
    * 
    * I'm including instructor for now
    */
    constructor(instructor,title,crn,dcode,cno,section,type,time,days,where,date_range,schedule_type) {
        this.instructor = instructor;
        this.title = title;
        this.crn = crn;
        this.dcode = dcode;
        this.cno = cno;
        this.section = section;
        this.type = type;
        this.time = time;
        this.days = days;
        this.where = where;
        this.date_range = date_range;
        this.schedule_type = schedule_type;
    }

    // Getters
    getInstructor() {
        return this._instructor;
    }
    getTitle() {
        return this._title;
    }
    getCrn() {
        return this._crn;
    }
    
    getDcode() {
        return this._dcode;
    }
    
    getCno() {
        return this._cno;
    }
    
    getSection() {
        return this._section;
    }
    
    getType() {
        return this._type;
    }

    getTime() {
        return this._time;
    }

    getDays() {
        return this._days;
    }
    getWhere() {
        return this._where;
    }
    getDateRange() {
        return this._date_range;
    }
    getScheduleType() {
        return this._schedule_type;
    }

    // Setters

    setInstructor(instructor) {
    this._instructor = instructor;
    }

    setTitle(title) {
        this._title = title;
    }
    setCrn(crn) {
        this._crn = crn;
    }
    
    setDcode(dcode) {
        this._dcode = dcode;
    }
    
    setCno(cno) {
        this._cno = cno;
    }
    
    setSection(section) {
        this._section = section;
    }
    
    setType(type) {
        this._type = type;
    }
    
    setTime(time) {
        this._time = time;
    }
    
    setDays(days) {
        this._days = days;
    }
    
    setWhere(where) {
        this._where = where;
    }
    
    setDateRange(date_range) {
        this._date_range = date_range;
    }
    
    setScheduleType(schedule_type) {
        this._schedule_type = schedule_type;
    }

}
