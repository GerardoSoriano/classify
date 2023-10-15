const Professor = require('./Professor');
const { describe, it, expect } = require('@jest/globals');

describe('Professor', () => {
  let professor;

  beforeEach(() => {
    // Create a new instance of Professor before each test
    professor = new Professor('John', 'Doe', new Map([['Math', 4.5], ['Physics', 3.8]]), 4.2);
  });

  it('should initialize with the provided values', () => {
    expect(professor.getFirstName()).toBe('John');
    expect(professor.getLastName()).toBe('Doe');
    expect(professor.getClassesTaughtAndScore().get('Math')).toBe(4.5);
    expect(professor.getClassesTaughtAndScore().get('Physics')).toBe(3.8);
    expect(professor._rateMyProfessorScore).toBe(4.2); // Not ideal, but checking for illustration
  });

  it('should add a class and score', () => {
    professor.addClassTaught('Chemistry', 3.9);
    expect(professor.getClassesTaughtAndScore().get('Chemistry')).toBe(3.9);
  });

  it('should clear classes taught and score', () => {
    professor.clearClassesTaughtAndScore();
    expect(professor.getClassesTaughtAndScore().size).toBe(0);
  });

  it('should update first and last name', () => {
    professor.setFirstName('Jane');
    professor.setLastName('Smith');
    expect(professor.getFirstName()).toBe('Jane');
    expect(professor.getLastName()).toBe('Smith');
  });

  it('should set classes taught and score', () => {
    professor.setClassesTaughtAndScore(new Map([['Biology', 4.1]]));
    expect(professor.getClassesTaughtAndScore().get('Biology')).toBe(4.1);
  });
});