import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
