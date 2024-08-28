import {
  Checkbox as PCheckbox,
  CheckboxProps as PCheckboxProps,
} from 'primereact/checkbox';

import styles from './Checkbox.module.scss';

export type CheckboxProps = PCheckboxProps & {
  sizeClass?: 'sixteen-px' | 'twenty-px';
};

export const Checkbox = ({
  sizeClass = 'twenty-px',
  className,
  ...props
}: CheckboxProps) => {
  return (
    <PCheckbox
      className={`${className ?? ''} ${styles[sizeClass]}`}
      {...props}
    />
  );
};
