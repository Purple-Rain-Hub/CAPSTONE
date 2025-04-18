export const postNewSurvey = (newSurvey) => {
    return async () => {
        try {
            const response = await fetch(
                "https://localhost:7019/api/Survey",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
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

export const getSurvey = () => {
    return async () => {
        try {
            const response = await fetch(
                "https://localhost:7019/api/Survey",
            )
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data;
            } else throw new Error("errore nella GET del survey ")
        } catch (error) {
            console.error("ERRORE GET SURVEY " + error)
            return null
        }
    }
}