import React, { FC, ReactNode, useState } from 'react';
import { classNames } from 'primereact/utils';
import CSS from 'csstype';
import { CodeHighlight } from './CodeHighlight';

interface BlockViewerProps {
  header: ReactNode;
  new?: boolean;
  containerClassName?: string;
  previewStyle?: CSS.Properties;
  children?: ReactNode;
  code?: string;
}
const BlockViewer: FC<BlockViewerProps> = (props) => {
  const [blockView, setBlockView] = useState('PREVIEW');

  const copyCode: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (props.code !== undefined) {
      await navigator.clipboard.writeText(props.code);
    }
    event.preventDefault();
  };

  return (
    <div className="block-viewer">
      <div className="block-section">
        <div className="block-header">
          <span className="block-title">
            <span>{props.header}</span>
            {props.new && <span className="badge-new">New</span>}
          </span>
          <div className="block-actions">
            <button
              tabIndex={0}
              className={classNames('p-link', {
                'block-action-active': blockView === 'PREVIEW',
              })}
              onClick={() => setBlockView('PREVIEW')}
            >
              <span>Preview</span>
            </button>
            <button
              className={classNames('p-link', {
                'block-action-active': blockView === 'CODE',
              })}
              onClick={() => setBlockView('CODE')}
            >
              <span>Code</span>
            </button>
            <button
              tabIndex={0}
              className="p-link block-action-copy"
              onClick={copyCode}
            >
              <i className="pi pi-copy"></i>
            </button>
          </div>
        </div>
        <div className="block-content">
          {blockView === 'PREVIEW' && (
            <div
              className={props.containerClassName}
              style={props.previewStyle}
            >
              {props.children}
            </div>
          )}

          {blockView === 'CODE' && <CodeHighlight>{props.code}</CodeHighlight>}
        </div>
      </div>
    </div>
  );
};

export default BlockViewer;
