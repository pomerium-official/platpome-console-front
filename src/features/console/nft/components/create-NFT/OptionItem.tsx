import React from 'react';

interface OptionItemProps {
  name?: string;
  info?: string;
  rightContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  style?: React.CSSProperties;
}

const OptionItem = ({
  name,
  info,
  rightContent,
  bottomContent,
  style,
}: OptionItemProps) => {
  return (
    <div className={`optionItem`} style={style}>
      <div>
        <dl>
          <dt>{name}</dt>
          <dd>{info}</dd>
        </dl>
        <div className="right">{rightContent}</div>
      </div>
      {bottomContent && <div className="bottom">{bottomContent}</div>}
    </div>
  );
};

export default OptionItem;
