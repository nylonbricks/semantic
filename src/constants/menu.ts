export const MENU = [
  { title: '🏠 Home', link: '/' },
  { title: '🎲 About', link: '/about' },
  { title: '🖥️ Projects', link: '/projects' },
  { title: '📟 Posts', link: '/posts' },
] as const;

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  POSTS: '/posts',
  CATEGORIES: '/categories',
  TAGS: '/tags',
} as const;
