import { ActionIcon, Group } from '@mantine/core';
import { DiNpm } from 'react-icons/di';
import { FaGithubAlt } from 'react-icons/fa';

export function SocialLinks() {
  return (
    <Group>
      <ActionIcon variant="subtle" size="lg">
        <FaGithubAlt size={24} />
      </ActionIcon>
      <ActionIcon variant="subtle" size="lg">
        <DiNpm size={24} />
      </ActionIcon>
    </Group>
  );
}
