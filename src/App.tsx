import {
  Anchor,
  AppShell,
  Blockquote,
  Container,
  Group,
  NavLink,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { SiMantine } from 'react-icons/si';

import { BasicUsage } from './components/BasicUsage';
import { Examples } from './components/Examples';
import { GettingStarted } from './components/GettingStarted';
import { Link } from './components/Link';
import { OldWays } from './components/OldWays';
import { SocialLinks } from './components/SocialLinks';
import { pageLinks } from './constants';

function App() {
  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: {
          mobile: true,
          desktop: false,
        },
      }}
      padding={'lg'}
    >
      <AppShell.Header px={'md'}>
        <Group justify="space-between" h={'100%'}>
          <Text fw={500}>@m4ttheweric/use-loading-state</Text>
          <SocialLinks />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        {Object.entries(pageLinks).map(([label, href]) => {
          if (typeof href === 'string') {
            return <Link label={label} href={href} />;
          } else {
            return (
              <NavLink key={label} label={label} defaultOpened>
                {Object.entries(href).map(([subLabel, subHref]) => (
                  <Link label={subLabel} href={subHref} />
                ))}
              </NavLink>
            );
          }
        })}
      </AppShell.Navbar>
      <AppShell.Main>
        <Container component={Stack} fluid w={'100%'} maw={850}>
          <Stack gap={'xl'}>
            <Title>use-loading-state</Title>
            <Stack>
              <Text size="lg" fw={500}>
                Effortless Loading State Management for React
              </Text>
              <Blockquote>
                🙌 Free yourself from the hassle of manually managing loading
                states in your React components for async tasks.
              </Blockquote>
            </Stack>
            <GettingStarted />
            <BasicUsage />
            <OldWays />
            <Examples />
          </Stack>
          <Anchor href="https://mantine.dev/" target="_blank">
            <Group
              gap={'xs'}
              wrap="nowrap"
              mt={'4rem'}
              justify="flex-end"
              c={'muted'}
            >
              This project uses Mantine for it's UI and examples!{' '}
              <ThemeIcon
                color="blue"
                variant="subtle"
                size={'lg'}
                radius={'sm'}
              >
                <SiMantine size={30} />
              </ThemeIcon>
            </Group>
          </Anchor>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
