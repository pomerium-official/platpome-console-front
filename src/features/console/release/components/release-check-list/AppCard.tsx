import Input from '@/features/common/components/common/Input/Input';
import Textarea from '@/features/common/components/common/Input/Textarea';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import React from 'react';

const AppCard = observer(() => {
  const { releaseStore: store } = useStore();

  return (
    <div className="appCardWrap">
      <div className="appCardInput">
        <Input
          onChange={async (e) => {
            const cardUrl = await store.imgUpload(e.target.files[0]);
            if (cardUrl) {
              store.handleReleaseInput('cardUrl', cardUrl);
            }
          }}
          defaultFileSrc={store.checkData?.cardUrl}
          file
          label="App card image"
          fileInfoText={
            <>
              JPG, PNG <br />
              Recommended at least 300 X 300 px (1:1)
            </>
          }
        />
        <Textarea
          onChange={(e) =>
            store.handleReleaseInput('promotionalText', e.target.value)
          }
          label="App's promotional text (Maximum 100 characters)"
          style={{ width: '100%', marginTop: 32 }}
          defaultValue={store.checkData.promotionalText}
          maxLength={100}
          placeholder="Promotional text"
        />
      </div>
      <div className="appCardPreview">
        <strong className="label">App card preview</strong>
        <div className="appCard">
          <div
            className={`imgArea${store.checkData?.cardUrl ? '' : ' noImg'}`}
            style={{
              backgroundImage: `url("${store.checkData?.cardUrl}")`,
            }}
          />
          <div className="infoArea">
            <div
              className={'iconDiv'}
              style={{
                background: `url(${store.appData?.iconUrl}) no-repeat center center / cover`,
              }}
            />
            <div className="textDiv">
              <strong className="name">{store.appData?.name}</strong>
              <p
                className={`info${
                  store.checkData.promotionalText ? '' : ` noText`
                }`}
              >
                {store.checkData.promotionalText.split('\n').map((v, i) => {
                  if (i > 0) {
                    return (
                      <React.Fragment key={`${v}${i}`}>
                        <br />
                        {v}
                      </React.Fragment>
                    );
                  }
                  return v;
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AppCard;
