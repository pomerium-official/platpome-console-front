import React, { useEffect } from 'react';
import styles from './NFTCreated.module.scss';
import NFTPreview from '@/features/console/nft/components/create-NFT/NFTPreview';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';

const NFTCreated = observer(() => {
  const { createNFTStore: store } = useStore();
  const router = useRouter();

  useEffect(() => {
    return () => {
      store.initInputs();
    };
  }, [store]);

  return (
    <div className={styles.nftCreated}>
      <div className={`wrap`}>
        <div className={`title`}>
          <p className={`gradient`}>Create NFT completed</p>
        </div>
        <div className="description">
          Your&nbsp;
          <a style={{ color: '#007FF5', textDecoration: 'underline' }}>
            {store.inputData.nftName ?? 'Double arrow attack'}
          </a>
          &nbsp;NFT is
          <br /> successfully created.
        </div>
        <NFTPreview />
        <div className="bottomWrap">
          <SolidButton
            styleType={'color'}
            size={'xlarge'}
            onClick={() =>
              router.push(
                `/console/${router.query.appId}/nft/${store.createdNFT.id}`
              )
            }
          >
            View NFT
          </SolidButton>
          <button onClick={store.init}>Create another</button>
        </div>
      </div>
    </div>
  );
});

export default NFTCreated;
