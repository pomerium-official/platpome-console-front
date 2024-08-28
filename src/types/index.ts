// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

// TreeNode primereact에서 가져오면 에러나서 그대로 복사해서 사용
// import TreeNode from 'primereact/treenode/TreeNode';
export interface TreeNode {
  key?: string | number;
  label?: string;
  data?: any;
  icon?: string;
  children?: TreeNode[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  style?: object;
  className?: string;
  droppable?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  leaf?: boolean;
}

export interface SurveySecondsArrayType {
  sec: number;
}

interface Questionnaire {
  type: string;
  question: string;
  answers: any[];
}

export interface SurveyItemType {
  createdAt: any;
  playedSec: number;
  guid: string;
  questionnaire: Questionnaire;
  sid: string;
}

export interface SurveyListType {
  Items: SurveyItemType[];
  Count: number;
  ScannedCount: number;
}

/**
 * 트리 노드 타입 generic.
 */
export type TreeNodeType<T> = {
  data: T;
  children: TreeNodeType<T>[];
} & Omit<TreeNode, 'data'>; // TreeNode에서 data를 제외(omit)한 다음 data에 genericType을 주입

export function isTouchEvent(
  e: React.TouchEvent | React.MouseEvent
): e is React.TouchEvent {
  return e && 'touches' in e;
}

export function isMouseEvent(
  e: React.TouchEvent | React.MouseEvent
): e is React.MouseEvent {
  return e && 'screenX' in e;
}
