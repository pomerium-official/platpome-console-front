import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Toast } from 'primereact/toast';
import { ConnectWallet, MediaRenderer } from '@thirdweb-dev/react';
import DndPreviewBox, {
  DndPreviewBoxElement,
} from '@/features/common/components/ipfs-upload/DndPreviewBox';

const StorageBiz = observer(() => {
  const toast = useRef<Toast>(null);
  ///
  const [, setValidErrorMsg] = useState<string>();
  const dndPreviewBoxRef = useRef<DndPreviewBoxElement>(null);
  const [dispMediaType] = useState('');
  ///

  const [ipfsUrl, setIpfsUrl] = useState<string | undefined>();
  const [gatewayUrl, setGatewayUrl] = useState<string | undefined>();

  return (
    <div className="grid">
      <div className="col-12">
        <div className={'card'}>
          <ConnectWallet />
        </div>
        <div className="card">
          <Toast ref={toast} />
          <h5>DND IPFS Preview </h5>
          <DndPreviewBox
            dispMediaType={dispMediaType}
            mediaType={'img'}
            onFileUploaded={(result) => {
              // setUploadedFile(file);
              setIpfsUrl(result?.ipfsUrl);
              setGatewayUrl(result?.imageUrl);
            }}
            onValidError={(error) => {
              setValidErrorMsg(error);
            }}
            onFileUploadStart={() => {
              setValidErrorMsg(undefined);
            }}
            ref={dndPreviewBoxRef}
          />
        </div>
      </div>

      <div className="card">
        <h5>IPFS Render </h5>
        <div>
          url :{' '}
          <input type={'text'} value={ipfsUrl} style={{ width: '800px' }} />
        </div>
        <br />
        <h5>MediaRenderer</h5>
        <div>
          <MediaRenderer src={ipfsUrl} />
        </div>
        <br />
        <h5>Image using gateway</h5>
        <div>
          <img src={gatewayUrl} alt={'gateway url'} />
        </div>
      </div>
    </div>
  );
});

export default StorageBiz;
