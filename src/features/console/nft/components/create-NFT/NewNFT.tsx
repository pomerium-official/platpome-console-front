import React, { useCallback, useState } from 'react';
import CreateNFTWrap from './CreateNFTWrap';
import styles from './NewNFT.module.scss';
import ChooseNFTType from './ChooseNFTType';
import NFTBasicInformation from './NFTBasicInformation';
import OptionItem from './OptionItem';
import { InputSwitch } from 'primereact/inputswitch';
import Input from '@/features/common/components/common/Input/Input';
import { SolidButton } from '@/features/common/components/common/Button/SolidButton';
import NFTPreview from './NFTPreview';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import AddProperties from './AddProperties';
import CreateNFTConfirmNSign from './CreateNFTConfirmNSign';
import Properties from './Properties';
import { regExpOnlyNumberAndDot, regExpPrice } from '@/libs/baseCommon/regex';
import { regExpOnlyNumber } from '@/libs/regex';
import { alertConsole } from '@/libs/hooks/dialogConsole';
import {
  DISCOUNT_FEE,
  TRANSACTION_GAS_FEE,
} from '@/features/console/nft/stores/CreateNFTStore';
import WalletModeSelected from '@/features/common/layout/console/components/WalletModeSelected';

interface NewNFTProps {
  onExit: () => void;
}

