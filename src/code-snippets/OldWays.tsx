import { useState } from 'react';
import { Button, Code, Group, Stack, Text } from '@mantine/core';

import { mockItems, mockNetworkRequest } from './utils';

// @extract
export function SingleItem() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    // manually set loading state
    setIsLoading(true);

    try {
      await mockNetworkRequest();
    } catch {
      // handle your error!
    }

    // you have to remember to set loading state back to false
    setIsLoading(false);
  }

  return (
    <Stack align="center">
      <Text>Manually manging the state with a single item is not too bad!</Text>
      <Button loading={isLoading} onClick={handleClick} size="xs">
        Click To Run Task
      </Button>
    </Stack>
  );
}

// @extract
export function ManyItemsSingleFlag() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    // manually set loading state
    setIsLoading(true);

    try {
      await mockNetworkRequest();
    } catch {
      // handle your error!
    }
    // you have to remember to set loading state back to false
    setIsLoading(false);
  }

  return (
    <Stack align="center">
      <Text>
        But what do you do when there are many items? This is not ideal 😅
      </Text>
      {mockItems.map((_, i) => (
        <Button loading={isLoading} onClick={handleClick} size="xs" key={i}>
          Run Item {i + 1}'s Task
        </Button>
      ))}
    </Stack>
  );
}

// @extract
export function ManyItemsMultipleFlags() {
  const [loadingIndexes, setLoadingIndexes] = useState<number[]>([]);

  async function handleClick(itemIndex: number) {
    // mutate the array to add your item index
    setLoadingIndexes(prev => [...prev, itemIndex]);

    try {
      await mockNetworkRequest();
    } catch {
      // handle your error!
    }
    // perform an arra filter to remove your item index
    setLoadingIndexes(prev => prev.filter(i => i !== itemIndex));
  }

  return (
    <Stack align="start">
      <Text>
        This example uses a state array of indexes to represent loading items.
      </Text>
      <Text>
        While this works, we have to mutate the array state before and after our
        task. This is cumbersome, litters your code with state management, and
        won't scale well if there are many items.
      </Text>
      <Text>
        <Code>useLoadingState()</Code> uses <Code>Set</Code>'s under the hood to
        ensure the best performance, and handles managing the state so you don't
        have to litter your code with state mutations!
      </Text>
      <Group wrap="wrap">
        {mockItems.map((_, i) => (
          <Button
            loading={loadingIndexes.includes(i)}
            onClick={() => handleClick(i)}
            size="xs"
            key={i}
          >
            Run Item {i + 1}'s Task
          </Button>
        ))}
      </Group>
    </Stack>
  );
}
