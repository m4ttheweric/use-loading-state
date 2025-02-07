import { NavLink } from '@mantine/core';

export function Link({ label, href }: { label: string; href: string }) {
  return (
    <NavLink
      key={label}
      color="blue"
      fw={500}
      fz={'lg'}
      label={label}
      href={href}
      active={location.hash === href}
    />
  );
}
