import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import Input from '@/features/common/components/common/Input/Input';
import React, { useState } from 'react';

interface LinkInputSetProps {
  onChange?: (e: string) => void;
  onSave?: () => void;
  onClose?: () => void;
  linkText?: string;
}

const LinkInputSet = ({
  onChange,
  onSave,
  onClose,
  linkText,
}: LinkInputSetProps) => {
  const [showInput, setShowInput] = useState(false);
  return (
    <div className="linkInputSet">
      {showInput ? (
        <div className="linkInput">
          <Input
            onChange={(e) => onChange && onChange(e.target.value)}
            value={linkText}
            placeholder={linkText ? linkText : 'URL'}
          />
          <button
            className="save"
            onClick={() => {
              onSave && onSave();
              setShowInput(false);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              onClose && onClose();
              setShowInput(false);
            }}
            className="close"
          />
        </div>
      ) : linkText ? (
        <div className="linkText">
          <p>{linkText}</p>
          <button onClick={() => setShowInput(true)} className="close" />
        </div>
      ) : (
        <SolidButton
          onClick={() => setShowInput(true)}
          styleType="color"
          size="xsmall"
          label="Link"
        />
      )}
    </div>
  );
};

export default LinkInputSet;
