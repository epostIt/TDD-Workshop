import axios from "axios";

export const getLukeAPI = async () => {
  const result = await axios.get("https://swapi.dev/api/people/1");
  return result.data;
};
