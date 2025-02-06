/**
 * This file's contents will be consumed into code snippets for documentation use package script:
 * bun run create-code-snippets
 *
 * see scripts/create-code-snippets.ts for details
 */

import { useState } from 'react';
import { Alert, Button, Group, Stack, Switch, Text } from '@mantine/core';
import { PiWarningCircleDuotone } from 'react-icons/pi';

import { useLoadingState } from '../../lib/useLoadingState';

function mockNetworkRequest(props: { throwError?: boolean } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (props.throwError) {
        reject(new Error('Some kind of mysterious network error!'));
      }
      resolve(true);
    }, 3000);
  });
}

function mockNetworkRequestError() {
  return mockNetworkRequest({ throwError: true });
}

// @extract
export function OldWay() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    // need to manually set loading state
    setIsLoading(true);

    try {
      await mockNetworkRequest();

      // your code is littered with loading state management
      setIsLoading(false);
    } catch {
      // you have to remember to set loading state back to false in your catch block
      setIsLoading(false);
    }
  }

  return (
    <Button loading={isLoading} onClick={handleClick} size="xs">
      Click To Run Task
    </Button>
  );
}

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
      <Text>Both buttons use the same loading state</Text>
      <Button loading={isLoading} onClick={noHandling} size="xs">
        No Error Handling
      </Button>
      <Button
        loading={isLoading}
        onClick={errorHandling}
        size="xs"
        color="teal"
      >
        With Error Handling
      </Button>
      {error && (
        <Alert icon={<PiWarningCircleDuotone />} color={'red'}>
          <Text fw={500}>You handled this error:</Text>
          {error.message}
        </Alert>
      )}
    </Stack>
  );
}

//an array of 10 items that has an id property and a name
const data = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  name: `Item ${i}`,
}));

// @extract
export function ManyItems() {
  // track as many loading states as you want with a single line of code:
  const [runTask, { isLoading, isIdLoading }] = useLoadingState();
  const [oneAtATime, setOneAtATime] = useState(false);

  function handleItemClick(id: string) {
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
      {data.map(item => (
        <Button
          size="xs"
          key={item.id}
          loading={isIdLoading(item.id)}
          disabled={oneAtATime && !isIdLoading(item.id) && isLoading}
          onClick={() => handleItemClick(item.id)}
        >
          Run Item {item.id}'s Task
        </Button>
      ))}
    </>
  );
}
