import { createContext, useContext } from "react";

import ApiClient from "../ApiClient";

const ApiContext = createContext();


const ApiProvider = ({children}) =>{
    const api = new ApiClient();
    return(
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    )
}
export default ApiProvider

export const useApi = () => (useContext(ApiContext))


