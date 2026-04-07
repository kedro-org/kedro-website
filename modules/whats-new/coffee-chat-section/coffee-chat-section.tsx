import React from 'react';

import { coffeeChatData, coffeeChatPlaylistUrl, CoffeeChat } from './coffee-chat-data';
import { ContentCard } from '../content-card';

import style from './coffee-chat-section.module.scss';

const CoffeeChatSection = () => {
  return (
    <section className={style.section}>
      <div className={style.inner}>
        <h2 className={style.heading}>Coffee Chats</h2>
        <p className={style.subtitle}>Biweekly live demos where the team showcases new features and answers your questions.</p>
        <div className={style.grid}>
          {coffeeChatData.map((chat: CoffeeChat) => (
            <ContentCard
              key={chat.youtubeUrl}
              date={chat.date}
              title={chat.title}
              description={chat.description}
              linkUrl={chat.youtubeUrl}
              linkText="Watch on YouTube"
              isExternal
            />
          ))}
        </div>
        {coffeeChatPlaylistUrl && (
          <div className={style.browseAll}>
            <a
              href={coffeeChatPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={style.browseAllLink}
            >
              Browse all Coffee Chats on YouTube &rarr;
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoffeeChatSection;
