const index = require('./index');
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