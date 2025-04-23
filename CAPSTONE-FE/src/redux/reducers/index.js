const initialState = {
    //creo esempio di slice con nome generico
    survey: {
        content: []
    }
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_SURVEY_CONTENT":
            return {
                ...state,
                survey: {
                    ...state.survey,
                    content: [...state.survey.content, action.payload]
                }
            };
        case "RESET_SURVEY_CONTENT":
            return {
                ...state,
                survey: {
                    ...state.survey,
                    content: []
                }
            }
        default:
            return state;
    }
}

export default mainReducer;