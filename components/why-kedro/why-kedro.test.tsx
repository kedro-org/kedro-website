import React from 'react';
import { render } from '@testing-library/react';
import WhyKedro from './index';
import '@testing-library/jest-dom';

describe('WhyKedro', () => {
  it('renders without crashing', () => {
    render(<WhyKedro />);
  });
});
