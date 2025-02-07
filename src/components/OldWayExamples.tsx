import { useState } from 'react';
import { CodeHighlightTabsCode } from '@mantine/code-highlight';

import { OldWaysCode } from '../code-snippets/code-strings';
import {
  ManyItemsMultipleFlags,
  ManyItemsSingleFlag,
  SingleItem,
} from '../code-snippets/OldWays';
import { Example } from './Example';

export const oldWays: {
  renderExample: React.ReactNode;
  code: CodeHighlightTabsCode;
}[] = [
  {
    renderExample: <SingleItem />,
    code: {
      code: OldWaysCode.SingleItem,
      fileName: '👍 Single Item',
      language: 'tsx',
    },
  },
  {
    renderExample: <ManyItemsSingleFlag />,
    code: {
      code: OldWaysCode.ManyItemsSingleFlag,
      fileName: '😅 Many Items Bad',
      language: 'tsx',
    },
  },
  {
    renderExample: <ManyItemsMultipleFlags />,
    code: {
      code: OldWaysCode.ManyItemsMultipleFlags,
      fileName: '😭 Many Items Less Bad',
      language: 'tsx',
    },
  },
];

export function OldWayExamples() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Example
      title="Manually Managing Loading States"
      description={
        <>
          Handling loading states with a single item and a single task is fairly
          easy. But once you start dealing with lists of items, it can get
          complicated fast!
        </>
      }
      code={oldWays.map(x => x.code)}
      renderExample={oldWays[tabIndex].renderExample}
      activeTab={tabIndex}
      onTabChange={setTabIndex}
      hashLink="#old-ways"
    />
  );
}
