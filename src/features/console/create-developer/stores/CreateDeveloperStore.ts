import { BaseStore } from '@/libs/baseCommon/baseStores/BaseStore';
import { action, computed, makeObservable, observable } from 'mobx';
import RootStore from '@/RootStore';
import Router from 'next/router';
import { UserInfo } from '@/features/auth/libs/client/model';
import { privateApi } from '@/apis';

export type CreateDeveloperInputType = {
  name: string;
  nickname: string;
  nationCode: string;
  mobileNumber: string;
  certificationCode: string;
};

export type CreateDeveloperInputErrorType = {
  code: { isError: boolean; text: string };
  mobileNumber: { isError: boolean; text: string };
};

export type CreateDeveloperAgreementType = {
  text: string;
  checked: boolean;
  link?: { text: string; url: string };
};

export class CreateDeveloperStore extends BaseStore {
  //
  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  defaultInputValues: CreateDeveloperInputType = {
    name: '',
    nickname: '',
    nationCode: '',
    mobileNumber: '',
    certificationCode: '',
  };

  defaultAgreements = [
    { text: '[Required] I am 18 years old or older.', checked: false },
    {
      text: '[Required] I have read and agree to the ',
      checked: false,
      link: { text: 'PomeriumX developer Terms of Service', url: '/' },
    },
    {
      text: '[Required] I have read and agree to the ',
      checked: false,
      link: {
        text: 'PomeriumX developer Privacy policy',
        url: '/',
      },
    },
  ];

  defaultInputError = {
    code: { isError: false, text: '' },
    mobileNumber: { isError: false, text: '' },
  };

  @computed
  get validated() {
    return (
      this.inputValues.name.length > 0 &&
      this.inputValues.nickname.length > 0 &&
      this.inputValues.nationCode.length > 0 &&
      this.inputValues.mobileNumber.length > 0 &&
      this.agreements.filter((f) => f.checked)?.length ===
        this.agreements.length &&
      !this.inputError.code.isError &&
      !this.inputError.mobileNumber.isError &&
      this.verified
    );
  }

  @observable
  verified = false;

  @observable
  count = 0;

  @observable
  inputValues: CreateDeveloperInputType = this.defaultInputValues;

  @observable
  agreements: CreateDeveloperAgreementType[] = this.defaultAgreements;

  @observable
  inputError: CreateDeveloperInputErrorType = this.defaultInputError;

  @observable
  isSent = false;

  @observable
  timer?: { expired?: () => void; text: string; time?: number } = undefined;

  @observable
  messageId?: string = undefined;

  @action
  init = () => {
    this.verified = false;
    this.count = 0;
    this.inputValues = this.defaultInputValues;
    this.agreements = this.defaultAgreements;
    this.inputError = this.defaultInputError;
    this.isSent = false;
    this.timer = undefined;
    this.messageId = undefined;
  };

  @action
  checkIsMember = async () => {
    const { data } = await privateApi.members.checkMemberExist();
    if (data.error.code === '00') {
      await Router.push('/console');
    }
  };

  @action
  onChangeInput = (key: keyof CreateDeveloperInputType, value: string) => {
    return (this.inputValues[key] = value);
  };

  @action
  setCount = (value: number) => {
    this.count = value;
  };

  @action
  onCheckAgreement = (checked: boolean, targetIndex: number) => {
    this.agreements = this.agreements.map((agreement, index) => {
      if (targetIndex === index) {
        return { ...agreement, checked };
      } else {
        return { ...agreement };
      }
    });
  };

  @action
  sendCertificationSMS = async () => {
    this.isSent = false;
    this.verified = false;
    if (this.timer) this.timer = undefined;
    this.inputError = this.defaultInputError;

    if (this.inputValues.certificationCode)
      this.inputValues.certificationCode = '';

    const { data: response } = await privateApi.common.sendCertificationSms({
      consoleMemberName: this.inputValues.name,
      nationCodeNumber: this.inputValues.nationCode.replace('+', ''),
      phone: this.inputValues.mobileNumber,
    });
    if (response.data) {
      this.messageId = response.data.messageId;
      if (response.error.code === '00') {
        this.timer = {
          expired: () =>
            (this.inputError.code = {
              isError: true,
              text: 'The validation number has expired.',
            }),
          text: 'Valid time',
          time: 5,
        };
        this.count = 60;
        this.isSent = true;
      } else if (response.error.code === '409') {
        this.inputError.code = {
          isError: true,
          text: '1분 이내에 재전송 불가',
        };
      }
    }
  };

  @action
  verify = async () => {
    if (!this.verified && this.messageId) {
      const { data } = await privateApi.common.certificateCode(this.messageId, {
        code: this.inputValues.certificationCode,
      });
      if (data) {
        const responseCode = data.error.code;
        if (responseCode === '00') {
          this.verified = true;
          this.inputError.code = { isError: false, text: '' };
          this.timer = undefined;
          this.setCount(0);
        } else if (responseCode === '400') {
          this.inputError.code = { isError: true, text: 'code invalid' };
        } else if (responseCode === '409') {
          this.inputError.code = { isError: true, text: 'code expired' };
        }
      }
    }
  };

  @action
  createAccount = async (userInfo?: UserInfo) => {
    if (userInfo) {
      const mobileNo = this.inputValues.mobileNumber;
      const { data } = await privateApi.members.createConsoleMember({
        loginId: userInfo.email,
        name: this.inputValues.name,
        nickname: this.inputValues.nickname,
        email: userInfo.email,
        recoveryEmail: userInfo.email,
        phone: `${this.inputValues.nationCode}${
          this.inputValues.mobileNumber.charAt(0) === '0'
            ? mobileNo.substring(1)
            : mobileNo
        }`,
        phoneCertificateYn: this.verified ? 'Y' : 'N',
      });
      if (data && data.error.code === '00') {
        await Router.push('/console/create-developer/complete');
      }
    }
  };
}
