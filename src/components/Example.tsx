import {
  CodeHighlightTabs,
  CodeHighlightTabsCode,
  CodeHighlightTabsProps,
} from '@mantine/code-highlight';
import { Card, Stack, Text, Title } from '@mantine/core';

import '../examples/code-strings';

import { TitleLink } from './TitleLink';

type ExampleProps = {
  hashLink: string;
  title: React.ReactNode;
  description: React.ReactNode;
  code: CodeHighlightTabsCode | CodeHighlightTabsCode[];
  codeTitle?: React.ReactNode;
  renderExample: React.ReactNode;
  activeTab?: CodeHighlightTabsProps['activeTab'];
  onTabChange?: CodeHighlightTabsProps['onTabChange'];
};

export function Example({
  hashLink,
  title,
  description,
  codeTitle,
  code,
  renderExample,
  ...tabProps
}: ExampleProps) {
  return (
    <Stack id={hashLink.replace('#', '')}>
      <TitleLink hashLink={hashLink} title={title} order={2} />
      {description && <Text>{description}</Text>}
      <Card withBorder>
        <Stack align="center" p={'lg'} mb={'md'}>
          {codeTitle && <Title order={4}>{codeTitle}</Title>}

          {renderExample}
        </Stack>
        <Card.Section>
          <CodeHighlightTabs
            withExpandButton
            defaultExpanded={false}
            code={Array.isArray(code) ? code : [code]}
            {...tabProps}
          />
        </Card.Section>
      </Card>
    </Stack>
  );
}
