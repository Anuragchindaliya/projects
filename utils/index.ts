interface PostDateI {
  slug: string;
  frontmatter: {
    [key: string]: any;
  };
}
export const sortByDate = (a: PostDateI, b: PostDateI) => {
  return (
    new Date(b.frontmatter.date).getTime() -
    new Date(a.frontmatter.date).getTime()
  );
};
export const ROUTES = {
  HOME: "/",
  PROJECT: "/project",
  SKILLS: "/skills",
  PROFILE: "/profile",
} as const;
