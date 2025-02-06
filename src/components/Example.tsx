import {
  CodeHighlightTabs,
  CodeHighlightTabsCode,
} from '@mantine/code-highlight';
import { Anchor, Card, Group, Stack, Text, Title } from '@mantine/core';
import { FaLink } from 'react-icons/fa';

export function Example({
  hashLink,
  title,
  description,
  codeTitle,
  code,
  renderExample,
}: {
  hashLink: string;
  title: React.ReactNode;
  description: React.ReactNode;
  code: CodeHighlightTabsCode;
  codeTitle?: React.ReactNode;
  renderExample: React.ReactNode;
}) {
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
        <Stack align="center">
          {codeTitle && <Title order={4}>{codeTitle}</Title>}
          {/* <ErrorHandling /> */}
          {renderExample}
        </Stack>
        <Card.Section mt={'xl'}>
          <CodeHighlightTabs
            withExpandButton
            defaultExpanded={false}
            code={[code]}
          />
        </Card.Section>
      </Card>
    </Stack>
  );
}
