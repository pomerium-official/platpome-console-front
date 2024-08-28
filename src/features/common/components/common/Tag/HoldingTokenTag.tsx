import { BasicTag } from '@/features/common/components/common/Tag/BasicTag';

interface HoldingTokenTagProps {
  token: number;
}

export const HoldingTokenTag = ({ token }: HoldingTokenTagProps) => {
  return (
    <BasicTag color="info" line="on" stateDot={false} styleClass="round">
      {token} tokens
    </BasicTag>
  );
};
