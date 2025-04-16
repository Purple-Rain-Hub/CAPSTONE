export const postNewSurvey = (newSurvey) => {
    return async () => {
        try {
            const response = await fetch(
                //inserire fetch per backend
                {
                    method: "POST",
                    body: newSurvey
                }
            )
            if (response.ok) {
                console.log("post effettuata con successo");
            } else throw new Error("errore nel POST del survey")
        } catch (error) {
            console.error("ERRORE POST" + error)
        }
    }
}