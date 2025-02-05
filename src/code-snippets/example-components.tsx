/**
 * This file's contents will be consumed into code snippets for documentation use package script:
 * bun run create-code-snippets
 *
 * see scripts/create-code-snippets.ts for details
 */

import { useState } from 'react';
import { Button, Group, Switch } from '@mantine/core';

import { useLoadingState } from '../../lib/useLoadingState';

export function SingleItem() {
  // state code:
  const [runTask, { isLoading }] = useLoadingState();

  function handleClick() {
    runTask(() => {
      // pass a function that returns a promise or use async/await
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 3000);
      });
    });
  }
  return (
    // component code:
    <Button
      // use the isLoading flag to set the loading state of the button:
      loading={isLoading}
      onClick={handleClick}
    >
      Click To Run Task
    </Button>
  );
}

//an array of 10 items that has an id property and a name
const data = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  name: `Item ${i}`,
}));

export function ManyItems() {
  // track as many loading states as you want with a single line of code:
  const [runTask, { isLoading, isIdLoading }] = useLoadingState();
  const [oneAtATime, setOneAtATime] = useState(false);

  function handleItemClick(id: string) {
    runTask({
      loadingId: id,
      task: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(true);
          }, 3000);
        });
      },
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
