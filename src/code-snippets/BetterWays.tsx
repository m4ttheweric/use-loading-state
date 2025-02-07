/**
 * This file's contents will be consumed into code snippets for documentation use package script:
 * bun run create-code-snippets
 *
 * see scripts/create-code-snippets.ts for details
 */

import { useState } from 'react';
import { Alert, Button, Group, Popover, Stack, Switch } from '@mantine/core';
import { PiWarningCircleDuotone } from 'react-icons/pi';

import { useLoadingState } from '../../lib/useLoadingState';
import {
  mockItems,
  mockNetworkRequest,
  mockNetworkRequestError,
} from './utils';

// @extract
export function SimpleCase() {
  const [runTask, { isLoading }] = useLoadingState();

  async function handleClick() {
    // wrap your async task in the runTask function like this for simple cases.
    await runTask(() => mockNetworkRequest());
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
export function ErrorHandling() {
  const [runTask, { isLoading }] = useLoadingState();
  const [error, setError] = useState<Error | null>(null);

  async function noHandling() {
    setError(null);

    // look, no error handling is required!
    await runTask(() => mockNetworkRequestError());
  }

  async function errorHandling() {
    setError(null);

    // handle errors like this:
    await runTask(() => mockNetworkRequestError().catch(e => setError(e)));
  }

  return (
    <Stack align="center">
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

// @extract
export function ManyItems() {
  // track as many loading states as you want with a single line of code:
  const [runTask, { isLoading, isIdLoading }] = useLoadingState();
  const [oneAtATime, setOneAtATime] = useState(false);

  function handleItemClick(id: string) {
    // this time, runTask takes an object with a task and loadingId to identify the task
    runTask({
      loadingId: id,
      task: () => mockNetworkRequest(),
    });
  }

  return (
    <>
      <Group>
        <Switch
          onChange={e => setOneAtATime(e.currentTarget.checked)}
          checked={oneAtATime}
        />
        Only allow one at a time to load
      </Group>
      <Group wrap="wrap">
        {mockItems.map(item => (
          <Button
            // use the isIdLoading function to determine if a specific task is loading
            loading={isIdLoading(item.id)}
            // optionally, you could disable the button if another task is loading
            disabled={oneAtATime && !isIdLoading(item.id) && isLoading}
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
