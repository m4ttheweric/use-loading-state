import {
  Anchor,
  AppShell,
  Blockquote,
  Code,
  Container,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { SiMantine } from 'react-icons/si';

import {
  ErrorHandling,
  ManyItems,
  SimpleCase,
} from './code-snippets/BetterWays';
import { BetterWaysCode } from './code-snippets/code-strings';
import { Example } from './components/Example';
import { OldWayExamples } from './components/OldWayExamples';
import { SocialLinks } from './components/SocialLinks';

function App() {
  return (
    <AppShell header={{ height: 50 }} padding={'lg'}>
      <AppShell.Header px={'md'}>
        <Group justify="space-between" h={'100%'}>
          <Text fw={500}>@m4ttheweric/use-loading-state</Text>
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
                🙌 Free yourself from the hassle of manually managing loading
                states in your React components for async tasks.
              </Blockquote>
            </Stack>
            <Title order={2}>The Old Way:</Title>
            <Stack>
              <OldWayExamples />
            </Stack>
            <Title order={2}>A Better Way:</Title>
            <Stack gap={'xl'}>
              <Example
                renderExample={<SimpleCase />}
                hashLink="#single-item"
                title="Single Item"
                description={
                  <>
                    For simple cases, wrap your async task in the{' '}
                    <Code>runTask</Code> function. The loading state is managed
                    for you based on the returned promise of your task.
                  </>
                }
                code={{
                  fileName: 'SimpleCase.tsx',
                  code: BetterWaysCode.SimpleCase,
                  language: 'tsx',
                }}
              />
              <Example
                renderExample={<ErrorHandling />}
                hashLink="#error-handling"
                title="Error Handling"
                description={
                  <>
                    Under the hood, any errors in your async task function are
                    handled, the loading flag is managed, and then errors are
                    re-thrown. What this means is your loading state will work,
                    regardless if there are errors!
                  </>
                }
                code={{
                  fileName: 'ErrorHandling.tsx',
                  code: BetterWaysCode.ErrorHandling,
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
                  code: BetterWaysCode.ManyItems,
                  language: 'tsx',
                }}
              />
            </Stack>
          </Stack>
          <Anchor href="https://mantine.dev/" target="_blank">
            <Group
              gap={'xs'}
              wrap="nowrap"
              mt={'4rem'}
              justify="flex-end"
              c={'muted'}
            >
              This project uses Mantine for it's UI and examples!{' '}
              <ThemeIcon
                color="blue"
                variant="subtle"
                size={'lg'}
                radius={'sm'}
              >
                <SiMantine size={30} />
              </ThemeIcon>
            </Group>
          </Anchor>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
