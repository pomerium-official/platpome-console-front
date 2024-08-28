import React, { FC, ReactNode, useMemo } from 'react';

export interface GridTableRowSpanProps {
  rowTitle?: React.ReactNode;
  rowTitleWidth?: number;
  /**
   * <p>rowspan 제목영역 가로 정렬</p>
   * <p>left, center, right - 기본값은 center</p>
   */
  rowTitleAlign?: 'center' | 'left' | 'right';
  /**
   * <p>rowspan 제목영역 세로 정렬</p>
   * <p>top, center, bottom - 기본값은 center</p>
   */
  rowTitleVAlign?: 'center' | 'top' | 'bottom';
  rowTitleStyle?: React.CSSProperties;
  children?: ReactNode;
}

/**
 * GridTableRowSpan props
 * @param children
 * @param rowTitle
 * @param rowTitleWidth
 * @param rowTitleAlign
 * @param rowTitleVAlign
 * @constructor
 */

const GridTableRowSpan: FC<GridTableRowSpanProps> = ({
  children,
  rowTitle = '',
  rowTitleWidth,
  rowTitleAlign = 'center',
  rowTitleVAlign = 'center',
}) => {
  const _rowTitleAlign = useMemo(() => {
    switch (rowTitleAlign) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      case 'left':
        return 'flex-start';
    }
  }, [rowTitleAlign]);

  const _rowTitleVAlign = useMemo(() => {
    switch (rowTitleVAlign) {
      case 'center':
        return 'center';
      case 'bottom':
        return 'flex-end';
      case 'top':
        return 'flex-start';
    }
  }, [rowTitleVAlign]);
  return (
    <>
      <div className="rowspanWrap">
        <strong
          className="rowTitle"
          style={{
            flex: `0 0 ${rowTitleWidth && rowTitleWidth}px`,
            justifyContent: `${_rowTitleAlign}`,
            alignItems: `${_rowTitleVAlign}`,
          }}
        >
          {rowTitle}
        </strong>
        <div className="row">{children}</div>
      </div>
    </>
  );
};

export default GridTableRowSpan;
