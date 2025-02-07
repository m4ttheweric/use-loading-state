import {
  CodeHighlightTabs,
  CodeHighlightTabsCode,
  CodeHighlightTabsProps,
} from '@mantine/code-highlight';
import { Anchor, Card, Group, Stack, Text, Title } from '@mantine/core';
import { FaLink } from 'react-icons/fa';

import '../code-snippets/code-strings';

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
      <Anchor href={hashLink}>
        <Group>
          <FaLink />
          <Title order={2}>{title}</Title>
        </Group>
      </Anchor>
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
