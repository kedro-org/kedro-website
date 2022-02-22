import React, { useState, ReactChildren, ReactChild } from 'react';
import Tab from '../tab/tab';
import style from './tabs.module.scss';

type ChildrenProps = {
  'data-label': string;
  children: React.ReactNode;
};

type Children = {
  type: string;
  key?: null;
  ref?: null;
  props: ChildrenProps;
  _owner?: null;
  _store?: {};
};
interface Props {
  children: Children[];
}

export default function Tabs({ children }: Props) {
  const [activeTab, setActiveTab] = useState(children[0].props['data-label']);

  const onClickTabItem = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={style['tabs']}>
      <div className={style['tab-header']}>
        <div className={style['tab-list']}>
          {children.map((child) => {
            const label = child.props['data-label'];
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </div>
        <div className={style['indicator']}></div>
      </div>
      <div className={style['tab-content']}>
        {children.map((child) => {
          if (child.props['data-label'] !== activeTab) {return undefined;}
          return child.props.children;
        })}
      </div>
    </div>
  );
}
