class MeetDays {

    /**
     * Why do we need a class for MeetDats?
     */

    constructor(dayOfWeek, startingTime, endingTime) {
        this._dayOfWeek = dayOfWeek;
        this._startingTime = startingTime;
        this._endingTime = endingTime;
    }

    getDayOfWeek() {return this._dayOfWeek;}
    getStartingTime() {return this._startingTime;}
    getEndingTime() {return this._endingTime;}

    setDayOfWeek(dayOfWeek) {
        this._dayOfWeek = dayOfWeek;
    }

    setStartingTime(startingTime) {
        this._startingTime = startingTime;
    }

    setEndingTime(endingTime) {
        this._endingTime = endingTime;
    }


}