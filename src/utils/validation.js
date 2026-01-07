import { z } from 'zod';
import { GENRES, PRIORITY_LEVELS, PRODUCTION_STAGES } from './constants';

/**
 * Validation schema for project form
 */
export const projectSchema = z.object({
  title: z
    .string()
    .min(1, 'Project title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  genre: z.enum(GENRES, {
    errorMap: () => ({ message: 'Please select a valid genre' }),
  }),
  budget: z
    .number({
      required_error: 'Budget is required',
      invalid_type_error: 'Budget must be a number',
    })
    .min(1, 'Budget must be at least $1M')
    .max(500, 'Budget must be less than $500M'),
  priority: z.enum(PRIORITY_LEVELS, {
    errorMap: () => ({ message: 'Please select a valid priority' }),
  }),
  stage: z.enum(Object.values(PRODUCTION_STAGES), {
    errorMap: () => ({ message: 'Please select a valid stage' }),
  }),
  releaseDate: z
    .string()
    .min(1, 'Release date is required')
    .refine(
      date => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: 'Release date must be in the future' }
    ),
  progress: z
    .number()
    .min(0, 'Progress must be between 0 and 100')
    .max(100, 'Progress must be between 0 and 100'),
});

/**
 * Type for project form data (inferred from schema)
 * Usage: const data = projectSchema.parse(formData);
 */
