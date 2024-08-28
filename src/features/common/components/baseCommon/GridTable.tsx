import React, { FC, ReactNode } from 'react';
/**
 * GridTable. p-grid 사용한 테이블
 * @param children
 * @constructor
 */
export interface GridTableProps {
  style?: React.CSSProperties;
  className?: string;
  /**
   * 그리드 타이틀
   */
  gridTitle?: string;
  /**
   * <p>그리드 타이틀과 함께 쓰입니다.</p>
   * <p><GridTable gridTitle={} gridTitleWithRight={}></p>
   */
  gridTitleWithRight?: any;
  children?: ReactNode;
}
const GridTable: FC<GridTableProps> = ({
  className,
  style,
  children,
  gridTitle,
  gridTitleWithRight,
}) => {
  const renderRightGridTitle = () => {
    if (gridTitleWithRight) {
      const isComponent = typeof gridTitleWithRight === 'function';
      if (isComponent) {
        const Component = gridTitleWithRight;
        return (
          <div className={'rightContent'}>
            <Component />
          </div>
        );
      } else {
        return <div className={'rightContent'}>{gridTitleWithRight}</div>;
      }
    }
    return null;
  };
  return (
    <div style={style} className={className ? className : ''}>
      {gridTitle && (
        <div className="smithGridTableTitleArea">
          <strong>{gridTitle}</strong>
          {renderRightGridTitle()}
        </div>
      )}
      <div className={`p-grid smithGridTable`}>{children}</div>
    </div>
  );
};

export default GridTable;
