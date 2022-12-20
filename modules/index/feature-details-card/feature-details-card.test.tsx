import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import FeatureDetailsCard from './index';

describe('FeatureDetails', () => {
  it('renders without crashing', () => {
    render(
      <FeatureDetailsCard
        buttonText="Explore Live Demo"
        subtitle="Subtitle text goes here"
        title="Pipeline visualisation"
      />
    );
  });

  it('displays the correct h3, p, and button text', () => {
    render(
      <FeatureDetailsCard
        buttonText="Explore Live Demo"
        subtitle="Subtitle text goes here"
        title="Pipeline visualisation"
      />
    );

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Pipeline visualisation'
    );
    expect(screen.getByText('Subtitle text goes here'));
    expect(screen.getByRole('button')).toHaveTextContent('Explore Live Demo');
  });

  it("doesn't render a button", () => {
    render(
      <FeatureDetailsCard
        subtitle="Subtitle text goes here"
        title="Pipeline visualisation"
      />
    );

    const linkButton = screen.queryByText('Explore Live Demo');
    expect(linkButton).not.toBeInTheDocument();
  });
});
