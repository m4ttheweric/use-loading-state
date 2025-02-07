import { CodeHighlight } from '@mantine/code-highlight';
import { Card, List, Stack, Text, Title } from '@mantine/core';

import { TitleLink } from './TitleLink';

const singleTaskLoadingCode = `const [isLoading, setIsLoading] = useState(false);

async function handleClick() {
   setIsLoading(true);
   try {
      await mockNetworkRequest();
   } catch {
      // Handle your error
   }
   setIsLoading(false);
}`;

const multipleTaskLoadingCode = `const [isLoading, setIsLoading] = useState(false);

async function handleClick() {
   setIsLoading(true);
   await mockNetworkRequest();
   setIsLoading(false);
}

{mockItems.map((_, i) => (
   <Button loading={isLoading} onClick={handleClick} key={i}>
      Run Item {i + 1}'s Task
   </Button>
))}`;

const trackingEachItemCode = `const [loadingIndexes, setLoadingIndexes] = useState<number[]>([]);

async function handleClick(itemIndex: number) {
   setLoadingIndexes(prev => [...prev, itemIndex]);
   await mockNetworkRequest();
   setLoadingIndexes(prev => prev.filter(i => i !== itemIndex));
}`;

export function OldWays() {
  return (
    <>
      <Stack id="old-ways">
        <TitleLink hashLink="#old-ways" title={'😭 The Old Way'} order={2} />
        <Title order={3}>Single Task Loading</Title>
        <Text>Managing a single loading state manually isn't too bad:</Text>
        <Card>
          <Card.Section>
            <CodeHighlight
              withCopyButton={false}
              code={singleTaskLoadingCode}
            />
          </Card.Section>
        </Card>
        <Text>
          But this approach requires{' '}
          <Text fw={'bold'} span>
            {' '}
            manually setting the state before and after
          </Text>{' '}
          the async operation, which is easy to forget and prone to bugs.
        </Text>
        <Title order={3}>Multiple Task Loading</Title>
        <Text>
          What if you have multiple items, each with its own loading state?
        </Text>
        <Card>
          <Card.Section>
            <CodeHighlight
              withCopyButton={false}
              code={multipleTaskLoadingCode}
            />
          </Card.Section>
        </Card>
        <Text>
          Now, all buttons share the same loading state, even though only one
          task should be loading at a time.{' '}
          <Text fw={'bold'} span>
            Not great!
          </Text>
        </Text>
        <Text>
          A more "correct" approach involves{' '}
          <Text fw="bold" span>
            tracking each item separately
          </Text>
          , but the code gets messy:
        </Text>
        <Card>
          <Card.Section>
            <CodeHighlight withCopyButton={false} code={trackingEachItemCode} />
          </Card.Section>
        </Card>
        <Text>👎 Problems with this approach:</Text>
        <List>
          <List.Item>
            Requires manual state updates before and after the task.
          </List.Item>
          <List.Item>
            Uses an array to track state, leading to inefficient lookups.
          </List.Item>
          <List.Item>
            Clutters your code with state mutations that don't scale well.
          </List.Item>
        </List>
      </Stack>
    </>
  );
}
