export type Project = {
  num: string;
  title: string;
  description: string;
  stack: Array<{ name: string }>;
  image: string;
  live: string;
  github: string;
};

export type ProjectCategory = {
  "web-development": Project[];
  "ui-ux": Project[];
  "physical-modeling": Project[];
  "data-science": Project[];
  animation: Project[];
  "game-development": Project[];
  misc: Project[];
};
