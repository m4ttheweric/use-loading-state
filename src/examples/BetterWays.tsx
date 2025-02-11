/**
 * This file's contents will be consumed into code snippets for documentation use package script:
 * bun run create-code-snippets
 *
 * see scripts/create-code-snippets.ts for details
 */

import { Button, Group, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IoMdAlert } from 'react-icons/io';

import { useLoadingState } from '../../lib/useLoadingState';
import { mockAsyncError, mockAsyncOperation, mockItems } from './utils';

// @extract
export function SimpleCase() {
  const [runTask, { isLoading }] = useLoadingState();

  function handleClick() {
    // wrap your async task in the runTask function like this for simple cases.
    runTask(() => mockAsyncOperation());
  }

  return (
    <Button loading={isLoading} onClick={handleClick}>
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
  const [runTask, { isIdLoading }] = useLoadingState<
    // useLoadingState accepts generics so you can specify your own loadingId types
    'no-handling' | 'error-handled'
  >();

  function noHandling() {
    // look, no error handling is required!
    runTask({
      loadingId: 'no-handling',
      task: () => mockAsyncError(),
    });
  }

  function errorHandling() {
    // handle errors like this:
    runTask({
      loadingId: 'error-handled',
      task: () => mockAsyncError(),
    }).catch(e => {
      // handle the error here...
      notifications.show({
        color: 'red',
        message: e.message,
        icon: <IoMdAlert />,
        position: 'top-center',
      });
    });
  }

  return (
    <Stack align="center">
      <Text>
        This Error is not handled and will show up in the browser console:
      </Text>
      <Button loading={isIdLoading('no-handling')} onClick={noHandling}>
        No Error Handling
      </Button>
      <Text>This Error is handled and will show a notification:</Text>
      <Button
        loading={isIdLoading('error-handled')}
        onClick={errorHandling}
        color="teal"
      >
        Error Handled
      </Button>
    </Stack>
  );
}
