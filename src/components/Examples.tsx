import { Code, List, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import { pageLinks } from '../constants';
import { ErrorHandling, ManyItems, SimpleCase } from '../examples/BetterWays';
import { BetterWaysCode } from '../examples/code-strings';
import { Example } from './Example';

export function Examples() {
  return (
    <>
      <Title order={2} id="examples">
        ✅ A Better Way:
      </Title>
      <Stack gap={'xl'}>
        <Example
          renderExample={<SimpleCase />}
          hashLink={pageLinks['Live Examples']['Single Item']}
          title="Single Item"
          description={
            <>
              For simple cases, wrap your async task in the <Code>runTask</Code>{' '}
              function. The loading state is managed for you based on the
              returned promise of your task.
            </>
          }
          code={{
            fileName: 'SimpleCase.tsx',
            code: BetterWaysCode.SimpleCase,
            language: 'tsx',
          }}
        />
        <Example
          renderExample={<ManyItems />}
          hashLink={pageLinks['Live Examples']['Multiple Items']}
          title="Multiple Items"
          description={
            <Stack>
              <Text>
                Instead of tracking multiple loading states manually,
                <Code>useLoadingState()</Code> lets you track multiple tasks
                effortlessly.
              </Text>
              <List
                ml={'lg'}
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IoMdCheckmarkCircleOutline size={18} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  Automatically tracks multiple async operations 🧠
                </List.Item>
                <List.Item>
                  Uses a <Code>Set</Code> under the hood for efficient lookups
                  💪
                </List.Item>
                <List.Item>
                  No need to manually update state before and after each task 🙌
                </List.Item>
              </List>
            </Stack>
          }
          code={{
            fileName: 'ManyItems.tsx',
            code: BetterWaysCode.ManyItems,
            language: 'tsx',
          }}
        />
        <Example
          renderExample={<ErrorHandling />}
          hashLink={pageLinks['Live Examples']['Error Handling']}
          title="Error Handling"
          description={
            <Stack>
              <Text>
                What happens when your async function throws an error?
              </Text>
              <List ml={'lg'} spacing="xs" size="sm" center type="ordered">
                <List.Item>
                  Error are handled by the <Code>runTask</Code> function
                  internally so the loading state can be updated safely.
                </List.Item>
                <List.Item>
                  Then, errors are re-thrown so you can handle them however you
                  want!
                </List.Item>
              </List>
              <Text>In Review:</Text>
              <List
                ml={'lg'}
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IoMdCheckmarkCircleOutline size={18} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  Your loading state just works -- even if an error is thrown.
                </List.Item>
                <List.Item>
                  You handle the error however you want without needing to worry
                  about your loading state!
                </List.Item>
              </List>
            </Stack>
          }
          code={{
            fileName: 'ErrorHandling.tsx',
            code: BetterWaysCode.ErrorHandling,
            language: 'tsx',
          }}
        />
      </Stack>
    </>
  );
}
