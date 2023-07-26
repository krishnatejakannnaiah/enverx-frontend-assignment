import { actionsConstants } from "../constants/actionsConstants"
export const addExpence = ({
    description,
    category,
    amount
}) => {
    return {
        type: actionsConstants.ADD_EXPENCE,
        payload: {
            description,
            category,
            amount
        }
    }
}

export const setExpences = (expences) => ({
    type: actionsConstants.SET_EXPENCES,
    payload: expences
  });
  
  export const fetchExpences = () => ({
    type: actionsConstants.FETCH_EXPENCES,
  });

export const removeExpence = (id) => {
    return {
        type: actionsConstants.REMOVE_EXPENCE,
        payload: id
    }
}

export const editExpense = (expences) => ({
    type: actionsConstants.EDIT_EXPENCES,
    payload: expences,
  });