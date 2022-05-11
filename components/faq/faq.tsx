import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from './faq-content';

import style from './faq.module.scss';

export default function FAQ() {
  return (
    <section className={style.outer}>
      <div className={style.titleWrapper}>
        <h1 className={style.title}>FAQ</h1>
        <h2 className={style.subtitle}>
          Frequently asked questions about Kedro and Kedro-Viz
        </h2>
      </div>
      {faqs.map((topics) => (
        <div className={style.accordionWrapper} key={topics.title}>
          <Accordion title={topics.title}>
            {topics.items.map((item: any) => {
              return (
                <div className={style.questionWrapper} key={item.question}>
                  <a onClick={(e) => handleClick(e, item.question)}>
                    <h4
                      className={style.question}
                      id={prettifyQuestion(item.question)}
                    >
                      {item.question}
                    </h4>
                  </a>
                  <p
                    className={style.answer}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                  {item.code && (
                    <pre>
                      <code>{item.code}</code>
                    </pre>
                  )}
                  {/* <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <button className={style.button}>Learn more</button>
                  </a> */}
                </div>
              );
            })}
          </Accordion>
        </div>
      ))}
    </section>
  );
}

type AccordionProps = {
  children: JSX.Element[];
  title: string;
};

const Accordion = ({ children, title }: AccordionProps) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <>
      <motion.a
        className={style.accordionHeader}
        id={lowercaseFirstLetter(title)}
        initial={false}
        onClick={(e) => {
          setExpanded(!expanded);
          handleClick(e, title);
        }}
      >
        <h3>{title}</h3>
        <svg
          height="14"
          style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
          width="14"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.591 11.008L8 5.417l-5.591 5.591A1 1 0 0 1 .993 9.593l6.3-6.3a1 1 0 0 1 1.414 0l6.3 6.3a1 1 0 0 1-1.416 1.415z"
            fillRule="evenodd"
          ></path>
        </svg>
      </motion.a>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.section
            animate="open"
            exit="collapsed"
            initial="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

const handleClick = (e: React.MouseEvent, target: string) => {
  e.preventDefault();

  history.replaceState(
    {},
    '',
    window.location.pathname + '#' + prettifyQuestion(target)
  );
};

const lowercaseFirstLetter = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

const prettifyQuestion = (question: string) => {
  const combined = question.replace(/ /g, '-');

  return lowercaseFirstLetter(combined.replace('?', ''));
};
