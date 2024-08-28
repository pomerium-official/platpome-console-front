import React from 'react';
import FullPopupLayout from '../components/create-NFT/FullPopupLayout';
import { useBaseUrl } from '@/libs/hooks/useBaseUrl';
import ChooseWallet from '../components/create-NFT/ChooseWallet';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import NewNFT from '../components/create-NFT/NewNFT';
import useStoreInitUnmount from '@/libs/baseCommon/hooks/useStoreInitUnmount';
import { useUserInfo } from '@/features/auth/libs/client/use-user-info';
import NFTCreated from '@/features/console/nft/components/create-NFT/NFTCreated';
import { useRouter } from 'next/router';
import {
  onExitConfirmContent,
  useBackObserver,
} from '@/libs/hooks/useBackObserver';
import { confirmConsole } from '@/libs/hooks/dialogConsole';

const CreateNFT = observer(() => {
  useUserInfo({ needLogin: true });
  const { createNFTStore: store } = useStore();
  const router = useRouter();
  const { baseUrl } = useBaseUrl();

  useBackObserver(`${baseUrl}/nft`, store.validatedForBack);

  useStoreInitUnmount(store);

  const onExit = async () => {
    if (store.validatedForBack) {
      const confirm = await confirmConsole(
        onExitConfirmContent.title,
        onExitConfirmContent.content,
        onExitConfirmContent.option
      );
      if (confirm === 'ok') {
        router.replace(`${baseUrl}/nft`).then();
      }
    } else {
      router.replace(`${baseUrl}/nft`).then();
    }
  };

  return (
    <FullPopupLayout
      onCloseLink={async () => {
        await onExit();
      }}
      title={'Create NFT'}
    >
      {!store.createdNFT?.id && (
        <>
          {!store.selectedWallet && (
            <ChooseWallet goBack={() => router.replace(`${baseUrl}/nft`)} />
          )}
          {store.selectedWallet && <NewNFT onExit={() => onExit()} />}
        </>
      )}
      {store.createdNFT?.id && <NFTCreated />}
    </FullPopupLayout>
  );
});

export default CreateNFT;
