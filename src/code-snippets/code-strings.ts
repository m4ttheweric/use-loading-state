// Auto-generated file - do not edit manually
export const BetterWaysCode = {
  SimpleCase: `function SimpleCase() {
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
}`,
  ErrorHandling: `function ErrorHandling() {
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
}`,
  ManyItems: `function ManyItems() {
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
}`,
};

export const OldWaysCode = {
  SingleItem: `function SingleItem() {
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
}`,
  ManyItemsSingleFlag: `function ManyItemsSingleFlag() {
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
}`,
  ManyItemsMultipleFlags: `function ManyItemsMultipleFlags() {
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
}`,
};
