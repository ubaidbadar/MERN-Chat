import { SEARCH_USER } from "../actionTypes"

const search = (state = [], { type, payload }) => type === SEARCH_USER ? payload : state;

export default search;