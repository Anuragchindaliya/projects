export interface PostI {
  slug: string;
  frontmatter: FrontmatterI;
}
type technology = {
  title:string;
  link:string;
}
export interface FrontmatterI {
  id: number;
  title: string;
  date: string;
  timeline: string;
  excerpt: string;
  cover_image: string;
  technology: {
      title: string;
      link: string;
  }[];
  roles: string[];
  appurl: string;
  year:string;
}
