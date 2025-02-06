import {
  AppShell,
  Blockquote,
  Code,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';

import {
  ErrorHandlingCode,
  ManyItemsCode,
  SimpleCaseCode,
} from './code-snippets/code-strings';
import {
  ErrorHandling,
  ManyItems,
  SimpleCase,
} from './code-snippets/example-code';
import { Example } from './components/Example';
import { SocialLinks } from './components/SocialLinks';

function App() {
  return (
    <AppShell header={{ height: 50 }} padding={'lg'}>
      <AppShell.Header px={'md'}>
        <Group justify="space-between" h={'100%'}>
          <Title order={4}>@m4ttheweric/use-loading-state</Title>
          <SocialLinks />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container component={Stack} fluid w={'100%'} maw={1000}>
          <Stack gap={'xl'}>
            <Title>use-loading-state</Title>
            <Stack>
              <Text size="lg" fw={500}>
                A React Hook for Managing Loading States
              </Text>
              <Blockquote>
                🙌 Finally free yourself from the hassle of manually managing
                loading states in your React components for async tasks.
              </Blockquote>
            </Stack>
            <Title order={2}>Examples:</Title>
            <Stack gap={'xl'}>
              <Example
                renderExample={<SimpleCase />}
                hashLink="#single-item"
                title="Single Item"
                description={
                  <>
                    For simple cases, wrap your async task in the{' '}
                    <Code>runTask</Code> function. The loading state is managed
                    for you.
                  </>
                }
                code={{
                  fileName: 'SimpleCase.tsx',
                  code: SimpleCaseCode,
                  language: 'tsx',
                }}
              />
              <Example
                renderExample={<ErrorHandling />}
                hashLink="#error-handling"
                title="Error Handling"
                description={
                  <>
                    Under the hood, any errors in your task function are
                    handled, the loading flag is set, and then errors are
                    re-thrown. What this means is that even if you don't handle
                    errors (you should!), your loading state will still work!
                  </>
                }
                code={{
                  fileName: 'ErrorHandling.tsx',
                  code: ErrorHandlingCode,
                  language: 'tsx',
                }}
              />
              <Example
                renderExample={<ManyItems />}
                hashLink="#multiple-items"
                title="Multiple Items"
                description={
                  <>
                    <Text>
                      When rendering many items that may have network tasts or
                      async behavior associated with them, handling all of the
                      loading states can be tricky. This hook allows you to
                      track as many loading states as you want with a single
                      line of code.
                    </Text>
                    <Text>
                      <Code>useLoadingState()</Code> also makes it simple to
                      restrict your list to only allow one task at a time.
                    </Text>
                  </>
                }
                code={{
                  fileName: 'ManyItems.tsx',
                  code: ManyItemsCode,
                  language: 'tsx',
                }}
              />
            </Stack>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
