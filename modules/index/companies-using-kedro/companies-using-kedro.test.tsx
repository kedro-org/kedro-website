import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CompaniesUsingKedro from './index';

describe('CompaniesUsingKedro', () => {
  it('renders without crashing', () => {
    render(<CompaniesUsingKedro />);
  });

  it('displays the correct title text', () => {
    render(<CompaniesUsingKedro />);

    expect(screen.getByRole('titleText')).toHaveTextContent('Our community');
  });
});
