import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import FeatureDetails from './index';

describe('FeatureDetails', () => {
  it('renders without crashing', () => {
    render(
      <FeatureDetails
        buttonText="Explore Live Demo"
        linkDestination="https://demo.kedro.org/"
        subtitle="Subtitle text goes here"
        title="Pipeline visualisation"
      />
    );
  });

  it('displays the correct h3, p, and button text', () => {
    render(
      <FeatureDetails
        buttonText="Explore Live Demo"
        linkDestination="https://demo.kedro.org/"
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
      <FeatureDetails
        subtitle="Subtitle text goes here"
        title="Pipeline visualisation"
      />
    );

    const linkButton = screen.queryByText('Explore Live Demo');
    expect(linkButton).not.toBeInTheDocument();
  });
});
