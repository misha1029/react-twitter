import axios from "axios";
import { TagsState } from "../../store/ducks/tags/contracts/state";

export const TagsApi = {
  fetchTags(): Promise<TagsState["items"]> {
    return axios.get("http://localhost:3000/themes").then(({ data }) => data);
  },
};
