import { LanguageOptions } from '@/generated/api/api-service';
import { useStore } from '@/libs/baseCommon/hooks/useStore';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

const defaultLangData = [
  {
    name: 'English',
    code: 'US',
    langCode: 'en',
    checked: false,
  },
  {
    name: 'Korean',
    code: 'KR',
    langCode: 'ko',
    checked: false,
  },
  {
    name: 'Japanese',
    code: 'JP',
    langCode: 'jp',
    checked: false,
  },
  {
    name: 'Chinese',
    code: 'CN',
    langCode: 'cn',
    checked: false,
  },
];

const Language = observer(() => {
  const { releaseStore: store } = useStore();
  const [languageList, setLanguageList] = useState<
    { name: string; code: string; langCode: string; checked: boolean }[]
  >([]);

  useEffect(() => {
    setLanguageList(defaultLangData);
  }, [store]);

  useEffect(() => {
    store.checkData.selectedLanguages = languageList
      .filter((f) => f.checked)
      .map((w) => {
        return w.langCode as LanguageOptions;
      });
  }, [languageList]);

  useEffect(() => {
    if (!store.loading) {
      if (store.checkData.selectedLanguages) {
        setLanguageList(
          defaultLangData.map((f) => {
            return {
              ...f,
              checked: store.checkData.selectedLanguages.some(
                (language) => language === f.langCode
              ),
            };
          })
        );
      }
    }
  }, [store.loading]);

  return (
    <div className="languageWrap">
      <strong className="labelName">
        Please select all languages supported by the game.
      </strong>
      <ul>
        {languageList.map((v, i) => {
          return (
            <li key={v.code + i}>
              <button
                onClick={() => {
                  setLanguageList((prev) => {
                    return prev.map((w, j) => {
                      if (i === j) {
                        return { ...w, checked: !v.checked };
                      } else {
                        return { ...w };
                      }
                    });
                  });
                }}
                className={v.checked ? 'selected' : ''}
              >
                <img
                  alt={v.name}
                  src="/assets/images/flag/flag-placeholder.png"
                  className={`flag flag-${v.code.toLowerCase()}`}
                />
                <span>{v.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Language;
