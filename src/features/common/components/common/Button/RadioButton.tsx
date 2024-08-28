import {
  RadioButton as PRadioButton,
  RadioButtonProps as PRadioButtonProps,
} from 'primereact/radiobutton';

import styles from './RadioButton.module.scss';

export type RadioButtonProps = PRadioButtonProps & {
  sizeClass?: 'sixteen-px' | 'twenty-px';
};

export const RadioButton = ({
  sizeClass = 'twenty-px',
  className,
  ...props
}: RadioButtonProps) => {
  return (
    <PRadioButton
      className={`${className ?? ''} ${styles[sizeClass]}`}
      {...props}
    />
  );
};
