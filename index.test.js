/**
 * Testing index.js's getInstructorsFromFile and SortProfessorsGivenCourse functions
 */
const index = require('./index');
const { describe, it, expect } = require('@jest/globals');

describe('index', () => {
  let index;

<<<<<<< HEAD
  it('should return a set of professor names', async () => {
    // Checks to see if the function resturns a set of professor names
    expect(() => index.getInstructorsFromFile('./patriotWeb_scraper/spring24.json').ToBeInstanceOf(Set));
  });

  it('should throw an error from incorrect path', async () => {
    // Checks to see if the function throws an error when given an invalid path
=======
  it('should return a set of professor names', () => {
    const professorNames = index.getInstructorsFromFile('./patriotWeb_scraper/spring24.json')
    expect(professorNames).toBeInstanceOf(Set);
  });

  it('should throw an error from incorrect path', () => {
    // Use a callback to test if a function throws an error
>>>>>>> e8224c5 (rmpReviews tests)
    expect(() => index.getInstructorsFromFile('./incorrectPath')).toThrow();
  });
  

});

describe('sortProfessorsGivenCourse', () => {
  it('should sort professors by highest average score', () => {
    //Checks to see if the function correctly sorts professors based on the highest rating
      const professorsMap = new Map([
          ['Professor A', 4.5],
          ['Professor B', 3.8],
          ['Professor C', -1],
          ['Professor D', 4.2],
          ['Professor E', -1],
      ]);

      const sortedProfessors = index.sortProfessorsGivenCourse(professorsMap);

      // Expect Professor A, D, B, C, E in that order
      expect(sortedProfessors).toEqual(['Professor A', 'Professor D', 'Professor B', 'Professor C', 'Professor E']);
  });
});