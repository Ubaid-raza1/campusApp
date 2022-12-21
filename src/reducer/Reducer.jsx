import { UID, COMPANYJOBPOSTED, ACCOUNTS, NOTUSER } from "./Action";

let initialState = {
  user: {},
  companyJobPost: [],
  accounts: [],
  uid: "",
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

    case COMPANYJOBPOSTED:
      return {
        ...state,
        companyJobPost: action.payload || [],
        jobPostLoading: false,
      };
    case ACCOUNTS:
      return {
        ...state,
        accounts: action.payload || [],
        user: Object.values(action.payload).find(
          (item) => item?.uid === state?.uid
        ),
        accountsLoading: false,
      };
    case NOTUSER:
      return {
        ...state,
        user: {},
        companyJobPost: [],
        accounts: [],
        uid: "",
        jobPostLoading: false,
        accountsLoading: false,
      };
    default:
      return state;
  }
};

export default Reducer;
