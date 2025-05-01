//creazione nuovo questionario
export const postNewSurvey = (newSurvey) => {
    return async (getState) => {
        try {
            const token = getState().auth.token;

            const response = await fetch(
                "https://localhost:7019/api/Survey",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        surveyQuestions: newSurvey,
                    }),
                }
            )
            if (response.ok) {
                console.log("post effettuata con successo ");
                return true
            } else throw new Error("errore nel POST del survey ");
        } catch (error) {
            console.error("ERRORE POST SURVEY " + error)
            return false
        }
    }
}

//ottenimento questionario
export const getSurvey = () => {
    return async (getState) => {
        try {
            const token = getState().auth.token;

            const response = await fetch(
                "https://localhost:7019/api/Survey", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
            )
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data;
            } else throw new Error("errore nella GET del survey ");
        } catch (error) {
            console.error("ERRORE GET SURVEY " + error);
            return null;
        }
    }
}

//invio questionario compilato e ritorno dei risultati
export const handleSurvey = (submitSurvey) => {
    return async (getState) => {
        try {
            const token = getState().auth.token;

            const response = await fetch(
                "https://localhost:7019/api/Results",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(submitSurvey),
                }
            )
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data;
            } else throw new Error("Errore nel fetch dei risultati ")
        } catch (error) {
            console.error("ERRORE HANDLE SURVEY: " + error);
            return null;
        }
    }
}


//fetch per registrazione
export const register = (registerInfo) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://localhost:7019/api/Account/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerInfo)
            });
            if (response.ok) {
                dispatch({ type: "REGISTER_SUCCESS" });
                return true;
            }
            else {
                const message = await response.json();
                throw new Error(message);

            }
        } catch (err) {
            console.error("errore nella registrazione: ", err);
            dispatch({ type: "REGISTER_FAILURE", error: err.message });
            return false;
        }
    }
}

//fetch per loigin
export const login = (loginInfo) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://localhost:7019/api/Account/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo)
            })
            if (response.ok) {
                const token = await response.json();
                localStorage.setItem("jwtToken", token);
                dispatch({ type: "LOGIN_SUCCESS", payload: token });
                return true;
            }
            else {
                const message = await response.json();
                throw new Error(message);

            }
        } catch (err) {
            console.error("errore nel login: ", err);
            dispatch({ type: "LOGIN_FAILURE", error: err.message });
            return false;
        }
    }
}

//logout
export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem("jwtToken");
        dispatch({ type: "LOGOUT" });
    }
}