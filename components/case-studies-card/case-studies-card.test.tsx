import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CaseStudiesCard from './index';
import TelkonselLogo from '../../assets/logos/telkonsel';

describe('Use Case Card Details', () => {
  it('renders without crashing', () => {
    render(
      <CaseStudiesCard
        title="test title"
        text="text goes here"
        logo={TelkonselLogo}
        linkUrl="www.google.com"
        linkText="linkText"
      />
    );
  });

  it('displays the correct content in the use case card', () => {
    render(
      <CaseStudiesCard
        title="test title"
        text="text goes here"
        logo={TelkonselLogo}
        linkUrl="www.google.com"
        linkText="linkText"
      />
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'test title'
    );
    expect(screen.getByText('text goes here'));
    expect(screen.getByRole('button')).toHaveTextContent('linkText');
  });

  it("doesn't render a link if not provided", () => {
    render(
      <CaseStudiesCard
        title="test title"
        text="text goes here"
        logo={TelkonselLogo}
      />
    );

    const linkButton = screen.queryByText('linkText');
    expect(linkButton).not.toBeInTheDocument();
  });
});
