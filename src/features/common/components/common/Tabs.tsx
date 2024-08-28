import { TabMenu, TabMenuProps } from 'primereact/tabmenu';
import styles from './Tabs.module.scss';
import { FC } from 'react';

interface TabsProps extends TabMenuProps {
  type: 'underline' | 'solid';
  size?: 24 | 18 | 14;
}

const Tabs: FC<TabsProps> = ({
  type = 'underline',
  size = 24,
  className,
  ...props
}) => {
  return (
    <TabMenu
      className={`${className ?? ''} ${
        type === 'solid' ? styles.solid : styles.underline
      } f-${size}`}
      {...props}
    />
  );
};

export default Tabs;
