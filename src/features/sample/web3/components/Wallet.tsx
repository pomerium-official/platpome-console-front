import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  ConnectWallet,
  metamaskWallet,
  useConnect,
  useConnectionStatus,
  useWallet,
  useChainId,
} from '@thirdweb-dev/react';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import { CurrencyValue } from '@thirdweb-dev/sdk/dist/declarations/src/evm/types/currency';

const networks = [
  { name: 'BNB Smart Chain - Mainnet', value: '56' },
  { name: 'BNB Smart Chain - Testnet', value: '97' },
  { name: 'Wrong chain - Testnet', value: '1' },
];

const metamaskConfig = metamaskWallet();
export const PMG_ADDRESS = '0x0733618Ab62eEEC815f2d1739b7a50bF9E74d8a2';
// const PMR_ADDRESS = '0x1dC5779ed65BCc1F0A42d654444FB0Ce59D7783b';

const StorageBiz = observer(() => {
  const [network, setNetwork] = useState('97');
  const [address, setAddress] = useState<string | undefined>();
  const [balance, setBalance] = useState<string | undefined>();
  const [erc20Balance, setErc20Balance] = useState<string | undefined>();
  const connect = useConnect();
  const connectionStatus = useConnectionStatus();
  const walletInstance = useWallet();
  const chainId = useChainId();
  // useEffect(() => {}, []);

  const handleChangeNetwork = useCallback(
    async (e: DropdownChangeParams) => {
      setNetwork(e.value);
      // 지갑이 연결 되어 있는 경우 네트워크 전환 명령 수행
      console.info('connectionStatus : ', connectionStatus);
      console.info('switching chainId : ', e.value);
      if (connectionStatus === 'connected') {
        await connect(metamaskConfig, { chainId: Number(e.value) });
      }
    },
    [connectionStatus]
  );

  useEffect(() => {
    if (connectionStatus === 'connected') {
      getConnectedWalletInfo().then();
      getErc20WalletInfo().then();
    }
  }, [connectionStatus, walletInstance]);

  const getConnectedWalletInfo = useCallback(async () => {
    if (walletInstance) {
      console.info('walletInstance : ', walletInstance);
      setAddress(await walletInstance.getAddress());
      const currencyObject: CurrencyValue = await walletInstance.getBalance();
      // const balance = (
      //   Number(currencyObject.value) / Math.pow(10, currencyObject.decimals)
      // ).toFixed(4);
      console.info('currencyObject: ', currencyObject);
      setBalance(currencyObject.displayValue);
    }
  }, [walletInstance]);

  const getErc20WalletInfo = useCallback(async () => {
    if (walletInstance) {
      setAddress(await walletInstance.getAddress());
      const currencyObject: CurrencyValue = await walletInstance.getBalance(
        PMG_ADDRESS
      );
      // const balance = (
      //   Number(currencyObject.value) / Math.pow(10, currencyObject.decimals)
      // ).toFixed(4);
      console.info('currencyObject: ', currencyObject);
      setErc20Balance(currencyObject.displayValue);
    }
  }, [walletInstance]);

  const CustomDetail = () => {
    return (
      <SolidButton size="xlarge" styleType="color">
        - Disconnect wallet
      </SolidButton>
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Default Connect Button</h5>
          <ConnectWallet />
        </div>
        <div className="card">
          <h5>Custom Connect Button</h5>
          <ConnectWallet detailsBtn={CustomDetail} />
          {/*<CustomButton />*/}
        </div>
        <div className={'card'}>
          <h5>Network Change</h5>
          <Dropdown
            id="dropdown"
            options={networks}
            value={network}
            onChange={handleChangeNetwork}
            optionLabel="name"
            optionValue={'value'}
          />
        </div>
        <div className={'card'}>
          <h5>Network Information</h5>
          <div>chainId: {chainId}</div>
        </div>
        <div className="card">
          <h5>Wallet Information from connected network</h5>
          <div>status: {connectionStatus}</div>
          {walletInstance && (
            <>
              <div>address: {address}</div>
              <div>balance: {balance}</div>
            </>
          )}
        </div>
      </div>
      <div className="card">
        <h5>Wallet Information from specific contract e.g PMG / PMR</h5>
        <div>status: {connectionStatus}</div>
        {walletInstance && (
          <>
            <div>address: {address}</div>
            <div>balance: {erc20Balance}</div>
          </>
        )}
      </div>
    </div>
  );
});

export default StorageBiz;
