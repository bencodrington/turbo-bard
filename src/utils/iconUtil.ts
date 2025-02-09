import { Group } from "../models/Group";

const DEFAULT_ENVIRONMENT_ICON = 'mountain-sun';
const DEFAULT_ENVIRONMENT_ICON_COLOUR = '#A7A7A7'; // grey-5;
export const DEFAULT_ICON_OPTIONS = [
  // TODO: flesh out this list
  'burst',
  'bell',
  'snowflake'
]
export const ICON_COLOUR_OPTIONS = [
  DEFAULT_ENVIRONMENT_ICON_COLOUR,
  '#73B2FD', // Blue
  '#E581FE', // Pink
  '#F87C7C', // Red
  '#DCC343', // Yellow
  '#9CC870', // Green
]


export const getIcon = (group: Group) => `fa-solid fa-${group.icon ?? DEFAULT_ENVIRONMENT_ICON}`;
export const getIconColour = (group: Group) => group.iconColour ?? DEFAULT_ENVIRONMENT_ICON_COLOUR;
