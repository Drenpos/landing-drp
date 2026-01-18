import DynamicIcon from "@/helpers/DynamicIcon";
import React from "react";

const Button = ({
  label,
  link,
  style,
}: {
  label: string;
  link: string;
  style?: string;
}) => {
  return (
    <a
      className={`${style === "dark" ? "btn-dark !text-white" : "btn-light"} btn no-underline`}
      href={link}
      target={link.startsWith("http") ? "_blank" : "_self"}
      rel="noopener"
    >
      {label}
      <span className="sr-only">Details</span>
      <span className="icon-wrapper">
        <span className="icon">
          <DynamicIcon icon="FaArrowRight" />
        </span>
        <span className="icon" aria-hidden="true">
          <DynamicIcon icon="FaArrowRight" />
        </span>
      </span>
    </a>
  );
};

export default Button;
