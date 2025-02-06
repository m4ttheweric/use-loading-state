import { ActionIcon, Group } from '@mantine/core';
import { DiNpm } from 'react-icons/di';
import { FaGithubAlt } from 'react-icons/fa';

const links = {
  github: 'https://github.com/m4ttheweric/use-loading-state',
  npm: 'https://www.npmjs.com/package/@m4ttheweric/use-loading-state',
};

export function SocialLinks() {
  return (
    <Group>
      <ActionIcon
        onClick={() => {
          window.open(links.github, '_blank');
        }}
        variant="subtle"
        size="lg"
      >
        <FaGithubAlt size={24} />
      </ActionIcon>
      <ActionIcon
        onClick={() => {
          window.open(links.npm, '_blank');
        }}
        variant="subtle"
        size="lg"
      >
        <DiNpm size={24} />
      </ActionIcon>
    </Group>
  );
}
