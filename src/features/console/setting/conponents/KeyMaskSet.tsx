import React, { useState } from 'react';
import styles from './KeyMaskSet.module.scss';
import { copyClipboard } from '../../wallet/component/WalletList';

interface KeyMaskSetProps {
  keyString?: string;
  maskDefault?: boolean;
  onMask?: (e: string) => void;
  onCopy?: () => void;
}

const KeyMaskSet = ({
  keyString,
  maskDefault = true,
  onMask,
  onCopy,
}: KeyMaskSetProps) => {
  const [masking, setMasking] = useState(maskDefault);
  return (
    <div className={`keyMaskSet ${styles.keyMaskSet}`}>
      <p className="keyArea">
        {masking
          ? '∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙'
          : keyString}
      </p>
      <button
        onClick={() => {
          setMasking(!masking);
          onMask && onMask(masking ? 'hide' : 'visible');
        }}
        className={`btn mask${masking ? ' slash' : ''}`}
      />
      <button
        onClick={() => {
          keyString && copyClipboard(keyString);
          onCopy && onCopy();
        }}
        className="btn copy"
      />
    </div>
  );
};

export default KeyMaskSet;
