import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

import { profile } from "@/data/portfolioData";

const socials = [
  {
    icon: <FaGithub />,
    path: profile.github,
    label: "GitHub",
  },
  {
    icon: <FaLinkedinIn />,
    path: profile.linkedin,
    label: "LinkedIn",
  },
  {
    icon: <SiUpwork />,
    path: profile.upwork,
    label: "Upwork",
  },
];

interface SocialsProps {
  containerStyles: string;
  iconStyles: string;
}

const Socials = ({ containerStyles, iconStyles }: SocialsProps) => {
  return (
    <div className={containerStyles}>
      {socials.map((item) => (
        <Link
          key={item.label}
          href={item.path}
          className={iconStyles}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
