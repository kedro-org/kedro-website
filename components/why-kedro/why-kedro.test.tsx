import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import WhyKedro from './index';

describe('WhyKedro', () => {
  it('renders without crashing', () => {
    render(<WhyKedro />);
  });

  it('displays the correct h3 text', () => {
    render(<WhyKedro />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Why Kedro?'
    );
  });

  it('moves to the correct tab and displays the content', async () => {
    render(<WhyKedro />);

    const tab = screen.getByText('Production-Ready');
    fireEvent.click(tab);

    expect(tab).toHaveAttribute('aria-selected', 'true');
  });
});
