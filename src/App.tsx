import { CodeHighlight } from '@mantine/code-highlight';
import {
  AppShell,
  Code,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';

import { ManyItemsCode, SingleItemCode } from './code-snippets/code-strings';
import { ManyItems, SingleItem } from './code-snippets/example-components';

function App() {
  return (
    <AppShell header={{ height: 50 }} padding={'lg'}>
      <AppShell.Header px={'md'}>
        <Group h={'100%'}>use-loading-state examples</Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container fluid w={'100%'} maw={1300}>
          <Stack>
            <Title>Single Item</Title>
            <Group gap={'xl'}>
              <Stack align="start" flex={0}>
                <Title order={4}>Code:</Title>
                <CodeHighlight code={SingleItemCode} language="tsx" />
              </Stack>
              <Stack align="start" flex={1}>
                <Title order={4}>Try It:</Title>
                <SingleItem />
              </Stack>
            </Group>
          </Stack>

          <Stack mt={'3rem'} align="start">
            <Title>Multiple Items</Title>
            <Group gap={'xl'}>
              <Stack align="start" flex={0} w={'50%'}>
                <Title order={4}>Code:</Title>
                <Text>
                  When displaying multiple items that may have network tasts or
                  async behavior associated with them, handling all of the
                  loading states can be tricky. This hook allows you to track as
                  many loading states as you want with a single line of code.
                </Text>
                <Text>
                  <Code>useLoadingState()</Code> also makes it simple to
                  restrict your list to only allow one task at a time.
                </Text>
                <CodeHighlight code={ManyItemsCode} language="tsx" />
              </Stack>
              <Stack flex={1} align="start">
                <Title order={4}>Try It:</Title>
                <ManyItems />
              </Stack>
            </Group>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
