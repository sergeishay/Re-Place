const AppStore = (state = { book: [] }, action) => {
  switch (action.type) {
    case "EditBook":
      return { ...state, book: [...state.book, action.payload] };

    case "ClearBook":
      let arr = [];
      return { ...state, book: arr };

    default:
      return state;
  }
};

export default AppStore;
