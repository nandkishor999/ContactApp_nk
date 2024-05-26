import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../features/userDetails";

export const store = configureStore({
    reducer: {
         app: userDetail,  // this is the name of the slice app is key and userDetail is value
    },

    });
