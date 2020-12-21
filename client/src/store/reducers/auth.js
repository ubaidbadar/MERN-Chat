import { USER_STATE } from "../actionTypes";

const user = (state = 'initial', { type, payload }) => type === USER_STATE ? payload : state;

export default user;