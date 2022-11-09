let initialState = {
  user: [],
  companyJobPost: [],
  accounts: [],
  uid: false,
  loading: true,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "user":
      return {
        ...state,
        user: action.payload,
      };

    case "uid":
      return {
        ...state,
        uid: action.payload,
        loading: false,
      };

    case "companyData":
      return {
        ...state,
        companyJobPost: action.payload ? action.payload : [],
      };
    case "accounts":
      return {
        ...state,
        accounts: action.payload ? action.payload : [],
      };

    default:
      return state;
  }
};

export default Reducer;
