import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders card with title and children', () => {
    render(
      <Card title="Test Card">
        <p>Card Content</p>
      </Card>
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(
      <Card title="Test Card" badge="New">
        <p>Content</p>
      </Card>
    );

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders without title', () => {
    render(
      <Card>
        <p>Content Only</p>
      </Card>
    );

    expect(screen.getByText('Content Only')).toBeInTheDocument();
  });
});
