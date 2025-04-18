const initialState = {
    //creo esempio di slice con nome generico
    survey: {
        content: [{
            question: "",
            answer: "",
            points: 0,
            gamesId: [""]
        }]
    }
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default mainReducer;