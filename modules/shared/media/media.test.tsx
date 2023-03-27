import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Media from './index';

describe('Media', () => {
  it('renders without crashing', () => {
    render(<Media />);
  });

  it('displays the video element', () => {
    render(
      <Media poster="/images/intro-poster.jpg" video="/videos/kedro.mp4" />
    );

    expect(
      screen.getByText(/Sorry, your browser doesn't support embedded videos./i)
    ).toBeInTheDocument();
  });
});
