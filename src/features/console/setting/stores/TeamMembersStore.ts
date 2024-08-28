import RootStore from '@/RootStore';
import { privateApi } from '@/apis';
import type { CommonResponseFindManyWorkspaceMembersResponseArray } from '@/generated/api/api-service';
import { BaseStore } from '@/libs/baseCommon/baseStores/BaseStore';
import { alertConsole, confirmConsole } from '@/libs/hooks/dialogConsole';
import { action, computed, makeObservable, observable } from 'mobx';

export default class TeamMembersStore extends BaseStore {
  constructor(rootStore?: RootStore) {
    super(rootStore);
    makeObservable(this);
  }

  @action
  init = () => {
    this.memberListData = undefined;
  };

  @observable
  memberListData?: CommonResponseFindManyWorkspaceMembersResponseArray;

  @action
  load = async (appId: number, pageSize?: number, pageNo?: number) => {
    const { data } = await privateApi.workspaceMembers.findManyWorkspaceMembers(
      {
        appId: appId,
        pageNo: pageNo ?? 1,
        pageSize: pageSize ?? 10,
      }
    );
    if (data && data.error.code === '00') {
      this.memberListData = data;
    } else {
      return alertConsole(
        'Error',
        'Unknown error occurred. Please try it again.',
        { icon: 'caution' }
      );
    }
  };

  @action
  deleteMember = async (appId: number, memberId: number) => {
    const check = await confirmConsole(
      'Remove team member',
      'Are you sure to remove this member?',
      { icon: 'delete', okText: 'Remove' }
    );
    if (check === 'ok') {
      const { data } = await privateApi.workspaceMembers.deleteWorkspaceMember({
        workspaceId:
          this.rootStore?.consoleLayoutStore.apps?.find(
            (f) => f.appId === appId
          )?.appWorkspace[0].workspaceId ?? -1,
        memberId,
      });
      if (data.error.code === '00') {
        await this.load(appId).then();
      } else {
        return alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
      }
    }
    return check === 'ok';
  };

  @observable
  inviteEmail?: string;

  @action
  onChangeEmail = (e: string) => {
    this.inviteEmail = e;
  };

  @observable
  accountYet?: boolean;

  @action
  handleInvite = async (appId: number) => {
    const {
      data: memberData,
    } = await privateApi.members.findManyConsoleMembers({
      email: this.inviteEmail,
    });
    const workspaceId = this.rootStore?.consoleLayoutStore.apps?.find(
      (f) => f.appId === appId
    )?.appWorkspace[0].workspaceId;
    if (memberData.error.code === '00' && workspaceId) {
      const { data } = await privateApi.workspaceMembers.createWorkspaceMember({
        authorityCode: 'NORMAL',
        workspaceId: workspaceId,
        memberId: Number(memberData.data?.[0].memberId),
      });
      if (data.error.code === '00') {
        await alertConsole(
          'Invite completed!',
          'Successfully invited your team member.',
          { icon: 'confirm', okText: 'Okay' }
        );
        this.load(appId).then();
      } else {
        await alertConsole(
          'Error',
          'Unknown error occurred. Please try it again.',
          { icon: 'caution' }
        );
      }
      return '00';
    } else {
      return '11';
    }
  };

  @computed
  get alreadyInvited() {
    return (
      this.memberListData?.data &&
      !!this.memberListData?.data?.find((f) => f.loginId === this.inviteEmail)
    );
  }
}
