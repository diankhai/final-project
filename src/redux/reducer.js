export const tokenReducer = (state, action) => {
    switch (action.type) {
      case "save":
        return {
          value: action.payload
        };
      default:
        return state;
    }
  };