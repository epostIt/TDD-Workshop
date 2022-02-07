import { getLukeAPI } from "./SWAPI";

export const getLuke = () => {
  return getLukeAPI();
};

export const callMe = () => {
  return "this is a function";
};

export const callingCallMe = () => {
  return callMe();
};
