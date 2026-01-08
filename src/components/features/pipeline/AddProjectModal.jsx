import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@components/common/Modal';
import { Button } from '@components/common/Button';
import { GENRES, PRIORITY_LEVELS, PRODUCTION_STAGES } from '@utils/constants';
import { generateId } from '@utils/helpers';
import { projectSchema } from '@utils/validation';
import './AddProjectModal.css';

const FORM_DEFAULTS = {
  title: '',
  genre: 'Drama',
  budget: '',
  priority: 'Medium',
  stage: PRODUCTION_STAGES.PITCH,
  releaseDate: '',
  progress: 0,
};

/**
 * FormError - Displays form validation error message
 */
function FormError({ message }) {
  if (!message) return null;
  return <span className="form-error">{message}</span>;
}

/**
 * FormInput - Text or number input field with label and error handling
 */
function FormInput({ id, label, type, placeholder, register, error }) {
  const inputClass = `form-input ${error ? 'form-input--error' : ''}`;
  const registerOptions = type === 'number' ? { valueAsNumber: true } : {};

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label} *
      </label>
      <input
        id={id}
        className={inputClass}
        type={type}
        placeholder={placeholder}
        {...register(id, registerOptions)}
      />
      <FormError message={error?.message} />
    </div>
  );
}

/**
 * FormSelect - Select dropdown field with label and error handling
 */
function FormSelect({ id, label, options, register, error }) {
  const selectClass = `form-select ${error ? 'form-input--error' : ''}`;

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label} *
      </label>
      <select id={id} className={selectClass} {...register(id)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FormError message={error?.message} />
    </div>
  );
}

/**
 * AddProjectModal - Modal for creating new projects
 *
 * Displays a form with validation for adding new projects to the pipeline.
 * All fields are required and validated using Zod schema.
 *
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Handler to close the modal
 * @param {Function} setProjects - State setter to add new project
 */
export const AddProjectModal = memo(function AddProjectModal({ isOpen, onClose, setProjects }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: FORM_DEFAULTS,
  });

  const onSubmit = useCallback(
    (data) => {
      const newProject = {
        id: generateId(),
        ...data,
        budget: `$${data.budget}M`,
      };
      setProjects((prev) => [...prev, newProject]);
      reset();
      onClose();
    },
    [setProjects, reset, onClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Project">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          id="title"
          label="Project Title"
          type="text"
          placeholder="Enter project title"
          register={register}
          error={errors.title}
        />

        <FormSelect
          id="genre"
          label="Genre"
          options={GENRES}
          register={register}
          error={errors.genre}
        />

        <FormInput
          id="budget"
          label="Budget (in millions)"
          type="number"
          placeholder="25"
          register={register}
          error={errors.budget}
        />

        <FormSelect
          id="priority"
          label="Priority"
          options={PRIORITY_LEVELS}
          register={register}
          error={errors.priority}
        />

        <FormInput
          id="releaseDate"
          label="Release Date"
          type="date"
          register={register}
          error={errors.releaseDate}
        />

        <Button type="submit" variant="primary" style={{ width: '100%' }} disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </Button>
      </form>
    </Modal>
  );
});
