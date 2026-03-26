import React from 'react';
import classNames from 'classnames';

import style from './filter-bar.module.scss';

export type FilterValue = 'all' | 'coffee-chats' | 'blogs' | 'demos';

interface FilterBarProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

const filters: { label: string; value: FilterValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'Coffee Chats', value: 'coffee-chats' },
  { label: 'Blogs', value: 'blogs' },
  { label: 'Demos', value: 'demos' },
];

const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  return (
    <div className={style.filterBar} role="group" aria-label="Filter content">
      {filters.map(({ label, value }) => {
        const isActive = activeFilter === value;
        return (
          <button
            key={value}
            className={classNames(style.filterButton, {
              [style.filterButtonActive]: isActive,
            })}
            aria-pressed={isActive}
            onClick={() => onFilterChange(value)}
          >
            <span
              className={classNames(style.dot, {
                [style.dotActive]: isActive,
              })}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
