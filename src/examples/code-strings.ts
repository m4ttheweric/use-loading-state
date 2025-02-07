// Auto-generated file - do not edit manually
export const BetterWaysCode = {
  SimpleCase: `function SimpleCase() {
  const [runTask, { isLoading }] = useLoadingState();

  async function handleClick() {
    // wrap your async task in the runTask function like this for simple cases.
    await runTask(() => mockAsyncOperation());
  }

  return (
    <Button loading={isLoading} onClick={handleClick}>
      Click To Run Task
    </Button>
  );
}`,
  ManyItems: `function ManyItems() {
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
}`,
  ErrorHandling: `function ErrorHandling() {
  const [runTask, { isIdLoading }] = useLoadingState<
    // useLoadingState accepts generics so you can specify your own loadingId types
    'no-handling' | 'error-handled'
  >();

  async function noHandling() {
    // look, no error handling is required!
    await runTask({
      loadingId: 'no-handling',
      task: () => mockAsyncError(),
    });
  }

  async function errorHandling() {
    // handle errors like this:
    await runTask({
      loadingId: 'error-handled',
      task: () =>
        mockAsyncError().catch(e => {
          // handle the error however you want
          notifications.show({
            color: 'red',
            message: e.message,
            icon: <IoMdAlert />,
            position: 'top-center',
          });
        }),
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
}`,
};
