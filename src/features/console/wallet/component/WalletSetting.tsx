import React, { useEffect, useState } from 'react';
import CardSection from '../../setting/conponents/CardSection';
import { InputSwitch } from 'primereact/inputswitch';
import { observer } from 'mobx-react';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { useRouter } from 'next/router';
import { useBaseUrl } from '@/libs/hooks/useBaseUrl';

const WalletSetting = observer(
  (props: {
    autoSign?: boolean;
    onToggleAutoSign: () => void;
    accessMember?: boolean;
    onToggleAccessMember: () => void;
    setTabIndex?: (e: number) => void;
  }) => {
    const { commonStore } = useStore();
    const router = useRouter();
    const { baseUrl } = useBaseUrl();
    const [featureData, setFeatureData] = useState({
      autoSign: props.autoSign ?? false,
      allowing: props.accessMember ?? false,
    });

    useEffect(() => {
      const walletChange = async () => {
        if (
          baseUrl &&
          router.isReady &&
          commonStore.currentWallet !== 'console'
        ) {
          props.setTabIndex && props.setTabIndex(0);
        }
      };
      walletChange().then();
    }, [router.isReady, commonStore.currentWallet, baseUrl]);

    return (
      <CardSection
        title="Wallet setting"
        body={
          <>
            <strong className="labelName">Feature</strong>
            <div className="featureWrap">
              <ul>
                <li>
                  <p>Transaction auto sign</p>
                  <InputSwitch
                    onChange={(e) => {
                      setFeatureData({
                        ...featureData,
                        autoSign: e.target.value,
                      });
                      props.onToggleAutoSign();
                    }}
                    checked={featureData.autoSign}
                  />
                </li>
                <li>
                  <p>Allowing access to other members</p>
                  <InputSwitch
                    onChange={(e) => {
                      setFeatureData({
                        ...featureData,
                        allowing: e.target.value,
                      });
                      props.onToggleAccessMember();
                    }}
                    checked={featureData.allowing}
                  />
                </li>
              </ul>
            </div>
          </>
        }
      />
    );
  }
);

export default WalletSetting;
