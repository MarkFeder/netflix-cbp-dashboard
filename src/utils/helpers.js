import { format, parseISO } from 'date-fns';

/**
 * Format a date string for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = dateString => {
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  } catch (error) {
    console.error('Invalid date:', dateString);
    return dateString;
  }
};

/**
 * Calculate total budget from projects
 * @param {Array} projects - Array of project objects
 * @returns {number} Total budget in millions
 */
export const calculateTotalBudget = projects => {
  return projects.reduce((sum, project) => {
    const budget = parseInt(project.budget.replace(/[$M]/g, ''), 10);
    return sum + (isNaN(budget) ? 0 : budget);
  }, 0);
};

/**
 * Get projects by stage
 * @param {Array} projects - Array of project objects
 * @param {string} stage - Production stage
 * @returns {Array} Filtered projects
 */
export const getProjectsByStage = (projects, stage) => {
  return projects.filter(project => project.stage === stage);
};

/**
 * Sort projects by date
 * @param {Array} projects - Array of project objects
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted projects
 */
export const sortProjectsByDate = (projects, order = 'asc') => {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Group projects by property
 * @param {Array} projects - Array of project objects
 * @param {string} property - Property to group by
 * @returns {Object} Grouped projects
 */
export const groupProjectsBy = (projects, property) => {
  return projects.reduce((acc, project) => {
    const key = project[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(project);
    return acc;
  }, {});
};

/**
 * Calculate stage distribution
 * @param {Array} projects - Array of project objects
 * @returns {Object} Stage distribution
 */
export const calculateStageDistribution = projects => {
  return projects.reduce((acc, project) => {
    acc[project.stage] = (acc[project.stage] || 0) + 1;
    return acc;
  }, {});
};

/**
 * Calculate budget by genre
 * @param {Array} projects - Array of project objects
 * @returns {Object} Budget distribution by genre
 */
export const calculateBudgetByGenre = projects => {
  return projects.reduce((acc, project) => {
    const budget = parseInt(project.budget.replace(/[$M]/g, ''), 10);
    acc[project.genre] = (acc[project.genre] || 0) + (isNaN(budget) ? 0 : budget);
    return acc;
  }, {});
};

/**
 * Generate unique ID
 * @returns {number} Unique ID
 */
export const generateId = () => {
  return Date.now() + Math.random();
};

/**
 * Classname utility (similar to clsx)
 * @param  {...any} classes - Class names or conditionals
 * @returns {string} Combined class names
 */
export const cn = (...classes) => {
  return classes.flat().filter(Boolean).join(' ');
};
