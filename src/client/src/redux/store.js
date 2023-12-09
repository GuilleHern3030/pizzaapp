import { configureStore } from '@reduxjs/toolkit'

// Reducers
import articlesReducer from './reducers/articles/articlesSlice'

export default configureStore({
    reducer: {
        articles: articlesReducer
    }
})

