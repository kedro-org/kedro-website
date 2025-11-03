import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import KedroExplainer from './index';

describe('KedroExplainer', () => {
  it('renders without crashing', () => {
    render(<KedroExplainer />);
  });

  it('displays the correct h3 text', () => {
    render(<KedroExplainer />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Kedro\'s Key Concepts Explained →'
    );
  });

  it('renders video element with correct attributes', () => {
    const { container } = render(<KedroExplainer />);

    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('poster', '/images/kedro-explainer-poster.jpeg');
  });
});
