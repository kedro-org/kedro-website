import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Hero from './index';

describe('Hero', () => {
  it('renders without crashing', () => {
    render(<Hero />);
  });

  it('displays the correct h1 text', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Maintainabledata science solved'
    );
  });

  it('displays the correct h2 text', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Kedro is a toolbox for production-ready data science.'
    );
  });
});
