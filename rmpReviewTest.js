const rmpReview = require('./rmpReview');
const { describe, it, expect } = require('@jest/globals');

describe('rmpReview', () => {
    let rmpReview;

    beforeEach(() => {
        // Create a new instance of rmpReview before each test
        rmpReview = new rmpReview();

      });
      //tests for getProfessorURLFromRMP
      it('should provide a valid URL', () => {
        expect(rmpReview.getProfessorURLFromRMP('Dana Richards').toBe("https://www.ratemyprofessors.com/professor/2760618"));
      });

      it('should provide an invalid URL', () => {
        expect(rmpReview.getProfessorURLFromRMP('Dana Richards').toBe(NULL));
      });
      //tests for getReviewForProfessor
      it('should provide a valid review', () => {
        expect(rmpReview.getReviewForProfessor('Dana Richards').toBe("INPUT THE CORRECT REVIEW HERE"));
      });

      it('should provide an invalid review', () => {
        expect(rmpReview.getReviewForProfessor('Someone that definetly doesnt exist').toBe(NULL));
      });
    });