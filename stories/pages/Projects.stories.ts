import { Meta, StoryObj } from "@storybook/react";
import Projects from "pages/projects";

type ProjectsType = typeof Projects;

const ProjectsMeta: Meta<ProjectsType> = {
  title: "Pages/Projects",
  component: Projects,
  tags: ["pages", "Card"],
};
type Story = StoryObj<ProjectsType>;
export const ProjectCardStory: Story = {
  args: {
    posts: [
      {
        slug: "cytrellis-ellacor",
        frontmatter: {
            id: 1,
            year: "2023",
          title: "Cytrellis Ellacor",
          date: "March 12, 2023",
          timeline: "March 12, 2023 - ongoing",
          excerpt:
            "This platform connect physician and patient for skins problems, where patient can apply for appointment. Created crud operation on physician, patient, clinic and survey mananagement",
          cover_image: "/images/posts/img7.jpg",
          technology: [
            { title: "React", link: "https://react.dev/" },
            { title: "Typescript", link: "https://www.typescriptlang.org/" },
            { title: "Redux", link: "https://redux.js.org/" },
            { title: "tailwind", link: "https://tailwindcss.com/" },
            {
              title: "React big calendar",
              link: "https://jquense.github.io/react-big-calendar/examples/index.html?path=/story/about-big-calendar--page",
            },
          ],
          roles: [
            "Implemented OTP-based authentication with countdown timer, JWT authorization, and 1-hour inactivity logout.",
            "Integrated highly interactive Google Maps, Charts, and React big calendar for managing appointments with patients.",
            "Set up and integrate Shopify API using Apollo GraphQL for seamless data sync between the application and Shopify.",
            "In-housing most used hooks and creating custom hooks to separate the logic from UI.",
          ],
          appurl: "http://44.208.240.120",
        },
      },
      {
        slug: "nielsen",
        frontmatter: {
            id: 2,
            year: "2023",
          title: "NielsenIQ",
          date: "March 12, 2023",
          timeline: "July 2022 - Mar 2023",
          excerpt:
            "NIQ delivers the most complete and clear understanding of consumer buying behavior through an advanced business intelligence platform with integrated predictive analytics.",
          cover_image: "/images/posts/img7.jpg",
          technology: [
            { title: "React", link: "https://react.dev/" },
            { title: "Typescript", link: "https://www.typescriptlang.org/" },
            { title: "Redux", link: "https://redux.js.org/" },
            { title: "tailwind", link: "https://tailwindcss.com/" },
            {
              title: "React big calendar",
              link: "https://jquense.github.io/react-big-calendar/examples/index.html?path=/story/about-big-calendar--page",
            },
          ],
          
          roles: [
            "Migrated modules (RMS-BO, IQCT, Navigator) from EXTJS to ReactJS, while also managing 6 language localizations using react-i18next and implemented proxy for CORS, and enabled requests to different IPs.",
            "Created server-side editable grids and data-heavy components using redux-thunk workflow.",
            "Integrated a map feature for drawing auditor route paths and displaying store details",
            "Integrated react-big-calendar for scheduling auditor slots",
          ],
          appurl: "https://uat3.navigator.nielseniq.io/fmsnavigator",
        },
      },
      {
        slug: "curebay",
        frontmatter: {
            id: 2,
            year: "2022",
          title: "CureBay",
          date: "Oct 12, 2022",
          timeline: "May 2022 - Oct 2022",
          excerpt:
            "Introduced a hybrid healthcare and fulfillment model that helps connect patients in underserved markets to healthcare providers and other key ecosystem players digitally.",
          cover_image: "/images/posts/img7.jpg",
          technology: [
            { title: "React", link: "https://react.dev/" },
            { title: "Redux", link: "https://redux.js.org/" },
          ],
          roles: [
            "Implemented on-scroll loading data using Intersection observer with redux-saga workflow.",
            "Integrated interactive charts for visual graphs, react-dropzone for drag and drop files, and react-calender library",
            "Created custom hooks to encapsulate reusable logic and functionality, enhancing code modularity and reusability.",
          ],
          appurl: "https://curebay.com/",
        },
      },
    ],
  },
};
export default ProjectsMeta;
