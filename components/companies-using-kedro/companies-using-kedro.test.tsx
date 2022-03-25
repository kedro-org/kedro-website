import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CompaniesUsingKedro from './index';

jest.useFakeTimers();

describe('Company using Kedro', () => {
  it('renders without crashing', () => {
    render(<CompaniesUsingKedro />);
  });

  it('works with list item animation', () => {
    render(<CompaniesUsingKedro />);
    const listItems = screen.getAllByRole('listitem');

    expect(listItems[2]).toHaveAttribute('class', 'active');

    jest.advanceTimersByTime(3000);

    expect(listItems[2]).toHaveAttribute('class', '');
    expect(listItems[3]).toHaveAttribute('class', 'active');
  });
});
