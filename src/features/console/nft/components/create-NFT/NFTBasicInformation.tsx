import Input from '@/features/common/components/common/Input/Input';
import React, { useEffect, useState } from 'react';
import NFTImageUpload from './NFTImageUpload';
import Textarea from '@/features/common/components/common/Input/Textarea';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';

const NFTBasicInformation = observer(() => {
  const { createNFTStore: store } = useStore();
  const [imgSrc, setImgSrc] = useState<string>();
  useEffect(() => {
    if (store.inputData?.imageUrl) {
      setImgSrc(store.inputData?.imageUrl);
    }
  }, [store.inputData?.imageUrl]);

  console.log('imgSrc', imgSrc);

  return (
    <>
      <h2 className="sectionTitle">NFT Basic information</h2>
      <div className={`basicInfo`}>
        <NFTImageUpload
          imgSrc={imgSrc}
          showDisplay={!!imgSrc && imgSrc?.length > 0}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              const file = e.target.files[0];
              store.setFile(file);
              const objectUrl = URL.createObjectURL(file);
              store.handleStringInputs('imageUrl', objectUrl);
              setImgSrc(objectUrl);
            }
          }}
          onCancel={() => {
            setImgSrc(undefined);
            store.onCancelUpload();
          }}
        />
        <Input
          label="Name"
          style={{ marginTop: 16 }}
          placeholder="Enter name"
          onChange={(e) => store.handleStringInputs('nftName', e.target.value)}
        />
        <Textarea
          label="Description (Optional)"
          style={{ marginTop: 16 }}
          placeholder="Enter description"
          onChange={(e) =>
            store.handleStringInputs('description', e.target.value)
          }
        />
      </div>
    </>
  );
});

export default NFTBasicInformation;
