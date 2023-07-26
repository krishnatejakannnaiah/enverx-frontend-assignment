import { actionsConstants } from "../constants/actionsConstants";
const initState = {expences: []}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionsConstants.ADD_EXPENCE: {
            return {
                ...state, expences: [...state.expences, action.payload]
            }
        }
        case actionsConstants.REMOVE_EXPENCE: {
            const updatedExpences = state.expences.filter((expences) => expences.id !== action.payload);
            return {
                ...state,
                expences: updatedExpences
            }
        }
        case actionsConstants.SET_EXPENCES:{
            return {
                ...state,
                expences: action.payload,
              }
        }
        case actionsConstants.EDIT_EXPENCES: {
            const updatedExpenceData = state.expences.map((expences) =>
                expences.id === action.payload.id ? action.payload : expences
            );
            return {
                ...state,
                expences: updatedExpenceData,
            };
        }
    
        default:
            return state;
    }
}

export const getTotalAmount = (state) => {
    return state.expences.reduce(
      (total, transaction) => total + parseFloat(transaction.amount),
      0
    );
  };

export default reducer;