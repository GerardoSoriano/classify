class Professor {
    /**
    * @param {string} firstName 
    * @param {string} lastName 
    * @param {Map} classesTaughtAndScore - classes taught mapped to the average score for that specific class on rateMyProfessor
    * @param {Number} rateMyProfessorScore - total score professor has on rate my professor (null if not found)
    */
    constructor(firstName, lastName, classesTaughtAndScore = null, rateMyProfessorScore) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._classesTaughtAndScore = classesTaughtAndScore !== null ?  classesTaughtAndScore : new Map();
        this._rateMyProfessorScore = rateMyProfessorScore
    }

    getFirstName() { return this._firstName; }
    getLastName() { return this._lastName; }
    getClassesTaughtAndScore() {return this._classesTaughtAndScore;}

    setFirstName(firstName) {this._firstName = firstName};
    setLastName(lastName) {this._lastName = lastName;}

    addClassTaught(classTaught, score) {this._classesTaughtAndScore.set(classTaught, score);}

    clearClassesTaughtAndScore() {this._classesTaughtAndScore.clear();}

    setClassesTaughtAndScore(classesTaughtAndScore) {this._classesTaught = classesTaught;}

}