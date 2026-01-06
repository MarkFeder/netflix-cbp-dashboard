import { useState } from 'react';
import { Modal } from '@components/common/Modal';
import { Button } from '@components/common/Button';
import { GENRES, PRIORITY_LEVELS, PRODUCTION_STAGES } from '@utils/constants';
import { generateId } from '@utils/helpers';
import './AddProjectModal.css';

export function AddProjectModal({ isOpen, onClose, setProjects }) {
  const [formData, setFormData] = useState({
    title: '',
    genre: 'Drama',
    budget: '',
    priority: 'Medium',
    stage: PRODUCTION_STAGES.PITCH,
    releaseDate: '',
    progress: 0,
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newProject = {
      id: generateId(),
      ...formData,
      budget: `$${formData.budget}M`,
    };
    setProjects(prev => [...prev, newProject]);
    onClose();
    setFormData({
      title: '',
      genre: 'Drama',
      budget: '',
      priority: 'Medium',
      stage: PRODUCTION_STAGES.PITCH,
      releaseDate: '',
      progress: 0,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Project">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Project Title
          </label>
          <input
            id="title"
            className="form-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter project title"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="genre">
            Genre
          </label>
          <select id="genre" className="form-select" name="genre" value={formData.genre} onChange={handleChange}>
            {GENRES.map(genre => (
              <option key={genre}>{genre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="budget">
            Budget (in millions)
          </label>
          <input
            id="budget"
            className="form-input"
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            placeholder="25"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="priority">
            Priority
          </label>
          <select id="priority" className="form-select" name="priority" value={formData.priority} onChange={handleChange}>
            {PRIORITY_LEVELS.map(level => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="releaseDate">
            Release Date
          </label>
          <input
            id="releaseDate"
            className="form-input"
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" variant="primary" style={{ width: '100%' }}>
          Create Project
        </Button>
      </form>
    </Modal>
  );
}
