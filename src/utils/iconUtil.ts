import { Group } from "../models/Group";

const DEFAULT_ENVIRONMENT_ICON = 'fa-solid fa-mountain-sun';
const DEFAULT_ENVIRONMENT_ICON_COLOUR = '#A7A7A7'; // grey-5;

export const getIcon = (group: Group) => group.icon ?? DEFAULT_ENVIRONMENT_ICON;
export const getIconColour = (group: Group) => group.iconColour ?? DEFAULT_ENVIRONMENT_ICON_COLOUR;
