// Auto-generated file - do not edit manually
export const OldWayCode = `function OldWay() {
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
}`;

export const SimpleCaseCode = `function SimpleCase() {
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
}`;

export const ErrorHandlingCode = `function ErrorHandling() {
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
}`;

export const ManyItemsCode = `function ManyItems() {
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
      {data.map(item => (
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
    </>
  );
}`;