/**
 * This file's contents will be consumed into code snippets for documentation use package script:
 * bun run create-code-snippets
 *
 * see scripts/create-code-snippets.ts for details
 */

import { useState } from 'react';
import { Alert, Button, Group, Popover, Stack, Text } from '@mantine/core';
import { PiWarningCircleDuotone } from 'react-icons/pi';

import { useLoadingState } from '../../lib/useLoadingState';
import { mockAsyncError, mockAsyncOperation, mockItems } from './utils';

// @extract
export function SimpleCase() {
  const [runTask, { isLoading }] = useLoadingState();

  async function handleClick() {
    // wrap your async task in the runTask function like this for simple cases.
    await runTask(() => mockAsyncOperation());
  }

  return (
    <Button
      // use returned isLoading flag to set the loading state in your UI:
      loading={isLoading}
      onClick={handleClick}
      size="xs"
    >
      Click To Run Task
    </Button>
  );
}

// @extract
export function ManyItems() {
  // track as many loading states as you want with a single line of code:
  const [runTask, { isIdLoading }] = useLoadingState();

  function handleItemClick(id: string) {
    // this time, runTask takes an object with a task and loadingId to identify the task
    runTask({
      loadingId: id,
      task: () => mockAsyncOperation(),
    });
  }

  return (
    <>
      <Group wrap="wrap">
        {mockItems.map(item => (
          <Button
            // use the isIdLoading function to determine if a specific task is loading
            loading={isIdLoading(item.id)}
            onClick={() => handleItemClick(item.id)}
            size="xs"
            key={item.id}
          >
            Run Item {item.id}'s Task
          </Button>
        ))}
      </Group>
    </>
  );
}

// @extract
export function ErrorHandling() {
  const [runTask, { isLoading }] = useLoadingState();
  const [error, setError] = useState<Error | null>(null);

  async function noHandling() {
    setError(null);

    // look, no error handling is required!
    await runTask(() => mockAsyncError());
  }

  async function errorHandling() {
    setError(null);

    // handle errors like this:
    await runTask(() => mockAsyncError().catch(e => setError(e)));
  }

  return (
    <Stack align="center">
      <Text>
        Both of these buttons will initiate async functions that will throw an
        error. Take a look at the code to see how to handle errors.
      </Text>
      <Button loading={isLoading} onClick={noHandling} size="xs">
        No Error Handling
      </Button>
      <Popover withArrow opened={!!error}>
        <Popover.Target>
          <Button
            loading={isLoading}
            onClick={errorHandling}
            size="xs"
            color="teal"
          >
            With Error Handling
          </Button>
        </Popover.Target>
        <Popover.Dropdown p={0} bg={'var(--mantine-color-red-light)'}>
          <Alert icon={<PiWarningCircleDuotone />} color={'red'}>
            {error?.message}
          </Alert>
        </Popover.Dropdown>
      </Popover>
    </Stack>
  );
}
