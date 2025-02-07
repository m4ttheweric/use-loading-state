import { Anchor, Group, Title, TitleProps } from '@mantine/core';
import { FaLink } from 'react-icons/fa';

export function TitleLink({
  hashLink,
  title,
  order,
  mapHashToId = false,
}: {
  hashLink: string;
  title: React.ReactNode;
  order: TitleProps['order'];
  mapHashToId?: boolean;
}) {
  return (
    <Anchor
      id={mapHashToId ? hashLink.replace('#', '') : undefined}
      href={hashLink}
    >
      <Group>
        <FaLink />
        <Title order={order}>{title}</Title>
      </Group>
    </Anchor>
  );
}
