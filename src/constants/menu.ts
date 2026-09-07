export const MENU = [
  { link: "/", title: "🚽 Home" },
  { link: "/about", title: "🎲 About" },
  { link: "/posts", title: "📟 Posts" },
] as const;

export const ROUTES = {
  ABOUT: "/about",
  CATEGORIES: "/categories",
  HOME: "/",
  POSTS: "/posts",
  TAGS: "/tags",
} as const;
