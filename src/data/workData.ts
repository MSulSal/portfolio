import { ProjectCategory } from "@/types";

const data: ProjectCategory = {
  "web-development": [
    {
      num: "01",
      title: "e-ventory",
      description: "Online inventory record.",
      stack: [
        { name: "HTML 5" },
        { name: "Tailwind CSS" },
        { name: "React.js" },
        { name: "Express.js" },
      ],
      image: "/projects/web/e-ventory.png",
      live: "https://e-ventory-5q80.onrender.com/",
      github: "https://github.com/MSulSal/e-ventory",
    },
  ],
  "ui-ux": [
    {
      num: "01",
      title: "Miscellaneous",
      description: "Collection of small to larges UI/UX projects.",
      stack: [
        { name: "HTML 5" },
        { name: "CSS 3" },
        { name: "JavaScript" },
        { name: "React.js" },
      ],
      image: "/projects/ui/ui-contents.png",
      live: "https://msulsal.github.io/ui-contents",
      github: "https://github.com/MSulSal/ui-contents",
    },
    {
      num: "02",
      title: "Dashlytics",
      description: "Admin dashboard design for a data analytics company.",
      stack: [
        { name: "HTML 5" },
        { name: "CSS 3" },
        { name: "JavaScript" },
        { name: "React.js" },
      ],
      image: "/projects/ui/dashlytics.png",
      live: "https://dashlytics-beta.vercel.app/",
      github: "https://github.com/MSulSal/dashlytics",
    },
  ],
  "physical-modeling": [
    {
      num: "01",
      title: "The Nature of Code",
      description: `A collection of projects completed from or inspired by the book "The Nature of Code" by Daniel Shiffman`,
      stack: [
        { name: "React.js" },
        { name: "HTML" },
        { name: "CSS" },
        { name: "JavaScript" },
        { name: "P5.js" },
      ],
      image: "/projects/physical-modeling/force.png",
      live: "https://msulsal.github.io/nature-of-code",
      github: "https://github.com/MSulSal/nature-of-code",
    },
  ],
  "data-analytics": [
    {
      num: "",
      title: "",
      description: "",
      stack: [{ name: "" }, { name: "" }, { name: "" }, { name: "" }],
      image: "/",
      live: "",
      github: "",
    },
  ],
};

export default data;
