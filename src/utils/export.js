/**
 * Export utilities for project data
 */

/**
 * Convert projects to CSV format
 * @param {Array} projects - Array of project objects
 * @returns {string} CSV formatted string
 */
export const exportToCSV = (projects) => {
  if (!projects || projects.length === 0) {
    return '';
  }

  const headers = ['ID', 'Title', 'Genre', 'Budget', 'Priority', 'Stage', 'Release Date', 'Progress'];
  const rows = projects.map((project) => [
    project.id,
    `"${project.title}"`,
    project.genre,
    project.budget,
    project.priority,
    project.stage,
    project.releaseDate,
    project.progress,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  return csvContent;
};

/**
 * Download data as a file
 * @param {string} content - File content
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
export const downloadFile = (content, filename, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export projects as CSV file
 * @param {Array} projects - Array of project objects
 */
export const exportProjectsAsCSV = (projects) => {
  const csvContent = exportToCSV(projects);
  const timestamp = new Date().toISOString().split('T')[0];
  downloadFile(csvContent, `netflix-projects-${timestamp}.csv`, 'text/csv');
};

/**
 * Export projects as JSON file
 * @param {Array} projects - Array of project objects
 */
export const exportProjectsAsJSON = (projects) => {
  const jsonContent = JSON.stringify(projects, null, 2);
  const timestamp = new Date().toISOString().split('T')[0];
  downloadFile(jsonContent, `netflix-projects-${timestamp}.json`, 'application/json');
};
