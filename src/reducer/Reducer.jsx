let initialState = {
  user: [],
  companyJobPost: [],
  accounts: [],
  uid: false,
  loading: true,
  imageUrl: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "user":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case "uid":
      return {
        ...state,
        uid: action.payload,
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
    case "imageUrl":
      return {
        ...state,
        imageUrl: [...state, action.payload],
      };

    default:
      return state;
  }
};

export default Reducer;
