import React from "react";

import "./DropdownMenu.scss";

interface DropdownMenuOption {
  label: string;
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
  }

  return (
    <ul className={'dropdown-menu-container ' + className ?? ''}>
      {
        options.map(option =>
          <li onClick={() => onOptionClick(option)} key={option.label}>{option.label}</li>
        )
      }
    </ul>
  );
}