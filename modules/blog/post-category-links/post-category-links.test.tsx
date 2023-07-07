import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PostCategoryLinks from './index';

describe('FeatureDetails', () => {
  it('renders without crashing', () => {
    render(<PostCategoryLinks categories="Kedro deployment" />);
  });

  it('renders when there are no categories', () => {
    render(<PostCategoryLinks categories="" />);
  });
});
