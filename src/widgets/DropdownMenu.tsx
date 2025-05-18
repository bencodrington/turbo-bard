import React, { useEffect, useRef } from "react";

import "./DropdownMenu.scss";

interface DropdownMenuOption {
  icon: string;
  label: string;
  className?: string;
  onClick: () => void;
}

type DropdownMenuProps = {
  options: DropdownMenuOption[];
  className?: string;
  closeDropdown: () => void;
};

export default function DropdownMenu({
  options,
  className,
  closeDropdown,
}: DropdownMenuProps) {
  const onOptionClick = (option: DropdownMenuOption) => {
    option.onClick();
    closeDropdown();
  };

  const dropdownElementRef = useRef(null);

  useEffect(() => {
    const onClickOutsideDropdown = (event: MouseEvent) => {
      const eventPath = event.composedPath();
      const element = dropdownElementRef.current;
      if (element !== null && !eventPath.includes(element)) {
        closeDropdown();
      }
    };
    window.addEventListener("click", onClickOutsideDropdown);
    return () => {
      window.removeEventListener("click", onClickOutsideDropdown);
    };
  });

  return (
    <ul
      className={"dropdown-menu-container " + (className ?? "")}
      ref={dropdownElementRef}
    >
      {options.map((option) => (
        <li
          onClick={() => onOptionClick(option)}
          key={option.label}
          className={option.className}
        >
          <i className={`fa fa-fw fa-${option.icon}`} />
          {option.label}
        </li>
      ))}
    </ul>
  );
}
