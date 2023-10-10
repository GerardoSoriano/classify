class Professor {

    /*
    * @param {string} firstName 
    * @param {string} lastName 
    * @param {array} classesTaught - list of classes the professor teach 
    */
    constructor(firstName, lastName, classesTaught) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._classesTaught = classesTaught;
    }

    getFirstName() { return this._firstName; }
    getLastName() { return this._lastName; }
    getClassesTaught() {return this._classesTaught;}

    setFirstName(firstName) {this._firstName = firstName};
    setLastName(lastName) {this._lastName = lastName;}
    setClassesTaught(classesTaught) {this._classesTaught = classesTaught;}

}