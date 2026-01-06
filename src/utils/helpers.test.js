import { describe, it, expect } from 'vitest';
import {
  calculateTotalBudget,
  getProjectsByStage,
  sortProjectsByDate,
  calculateStageDistribution,
  calculateBudgetByGenre,
  generateId,
} from './helpers';

describe('Helper Functions', () => {
  const mockProjects = [
    {
      id: 1,
      title: 'Project A',
      genre: 'Drama',
      budget: '$30M',
      stage: 'production',
      releaseDate: '2026-07-15',
    },
    {
      id: 2,
      title: 'Project B',
      genre: 'Sci-Fi',
      budget: '$25M',
      stage: 'production',
      releaseDate: '2026-05-20',
    },
    {
      id: 3,
      title: 'Project C',
      genre: 'Drama',
      budget: '$15M',
      stage: 'pre-production',
      releaseDate: '2026-09-10',
    },
  ];

  describe('calculateTotalBudget', () => {
    it('should calculate total budget correctly', () => {
      const total = calculateTotalBudget(mockProjects);
      expect(total).toBe('$70M');
    });

    it('should handle empty array', () => {
      const total = calculateTotalBudget([]);
      expect(total).toBe('$0M');
    });
  });

  describe('getProjectsByStage', () => {
    it('should filter projects by stage', () => {
      const projects = getProjectsByStage(mockProjects, 'production');
      expect(projects).toHaveLength(2);
      expect(projects[0].title).toBe('Project A');
    });

    it('should return empty array for non-existent stage', () => {
      const projects = getProjectsByStage(mockProjects, 'pitch');
      expect(projects).toHaveLength(0);
    });
  });

  describe('sortProjectsByDate', () => {
    it('should sort projects by release date', () => {
      const sorted = sortProjectsByDate(mockProjects);
      expect(sorted[0].title).toBe('Project B');
      expect(sorted[2].title).toBe('Project C');
    });
  });

  describe('calculateStageDistribution', () => {
    it('should calculate stage distribution', () => {
      const distribution = calculateStageDistribution(mockProjects);
      expect(distribution['production']).toBe(2);
      expect(distribution['pre-production']).toBe(1);
    });
  });

  describe('calculateBudgetByGenre', () => {
    it('should calculate budget by genre', () => {
      const budgetByGenre = calculateBudgetByGenre(mockProjects);
      expect(budgetByGenre['Drama']).toBe(45);
      expect(budgetByGenre['Sci-Fi']).toBe(25);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id2).toBeGreaterThan(id1);
    });
  });
});
