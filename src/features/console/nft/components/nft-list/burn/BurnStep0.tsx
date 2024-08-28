import Select from '@/features/common/components/common/Select/Select';
import { DropdownProps } from 'primereact/dropdown';
import React from 'react';

const renderOption = (option: any) => {
  switch (option.id) {
    case 'console': {
      return (
        <>
          <div className="name">
            <img
              src="/assets/images/console/text_console_wallet.svg"
              alt="console wallet"
              className="console"
            />
          </div>
          <div className="address">{option.address}</div>
        </>
      );
    }
    case 'connect': {
      return <button className="connect">Wallet Connect</button>;
    }
    default: {
      return (
        <>
          <div className="name">
            <img
              src={`/assets/images/icons/icon_${option.id}.svg`}
              alt={option.id}
            />
            <span>{option.name}</span>
          </div>
          <div className="address">{option.address}</div>
        </>
      );
    }
  }
};

const walletOptionTemplate = (option: any) => {
  return <div className="walletOptionTemplete">{renderOption(option)}</div>;
};

const selectedWalletTemplate = (option: any, props: DropdownProps) => {
  if (option) {
    return (
      <div className="walletOptionTemplete selected">
        {renderOption(option)}
      </div>
    );
  }
  return <span>{props.placeholder}</span>;
};

const walletList = [
  {
    id: 'console',
    name: 'Console Wallet',
    address: '0x88E9c9f878341BF72AdADc071aFc47335A25AA8a',
  },
  {
    id: 'metamask',
    name: 'Meta Mask',
    address: '0x88E9c9f878341BF72AdADc071aFc47335A25AA8a',
  },
  {
    id: 'connect',
    name: '',
    address: '',
  },
];

interface BurnStep0Props {
  selectedWallet: any;
  setSelectedWallet: (e: any) => void;
}

const BurnStep0 = ({ selectedWallet, setSelectedWallet }: BurnStep0Props) => {
  const onWalletChange = (e: { value: any }) => {
    setSelectedWallet(e.value);
  };
  return (
    <div style={{ height: 180 }}>
      <Select
        label={'Select a wallet for gas fee'}
        placeholder="Select a wallet"
        value={selectedWallet}
        onChange={(e) => {
          onWalletChange(e);
        }}
        optionLabel="name"
        filterBy="id"
        options={walletList}
        itemTemplate={walletOptionTemplate}
        valueTemplate={selectedWalletTemplate}
        className="walletSelect"
      />
    </div>
  );
};

export default BurnStep0;
