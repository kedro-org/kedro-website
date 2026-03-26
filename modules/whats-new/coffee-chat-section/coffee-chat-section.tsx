import React from 'react';

import { coffeeChatData, coffeeChatPlaylistUrl, CoffeeChat } from './coffee-chat-data';

import style from './coffee-chat-section.module.scss';

const CoffeeChatSection = () => {
  return (
    <section className={style.section}>
      <div className={style.inner}>
        <h2 className={style.heading}>Coffee Chats</h2>
        <div className={style.grid}>
          {coffeeChatData.map((chat: CoffeeChat) => (
            <div key={chat.youtubeUrl} className={style.card}>
              <p className={style.date}>{chat.date}</p>
              <h3 className={style.cardTitle}>
                <a
                  href={chat.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.cardTitleLink}
                >
                  {chat.title}
                </a>
              </h3>
              <p className={style.description}>{chat.description}</p>
              <a
                href={chat.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={style.watchLink}
              >
                Watch on YouTube &rarr;
              </a>
            </div>
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
