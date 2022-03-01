import { GET_DASHBOARD } from "./types";

const initialState = {
  dashboard: {},
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
