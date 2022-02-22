import React from 'react';
import style from './tab.module.scss';

interface Props {
  activeTab: string;
  label: string;
  onClick: (tab: string) => void;
}

export default function Tab({ activeTab, label, onClick }: Props) {
  const onClickTab = () => {
    onClick(label);
  };

  let className = 'tab-list-item';

  if (activeTab === label) {
    className = 'tab-list-item--active';
  }

  return (
    <span className={style[className]} onClick={onClickTab}>
      {label}
    </span>
  );
}
