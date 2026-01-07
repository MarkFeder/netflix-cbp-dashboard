import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@components/common/Modal';
import { Button } from '@components/common/Button';
import { GENRES, PRIORITY_LEVELS, PRODUCTION_STAGES } from '@utils/constants';
import { generateId } from '@utils/helpers';
import { projectSchema } from '@utils/validation';
import './AddProjectModal.css';

export function AddProjectModal({ isOpen, onClose, setProjects }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      genre: 'Drama',
      budget: '',
      priority: 'Medium',
      stage: PRODUCTION_STAGES.PITCH,
      releaseDate: '',
      progress: 0,
    },
  });

  const onSubmit = data => {
    const newProject = {
      id: generateId(),
      ...data,
      budget: `$${data.budget}M`,
    };
    setProjects(prev => [...prev, newProject]);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Project">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Project Title *
          </label>
          <input
            id="title"
            className={`form-input ${errors.title ? 'form-input--error' : ''}`}
            type="text"
            placeholder="Enter project title"
            {...register('title')}
          />
          {errors.title && <span className="form-error">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="genre">
            Genre *
          </label>
          <select
            id="genre"
            className={`form-select ${errors.genre ? 'form-input--error' : ''}`}
            {...register('genre')}
          >
            {GENRES.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && <span className="form-error">{errors.genre.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="budget">
            Budget (in millions) *
          </label>
          <input
            id="budget"
            className={`form-input ${errors.budget ? 'form-input--error' : ''}`}
            type="number"
            placeholder="25"
            {...register('budget', { valueAsNumber: true })}
          />
          {errors.budget && <span className="form-error">{errors.budget.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="priority">
            Priority *
          </label>
          <select
            id="priority"
            className={`form-select ${errors.priority ? 'form-input--error' : ''}`}
            {...register('priority')}
          >
            {PRIORITY_LEVELS.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.priority && <span className="form-error">{errors.priority.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="releaseDate">
            Release Date *
          </label>
          <input
            id="releaseDate"
            className={`form-input ${errors.releaseDate ? 'form-input--error' : ''}`}
            type="date"
            {...register('releaseDate')}
          />
          {errors.releaseDate && <span className="form-error">{errors.releaseDate.message}</span>}
        </div>

        <Button type="submit" variant="primary" style={{ width: '100%' }} disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </Button>
      </form>
    </Modal>
  );
}
