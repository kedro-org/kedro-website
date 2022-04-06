import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { testimonials } from './testimonial-content';

import Testimonials from './index';

describe('Testimonials', () => {
  it('renders without crashing', () => {
    render(<Testimonials />);
  });

  it('renders three carousel navigation dots, one with an active class', () => {
    render(<Testimonials />);

    const carouselNavigation = screen.getByLabelText('carousel-nav');

    expect(carouselNavigation.children).toHaveLength(4);
    expect(
      carouselNavigation.firstElementChild.classList.contains('active')
    ).toBe(true);
  });

  it('renders the second and third carousel slides', async () => {
    let index = 0;
    render(<Testimonials />);

    const carouselNavigation = screen.getByLabelText('carousel-nav');
    const secondDot = carouselNavigation.children[1];
    const thirdDot = carouselNavigation.children[2];

    fireEvent.click(secondDot);
    index++;

    expect(
      screen.getAllByRole('heading', { level: 4 })[index]
    ).toHaveTextContent(testimonials[index].headline);

    fireEvent.click(thirdDot);
    index++;

    expect(
      screen.getAllByRole('heading', { level: 4 })[index]
    ).toHaveTextContent(testimonials[index].headline);
  });
});
