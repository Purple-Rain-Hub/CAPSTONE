const initialState = {
    //creo esempio di slice con nome generico
    survey: {
        content: []
    },
    auth: {
        token: localStorage.getItem("jwtToken"),
        error: null,
    }
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        //SURVEY CASE
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
        //AUTH CASE
        case "LOGIN_SUCCESS":
            return {
                ...state,
                auth: {
                    token: action.payload,
                    error: null
                }
            }
        case "LOGIN_FAILURE":
            return {
                ...state,
                auth: {
                    ...state.auth,
                    error: action.error
                }
            }
        case "REGISTER_SUCCESS":
            return {
                ...state,
                auth: {
                    token: null,
                    error: null
                }
            }
        case "REGISTER_FAILURE":
            return {
                ...state,
                auth: {
                    token: null,
                    error: action.error
                }
            }
        case "LOGOUT":
            return {
                ...state,
                auth: {
                    token: null,
                    error: null
                }
            }
        default:
            return state;
    }
}

export default mainReducer;