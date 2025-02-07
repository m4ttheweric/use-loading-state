import { CodeHighlight } from '@mantine/code-highlight';
import { Card } from '@mantine/core';

import { pageLinks } from '../constants';
import { TitleLink } from './TitleLink';

export function BasicUsage() {
  return (
    <>
      <TitleLink
        hashLink={pageLinks['Basic Usage']}
        title="Basic Usage"
        order={2}
        mapHashToId
      />
      <Card>
        <Card.Section>
          <CodeHighlight
            code={`import { useLoadingState } from '@m4ttheweric/use-loading-state';

function BetterLoading() {
  const [runTask, { isLoading }] = useLoadingState();

  async function handleButtonClick() {
    // wrap your async task in the runTask function to automatically manage loading state! 🙌
    await runTask(() => someAsyncFunction());
  }

  return (
    <button onClick={handleButtonClick}>
      {isLoading ? 'Loading...' : 'Do Something Asynchronous!'}
    </button>
  );
}                
`}
          />
        </Card.Section>
      </Card>
    </>
  );
}
