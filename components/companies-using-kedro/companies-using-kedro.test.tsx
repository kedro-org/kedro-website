import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CompaniesUsingKedro from './index';

describe('Company using Kedro', () => {
  it('renders without crashing', () => {
    render(<CompaniesUsingKedro />);
  });
});
