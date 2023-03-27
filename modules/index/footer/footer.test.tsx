import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from './index';

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });

  it('displays the correct h4 text', () => {
    render(<Footer />);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Kedro'
    );
  });

  it('displays the correct number of links', async () => {
    render(<Footer />);

    expect(screen.getAllByRole('link')).toHaveLength(10);
  });
});
