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
export function getReadableExperience(startDate: Date): string {
  const now = new Date();
  const monthsDiff =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());

  const totalYears = monthsDiff / 12;
  const rounded = parseFloat(totalYears.toFixed(1));

  const yearPart = Math.floor(rounded);
  const decimalPart = rounded - yearPart;

  if (decimalPart >= 0.6) {
    return `around ${yearPart + 1} years of experience`;
  } else {
    return `with ${rounded} years experience`;
  }
}
export const experienceString = getReadableExperience(
  new Date("2021-01-01")
);

export const ROUTES = {
  HOME: "/",
  PROJECT: "/projects",
  SKILLS: "/skills",
  PROFILE: "/profile",
  EDVENTURE:"/edventure",
  JOIN:"/join"
} as const;
