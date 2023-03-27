import React from 'react';
import {
  fireEvent,
  getAllByRole,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from './index';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
  });

  it('displays the correct h4 text', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Kedro'
    );
  });

  it('displays the correct number of links', async () => {
    render(<Header />);

    expect(screen.getAllByRole('link')).toHaveLength(7);
  });

  it('opens and closes the menu when burger/close icon clicked', async () => {
    const { container } = render(<Header />);

    const button = container.querySelector('.burger');

    //Open the menu
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-label', 'open');

    //Close the menu
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-label', 'close');
  });
});
