import { BasicTag } from '@/features/common/components/common/Tag/BasicTag';

interface StatusTagProps {
  state: 'fail' | 'success' | 'pending';
}

export const StatusTag = ({ state }: StatusTagProps) => {
  if (state === 'fail') {
    return (
      <BasicTag color="error" line="off" styleClass="round">
        Fail
      </BasicTag>
    );
  } else if (state === 'success') {
    return (
      <BasicTag color="success" line="off" styleClass="round">
        Success
      </BasicTag>
    );
  } else {
    return (
      <BasicTag color="warning" line="off" styleClass="round">
        Pending
      </BasicTag>
    );
  }
};