const NewNFT = observer(({ onExit }: NewNFTProps) => {
  const { createNFTStore: store } = useStore();
  const [showAddProperties, setShowAddProperties] = useState(false);
  const [showConfirmNSign, setShowConfirmNSign] = useState(false);

  const fetchCreateNFT = useCallback(async () => {
    const nftId = await store.createNFT();
    if (showConfirmNSign) {
      setShowConfirmNSign(false);
    }
    return alertConsole(
      nftId ? 'Creating NFT completed.' : 'Failed to create NFT.',
      nftId
        ? 'Successfully created NFT.'
        : 'Failed to create NFT. Please try again.',
      { icon: nftId ? 'confirm' : 'caution' },
      {
        handleClose: () => {
          if (showConfirmNSign) {
            setShowConfirmNSign(false);
          }
          store.onCloseConfirm(nftId);
        },
        handleOk: () => {
          if (showConfirmNSign) {
            setShowConfirmNSign(false);
          }
          store.onCloseConfirm(nftId);
        },
      }
    );
  }, []);

  return (
    <CreateNFTWrap goBack={() => onExit()}>
      <div className={`newNftWrap ${styles.newNftWrap}`}>
        <div className="pageTitle">
          <div>
            <h1>Create New NFT</h1>
            <p>Enter the NFT item information to register for sale.</p>
          </div>
          <div className="right">
            <WalletModeSelected style={{ width: 216 }} />
          </div>
        </div>
        <div className="newNftContent">
          <div className="left">
            <ChooseNFTType />
            {store.nftType !== 'single' && (
              <Input
                label="Quantity"
                placeholder="Enter quantity"
                style={{ marginTop: 24 }}
                value={store.inputData.number}
                onChange={(e) => {
                  const value = e.target.value.replace(regExpOnlyNumber, '');
                  if (value) {
                    store.handleNumericInputs('number', value);
                  } else {
                    store.handleNumericInputs('number', '');
                  }
                }}
              />
            )}
            <NFTBasicInformation />
            <OptionItem
              name="Put on store"
              info="Set a price  if you want to upload new NFTs to the PomeriumX store immediately."
              rightContent={
                <InputSwitch
                  checked={store.inputData.listing}
                  onChange={(e) =>
                    store.handleBooleanInputs('listing', e.target.value)
                  }
                />
              }
              bottomContent={
                <>
                  {store.inputData.listing && (
                    <Input
                      value={store.inputData?.price}
                      onChange={(e) => {
                        let value = e.target.value.replace(
                          regExpOnlyNumberAndDot,
                          ''
                        );
                        if (value) {
                          if (regExpPrice.test(value)) {
                            if (value.charAt(0) === '.') {
                              value = '0.';
                            }
                            store.handleStringInputs('price', value);
                          }
                        } else {
                          store.handleStringInputs('price', '');
                        }
                      }}
                      price={{
                        blockchainId: 'PMG',
                        iconSrc: '/assets/images/icons/icon-pmg.svg',
                      }}
                    />
                  )}
                </>
              }
              style={{ marginTop: 56 }}
            />
            {store.nftType === 'duplicate' && (
              <OptionItem
                name="Mintable"
                info="Turn on the button to allow for additional minting."
                rightContent={
                  <InputSwitch
                    checked={store.inputData.allowMint ?? false}
                    onChange={(e) => {
                      store.handleBooleanInputs('allowMint', e.target.value);
                    }}
                  />
                }
              />
            )}
            {
              <OptionItem
                name="Burnable"
                info="Turn on the button to enable burn."
                rightContent={
                  <InputSwitch
                    checked={store.inputData.burnable}
                    onChange={(e) =>
                      store.handleBooleanInputs('burnable', e.target.value)
                    }
                  />
                }
              />
            }
            <OptionItem
              name="Properties"
              info="You can register the properties of NFT."
              rightContent={
                <button
                  onClick={() => setShowAddProperties(true)}
                  className="addProperties"
                />
              }
              bottomContent={<Properties properties={store.attributes} />}
            />
          </div>
          <div className="right">
            <h2 className="sectionTitle">Preview</h2>
            <NFTPreview style={{ position: 'sticky', top: 100 }} />
          </div>
        </div>
        <div className="addedContent">
          <Input
            value={''}
            result={
              store.selectedWallet?.balance &&
              Number(store.selectedWallet?.balance) <
                TRANSACTION_GAS_FEE - DISCOUNT_FEE
                ? 'error'
                : undefined
            }
            disallowTextTransform={true}
            errorText={
              'You do not have enough PMG in your wallet to pay transaction gas fees.'
            }
            price={{
              blockchainId: 'PMG',
              iconSrc: '/assets/images/icons/icon-pmg.svg',
            }}
          />
          <div
            className={`balance${
              Number(store.selectedWallet?.balance) <
              TRANSACTION_GAS_FEE - DISCOUNT_FEE
                ? ' red'
                : ''
            }`}
          >
            Balance : {store.selectedWallet?.balance?.toLocaleString()}
            PMG
          </div>
        </div>
        <div className={`totalWrap`}>
          <dl className="gasFee">
            <dt>
              Transaction Gas Fee <button className="iconBtn infoInSquare" />
            </dt>
            <dd>{TRANSACTION_GAS_FEE} PMG</dd>
          </dl>
          <dl className="gasFee" style={{ marginTop: 0 }}>
            <dt>
              Discount <button className="iconBtn infoInSquare" />
            </dt>
            <dd>{-DISCOUNT_FEE} PMG</dd>
          </dl>
          <dl className="gasFee total" style={{ marginTop: 0 }}>
            <dt>Total</dt>
            <dd>{TRANSACTION_GAS_FEE - DISCOUNT_FEE} PMG</dd>
          </dl>
        </div>
        <div className="bottomButtons">
          <SolidButton
            onClick={async () => {
              if (store.wallet?.autoSignYn === 'Y') {
                await fetchCreateNFT();
              } else {
                setShowConfirmNSign(true);
              }
            }}
            disabled={!store.validated || store.loading}
            size="xlarge"
            styleType="color"
            label="Create NFT"
          />
        </div>
      </div>
      {showAddProperties && (
        <AddProperties
          setShowAddProperties={() => setShowAddProperties(false)}
        />
      )}
      {showConfirmNSign && (
        <CreateNFTConfirmNSign
          isLoading={store.loading}
          onClickConfirm={async () => {
            await fetchCreateNFT();
          }}
          onClickCancel={() => setShowConfirmNSign(false)}
        />
      )}
    </CreateNFTWrap>
  );
});

export default NewNFT;
