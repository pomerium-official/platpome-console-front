import React, { useEffect, useState } from 'react';
import styles from './Accordion.module.scss';

export interface AccordionItemType {
  title?: React.ReactNode;
  content?: React.ReactNode;
  open?: boolean;
  openAction?: () => void;
}
interface AccordionProps {
  items?: AccordionItemType[];
  style?: React.CSSProperties;
  className?: string;
}

const Accordion = ({ items, style, className }: AccordionProps) => {
  const [listItems, setListItems] = useState<AccordionItemType[]>();

  useEffect(() => {
    setListItems(items);
  }, [items]);

  return (
    <div
      className={`accordion ${styles.accordion}${
        className ? ` ${className}` : ''
      }`}
      style={style}
    >
      {listItems?.map((v, i) => {
        return (
          <dl className={v.open ? 'open' : ''} key={`${v.title}${i}`}>
            <dt>
              <button
                onClick={() => {
                  v.openAction
                    ? v.openAction()
                    : setListItems((prev) => {
                        return prev?.map((w, j) => {
                          if (i === j) {
                            return { ...w, open: !w.open };
                          } else {
                            return { ...w };
                          }
                        });
                      });
                }}
              >
                <div>{v.title}</div>
              </button>
            </dt>
            <dd>{v.content}</dd>
          </dl>
        );
      })}
    </div>
  );
};

export default Accordion;
