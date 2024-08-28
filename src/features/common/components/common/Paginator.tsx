// import classNames from 'classnames';

import {
  Paginator as PrimePaginator,
  // PaginatorProps as PrimePaginatorProps,
  // PaginatorTemplate,
} from 'primereact/paginator';

// import { FC, MouseEventHandler } from 'react';
// import { Ripple } from 'primereact/ripple';

// type PaginatorProps = Omit<PrimePaginatorProps, 'template' | 'pageLinkSize'>;

// const Paginator: FC<PaginatorProps> = ({ ...props }) => {
//   const template1: PaginatorTemplate = {
//     layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
//     PageLinks: (options: {
//       view: { startPage: number; endPage: any };
//       page: number;
//       totalPages: any;
//       className: string;
//       onClick: MouseEventHandler<HTMLButtonElement> | undefined;
//     }) => {
//       // 페이지 숫자가 6이면? 1,2,3,4,5,6
//       // 그 이상이면 5까지만 보여주고 그 사이 ... 마지막 페이지 보여준다.
//       // 1,2,3,4,5 ... 7
//
//       if (options.totalPages <= 6) {
//         return (
//           <button
//             type="button"
//             className={options.className ?? undefined}
//             onClick={options.onClick}
//           >
//             {options.page + 1}
//             <Ripple />
//           </button>
//         );
//       }
//
//       if (options.page === 5) {
//         const className = classNames(options.className, {
//           'p-disabled': true,
//         });
//
//         return (
//           <span className={className} style={{ userSelect: 'none' }}>
//             ...
//           </span>
//         );
//       } else if (options.page < 5) {
//         return (
//           <button
//             type="button"
//             className={options.className ?? undefined}
//             onClick={options.onClick}
//           >
//             {options.page + 1}
//             <Ripple />
//           </button>
//         );
//       } else {
//         // 마지막 페이지 버튼
//         return (
//           <button
//             type="button"
//             className={options.className ?? undefined}
//             onClick={options.onClick}
//           >
//             {options.totalPages}
//             <Ripple />
//           </button>
//         );
//       }
//     },
//   };
//
//   // TODO 마지막 페이지 버튼 눌렀을 때 이벤트 가 마지막페이지로 가야함. 현재는 7번쨰로 가고있음
//   return <PrimePaginator template={template1} pageLinkSize={7} {...props} />;
// };

export default PrimePaginator;
