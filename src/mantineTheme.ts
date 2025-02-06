import { createTheme, Group } from '@mantine/core';

export const mantineTheme = createTheme({
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  primaryColor: 'gray',
  primaryShade: 7,
  defaultRadius: 'lg',
  cursorType: 'pointer',
  headings: {
    fontWeight: '500',
  },
  components: {
    Group: Group.extend({
      defaultProps: {
        wrap: 'nowrap',
      },
    }),
  },
});
