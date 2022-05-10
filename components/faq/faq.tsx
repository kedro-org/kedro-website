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
                  <h4 className={style.question}>{item.question}</h4>
                  <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                  {item.code && (
                    <pre>
                      <code>{item.code}</code>
                    </pre>
                  )}
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <button className={style.button}>Learn more</button>
                  </a>
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
      <motion.h3
        className={style.accordionHeader}
        initial={false}
        onClick={() => setExpanded(!expanded)}
      >
        {title}
      </motion.h3>
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
