import { UID, USER, COMPANYJOBPOSTED, ACCOUNTS } from "./Action";

let initialState = {
  user: [],
  companyJobPost: [],
  accounts: [],
  uid: false,
  loading: true,
  
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UID:
      return {
        ...state,
        uid: action.payload,
      };
    case USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case COMPANYJOBPOSTED:
      return {
        ...state,
        loading: false,
        companyJobPost: action.payload ? action.payload : [],
      };
    case ACCOUNTS:
      return {
        ...state,
        accounts: action.payload ? action.payload : [],
        loading: false,
      };
    default:
      return state;
  }
};

export default Reducer;
