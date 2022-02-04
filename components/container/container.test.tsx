import React from 'react';
import { render, screen } from '@testing-library/react'
import Container from './index';
import '@testing-library/jest-dom'

describe('Container', () => {
  it('renders without crashing', () => {
    render(<Container />)
    expect(screen.getByRole('heading')).toHaveTextContent('Hello World')
  });
});
