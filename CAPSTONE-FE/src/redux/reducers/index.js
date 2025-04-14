const initialState = {
    //creo esempio di slice con nome generico
    cart: {
        content: []
    }
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default mainReducer;