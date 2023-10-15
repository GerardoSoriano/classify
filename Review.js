class Review {
    constructor(review, qualityGrading, difficultyRating, className, label1, label2, label3) {
        this._review = review;
        this._qualityGrading = qualityGrading;
        this._difficultyRating = difficultyRating;
        this._class = className;
        this._label1 = label1;
        this._label2 = label2;
        this._label3 = label3;
    }

    // Getters
    get review() {
        return this._review;
    }

    get qualityGrading() {
        return this._qualityGrading;
    }

    get difficultyRating() {
        return this._difficultyRating;
    }

    get classLabel() {
        return this._class;
    }

    get label1() {
        return this._label1;
    }

    get label2() {
        return this._label2;
    }

    get label3() {
        return this._label3;
    }

    // Setters
    set review(review) {
        this._review = review;
    }

    set qualityGrading(qualityGrading) {
        this._qualityGrading = qualityGrading;
    }

    set difficultyRating(difficultyRating) {
        this._difficultyRating = difficultyRating;
    }

    set class(className) {
        this._class = className;
    }

    set label1(label1) {
        this._label1 = label1;
    }

    set label2(label2) {
        this._label2 = label2;
    }

    set label3(label3) {
        this._label3 = label3;
    }
}

module.exports = Review;