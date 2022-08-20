import {NavigationRoute} from "../types/matx/navigations";

export const navigations : NavigationRoute[]  = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'PAGES', type: 'label' },
  {
    name: 'Session/Auth',
    icon: 'security',
    children: [
      { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      { name: 'Sign up', iconText: 'SU', path: '/session/signup' },

      { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      { name: 'EmailSentSuccessfully', iconText: 'SS', path: '/session/forgot-password/sent' },
      { name: 'PasswordReset', iconText: 'PR', path: '/session/password-reset/:id/:token' },

      { name: 'Error', iconText: '404', path: '/session/404' },
    ],
  },
  { label: 'Components', type: 'label' },
  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
      { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Form', path: '/material/form', iconText: 'F' },
      { name: 'Icons', path: '/material/icons', iconText: 'I' },
      { name: 'Menu', path: '/material/menu', iconText: 'M' },
      { name: 'Progress', path: '/material/progress', iconText: 'P' },
      { name: 'Radio', path: '/material/radio', iconText: 'R' },
      { name: 'Switch', path: '/material/switch', iconText: 'S' },
      { name: 'Slider', path: '/material/slider', iconText: 'S' },
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      { name: 'Table', path: '/material/table', iconText: 'T' },
    ],
  },
  {
    name: 'Charts',
    icon: 'trending_up',
    children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  },
  {
    name: 'Documentation',
    icon: 'launch',
    type: 'extLink',
    path: 'http://demos.ui-lib.com/matx-react-doc/',
  },

  {
    name: 'Users',
    icon: 'dashboard',
    children: [
      { name: 'Employees', path: '/employees', iconText: 'E' },
      { name: 'Customers', path: '/customers', iconText: 'C' },
    ]

  },

  { name: 'Orders', path: '/orders', icon: 'dashboard' },

  { name: 'Projects', path: '/projects', icon: 'dashboard' },

  { name: 'Vacancies', path: '/vacancies', icon: 'dashboard' },

  { name: 'Statistic', path: '/statistic', icon: 'dashboard' },

  { name: 'Event Calendar', path: '/events', icon: 'event' },

  { name: 'Chat', path: '/chats', icon: 'chat' },

  { name: 'News', path: '/news', icon: 'chat' },

  {
    name: 'Tidio',
    icon: 'chat_bubble_outline',
    type: 'extLink',
    path: 'https://www.tidio.com/panel',
  },

];
