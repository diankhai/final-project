import { createStore } from "redux";
import { tokenReducer } from "./reducer";

const store = createStore(tokenReducer, {value:''});

export default store;
