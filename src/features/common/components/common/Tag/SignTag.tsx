import { BasicTag } from '@/features/common/components/common/Tag/BasicTag';

interface SignTagProps {
  state: 'auto' | 'manual';
}

export const SignTag = ({ state }: SignTagProps) => {
  if (state === 'auto') {
    return (
      <BasicTag color="success" line="on" styleClass="round">
        Auto sign
      </BasicTag>
    );
  } else {
    return (
      <BasicTag color="l-gray" line="off" stateDot={false} styleClass="round">
        Manual sign
      </BasicTag>
    );
  }
};
