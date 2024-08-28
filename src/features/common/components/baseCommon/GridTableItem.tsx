import React, { FC, ReactNode, useMemo } from 'react';
export interface GridTableItemProps {
  /**
   * 제목
   */
  title?: React.ReactNode;

  /**
   * <p>p-col-*, p-md-6, p-lg-4 등 그리드 클래스</p>
   * <p>클래스의 의미</p>
   * <p>ex) p-col-3 : 기본 col 4열 (12/3)</p>
   * <p>ex) p-md-6 : md 사이즈일 때 50% (12/6)</p>
   * <p>ex) p-lg-4 : lg 사이즈일 때 30% (12/4)</p>
   * <p>화면 사이즈 상관 없이 항상 같은 갯수의 열로 보이고 싶은 경우 'p-col-숫자'</p>
   * <p>그냥 자동으로 조절 되도록 하고 싶으면 클래스 안쓰면 됩니다.</p>
   */
  className?: string;

  /**
   * <p>제목영역 가로 정렬</p>
   * <p>left, center, right - 기본값은 left</p>
   */
  thAlign?: 'left' | 'center' | 'right';
  /**
   * <p>내용영역 가로 정렬</p>
   * <p>left, center, right - 기본값은 left</p>
   */
  tdAlign?: 'left' | 'center' | 'right';
  /**
   * <p>제목영역 세로 정렬</p>
   * <p>top, center, bottom - 기본값은 center</p>
   */
  thVAlign?: 'top' | 'center' | 'bottom';
  /**
   * <p>내용영역 세로 정렬</p>
   * <p>top, center, bottom - 기본값은 center</p>
   */
  tdVAlign?: 'top' | 'center' | 'bottom';
  /**
   * 제목에 필수 표시 right
   */
  required?: 'left' | 'right';
  /**
   * th width - default : 120px
   */
  thWidth?: number;
  /**
   * td flex-direction
   */
  thFlexDirection?: 'column' | 'row';
  /**
   * td flex-direction
   */
  tdFlexDirection?: 'column' | 'row';

  children?: ReactNode;
}

/**
 * GridTable Item. p-grid를 사용하여 반응형 클래스를 사용할 수 있는 아이템
 * @param className
 * @param title
 * @param children
 * @param thAlign
 * @param tdAlign
 * @param thVAlign
 * @param tdVAlign
 * @param thFlexDirection
 * @param tdFlexDirection
 * @constructor
 */
const GridTableItem: FC<GridTableItemProps> = ({
  className = 'p-col',
  title = '',
  children,
  thAlign = 'left',
  tdAlign = 'left',
  thVAlign = 'center',
  tdVAlign = 'center',
  required,
  thWidth,
  thFlexDirection,
  tdFlexDirection,
}) => {
  const _thAlign = useMemo(() => {
    switch (thAlign) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      case 'left':
        return 'flex-start';
    }
  }, [thAlign]);

  const _tdAlign = useMemo(() => {
    switch (tdAlign) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      case 'left':
        return 'flex-start';
    }
  }, [tdAlign]);

  const _thVAlign = useMemo(() => {
    switch (thVAlign) {
      case 'center':
        return 'center';
      case 'bottom':
        return 'flex-end';
      case 'top':
        return 'flex-start';
    }
  }, [thVAlign]);

  const _tdVAlign = useMemo(() => {
    switch (tdVAlign) {
      case 'center':
        return 'center';
      case 'bottom':
        return 'flex-end';
      case 'top':
        return 'flex-start';
    }
  }, [tdVAlign]);

  return (
    <div className={className}>
      <dl className="gridDl">
        <dt
          style={{
            justifyContent: _thAlign,
            alignItems: _thVAlign,
            flex: `0 0 ${thWidth ? thWidth : ''}px`,
            flexDirection: `${
              thFlexDirection ? `${thFlexDirection}` : 'row'
            }` as any,
          }}
        >
          {required === 'left' && <i className="must">*</i>}
          {title} {required === 'right' && <i className="must">*</i>}
        </dt>
        <dd
          style={{
            justifyContent: _tdAlign,
            alignItems: _tdVAlign,
            flexDirection: `${
              tdFlexDirection ? `${tdFlexDirection}` : 'row'
            }` as any,
          }}
        >
          {children}
        </dd>
      </dl>
    </div>
  );
};

export default GridTableItem;
