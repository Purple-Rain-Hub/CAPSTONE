import { jwtDecode } from "jwt-decode"

const rawToken = localStorage.getItem("jwtToken");

let initialRole = null;
if (rawToken) {
    try {
        const decoded = jwtDecode(rawToken);
        initialRole = decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
    } catch {
        initialRole = null;
    }
}

const initialState = {
    survey: {
        content: []
    },
    auth: {
        token: rawToken,
        role: initialRole,
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
                    token: action.payload.token,
                    role: action.payload.role,
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