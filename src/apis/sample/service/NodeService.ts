import axios from 'axios';
import TreeNode from 'primereact/treenode';

// export interface TreeNodeData {
//   key: string;
//   label: string;
//   data: string;
//   icon: string;
//   children: TreeNodeData[];
// }
//
// export interface TreeNodeTableData {
//   key: string;
//   data: {
//     name: string;
//     size: string;
//     type: string;
//   };
//   children: TreeNodeTableData[];
// }

export class NodeService {
  getTreeNodes() {
    return axios
      .get<{ root: TreeNode[] }>('/assets/sample/data/treenodes.json')
      .then((res) => res.data.root);
  }

  getTreeTableNodes() {
    return axios
      .get<{ root: TreeNode[] }>('/assets/sample/data/treetablenodes.json')
      .then((res) => res.data.root);
  }
}
