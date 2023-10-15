const { sortProfessorsGivenCourse, index } = require('./index');
const { describe, it, expect } = require('@jest/globals');

describe('index', () => {
  let index;

  beforeEach(() => {
    // Create a new instance of index before each test
    index = new index();
    
  });

  it('should return a set of professor names', () => {
    const professorNames = index.getInstructorsFromFile('./patriotWeb_scraper/spring24.json')
    expect(professorNames).toBeInstanceOf(Set);
  });

  it('should throw an error from incorrect path', () => {
    // Use a callback to test if a function throws an error
    expect(() => index.getInstructorsFromFile('./incorrectPath')).toThrow();
  });
  

});

describe('sortProfessorsGivenCourse', () => {
  it('should sort professors by highest average score', () => {
      const professorsMap = new Map([
          ['Professor A', 4.5],
          ['Professor B', 3.8],
          ['Professor C', -1],
          ['Professor D', 4.2],
          ['Professor E', -1],
      ]);

      const sortedProfessors = sortProfessorsGivenCourse(professorsMap);

      // Expect Professor A, D, B, C, E in that order
      expect(sortedProfessors).toEqual(['Professor A', 'Professor D', 'Professor B', 'Professor C', 'Professor E']);
  });
});