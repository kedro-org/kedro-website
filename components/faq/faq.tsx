import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from './faq-content';

import style from './faq.module.scss';

export interface FaqContent {
  title: string;
  items: {
    question: string;
    answer: string;
    code?: string;
  }[];
}

export default function FAQ() {
  return (
    <section className={style.outer}>
      <OnThisPage data={faqs} />
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
                  <a href={`#${prettifyQuestion(item.question)}`}>
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
          handleClick(e, title, true);
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

type OnThisPageProps = {
  data: FaqContent[];
};

const OnThisPage = ({ data }: OnThisPageProps) => {
  return (
    <div className={style.onThisPage}>
      <h4>ON THIS PAGE</h4>
      {data.map((section) => {
        return (
          <span key={section.title}>
            <a href={`#${lowercaseFirstLetter(section.title)}`}>
              {section.title}
            </a>
          </span>
        );
      })}
    </div>
  );
};

const handleClick = (
  e: React.MouseEvent,
  target: string,
  preventDefault: boolean
) => {
  if (preventDefault) {
    e.preventDefault();
  }

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
