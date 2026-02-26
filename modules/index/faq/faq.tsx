/* eslint-disable react/no-children-prop */

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { faqContent } from './faq-content';

import style from './faq.module.scss';

export interface FaqContent {
  answer: string;
  question: string;
}

export default function FAQ() {
  const [expandedArray, setExpandedArray] = useState(
    faqContent.map((_, i) => (i === 0 ? true : false))
  );
  const [areAllExpanded, setAreAllExpanded] = useState(false);

  const toggleAccordion = (selectedIndex: number) => {
    setExpandedArray(
      expandedArray.map((item, i) => (selectedIndex === i ? !item : item))
    );
  };

  const toggleExpandAll = () => {
    if (areAllExpanded) {
      setExpandedArray(expandedArray.map((item) => (item = false)));
    } else {
      setExpandedArray(expandedArray.map((item) => (item = true)));
    }
  };

  useEffect(() => {
    setAreAllExpanded(expandedArray.every((item) => item === true));
  }, [expandedArray]);

  return (
    <section className={style.outer} id="faq">
      <div className={style.inner}>
        <div className={style.sticky}>
          <h3>FAQs</h3>
          <p>
            You can find the{' '}
            <a href="https://kedro-org.slack.com/join/shared_invite/zt-3mloycxx0-8uXHeLkYOJgWSf5865WKTw#/shared-invite/email" target="_blank" rel="noreferrer">
              Kedro community on Slack
            </a>
            .
          </p>
          <p>
            We also maintain a list of extensions, plugins, articles, podcasts,
            talks, and Kedro showcase projects in the{' '}
            <a
              href="https://github.com/kedro-org/awesome-kedro"
              target="_blank"
              rel="noreferrer"
            >
              awesome-kedro
            </a>{' '}
            repository.
          </p>
        </div>
        <div className={style.questions}>
          <div className={style.toggleAll} onClick={toggleExpandAll}>
            {areAllExpanded ? 'Collapse all' : 'Expand all'}
          </div>
          {faqContent.map((topic, index) => (
            <React.Fragment key={topic.question}>
              <hr />
              <div className={style.accordionWrapper} key={topic.question}>
                <Accordion
                  index={index}
                  isExpanded={expandedArray[index]}
                  title={topic.question}
                  toggleAccordion={toggleAccordion}
                >
                  <div className={style.answer}>
                    <ReactMarkdown
                      children={topic.answer}
                      linkTarget="_blank"
                    />
                  </div>
                </Accordion>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

type AccordionProps = {
  children: JSX.Element;
  index: number;
  isExpanded: boolean;
  title: string;
  toggleAccordion: (index: number) => void;
};

const Accordion = ({
  children,
  index,
  isExpanded,
  title,
  toggleAccordion,
}: AccordionProps) => {
  return (
    <>
      <motion.div
        className={style.accordionHeader}
        initial={false}
        onClick={() => {
          toggleAccordion(index);
        }}
      >
        <h4>{title}</h4>
        <svg
          fill="none"
          height="20"
          style={{
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.175s ease',
          }}
          viewBox="0 0 16 20"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M0 8L8 0L16 8L14.5 9.5L9 4L9 20H7L7 4L1.5 9.5L0 8Z"
            fillRule="evenodd"
          />
        </svg>
      </motion.div>
      <AnimatePresence initial={false}>
        {isExpanded && (
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
