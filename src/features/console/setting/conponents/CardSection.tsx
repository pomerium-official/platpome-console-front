import React from 'react';
import styles from './CardSection.module.scss';

interface CardSectionProps {
  style?: React.CSSProperties;
  className?: string;
  title?: React.ReactNode;
  headerRight?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

const CardSection = ({
  style,
  className,
  title,
  headerRight,
  body,
  footer,
}: CardSectionProps) => {
  return (
    <div
      className={`cardSection ${styles.cardSection}${
        className ? ` ${className}` : ''
      }`}
      style={style}
    >
      <div className="sectionHeader">
        <h2 className="sectionTitle">{title}</h2>
        <div className="headerRight">{headerRight}</div>
      </div>
      <div className="sectionBody">{body}</div>
      {footer && <div className="sectionFooter">{footer}</div>}
    </div>
  );
};

export default CardSection;
