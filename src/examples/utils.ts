export function mockAsyncOperation(props: { throwError?: boolean } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (props.throwError) {
        reject(new Error('Some kind of mysterious network error!'));
      }
      resolve(true);
    }, 3000);
  });
}

export function mockAsyncError() {
  return mockAsyncOperation({ throwError: true });
}

//an array of 10 items that has an id property and a name
export const mockItems = Array.from({ length: 5 }, (_, i) => ({
  id: i.toString(),
  name: `Item ${i}`,
}));
