import ProjectCard from "@/components/Works/ProjectCard";
import { Meta, StoryObj } from "@storybook/react";

type ProjectCardType = typeof ProjectCard;

const ProjectCardMeta: Meta<ProjectCardType> = {
  title: "Components/ProjectCard",
  component: ProjectCard,
  tags: ["component", "Card"],
};
type Story = StoryObj<ProjectCardType>;
export const ProjectCardStory: Story = {
  args: {
    post: {
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
  },
};
export default ProjectCardMeta;
