import { BasicTag } from '@/features/common/components/common/Tag/BasicTag';

interface AuthorityTagProps {
  state: 'OWNER' | 'ADMIN' | 'DEVELOPER';
}

export const AuthorityTag = ({ state }: AuthorityTagProps) => {
  if (state === 'OWNER') {
    return (
      <BasicTag color="VL" line="off" styleClass="square">
        OWNER
      </BasicTag>
    );
  } else if (state === 'ADMIN') {
    return (
      <BasicTag color="bl3" line="off" styleClass="square">
        ADMIN
      </BasicTag>
    );
  } else {
    return (
      <BasicTag color="GR" line="off" styleClass="square">
        DEVELOPER
      </BasicTag>
    );
  }
};
