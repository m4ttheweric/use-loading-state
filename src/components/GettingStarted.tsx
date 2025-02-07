import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Card, Code, Text } from '@mantine/core';
import { SiBun, SiNpm, SiPnpm, SiYarn } from 'react-icons/si';

import { TitleLink } from './TitleLink';

export function GettingStarted() {
  return (
    <>
      <TitleLink
        title="Getting Started"
        order={2}
        hashLink="#getting-started"
        mapHashToId
      />
      <Text>
        Install and start using <Code>useLoadingState()</Code>:
      </Text>
      <Card>
        <Card.Section>
          <CodeHighlightTabs
            code={[
              {
                fileName: 'npm',
                icon: <SiNpm />,
                code: 'npm install @m4ttheweric/use-loading-state',
                language: 'bash',
              },
              {
                fileName: 'bun',
                icon: <SiBun />,
                code: 'bun add @m4ttheweric/use-loading-state',
                language: 'bash',
              },
              {
                fileName: 'yarn',
                icon: <SiYarn />,
                code: 'yarn add @m4ttheweric/use-loading-state',
                language: 'bash',
              },
              {
                fileName: 'pnpm',
                icon: <SiPnpm />,
                code: 'pnpm add @m4ttheweric/use-loading-state',
                language: 'bash',
              },
            ]}
          />
        </Card.Section>
      </Card>
    </>
  );
}
