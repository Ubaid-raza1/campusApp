import { UID, USER, COMPANYJOBPOSTED, ACCOUNTS, NOTUSER } from "./Action";

let initialState = {
  user: {},
  companyJobPost: [],
  accounts: [],
  uid: "",
  loading: true,
  accountsLoading: true,
  jobPostLoading: true,
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
        companyJobPost: action.payload ? action.payload : [],
        jobPostLoading: false,
      };
    case ACCOUNTS:
      return {
        ...state,
        accounts: action.payload ? action.payload : [],
        accountsLoading:false
      };
    case NOTUSER:
      return {
        ...state,
        user: {},
        companyJobPost: [],
        accounts: [],
        uid: "",
        loading: false,
        jobPostLoading: false,
        accountsLoading:false
      };
    default:
      return state;
  }
};

export default Reducer;
