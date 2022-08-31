import { createContext,useContext } from "react";
import { useWindowDimensions } from "react-native";
import Theme from "../styling/Theme";



const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const dimensions = useWindowDimensions();
    const theme = new Theme(dimensions)
    return(
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )

};

export default ThemeProvider
export const useTheme = ()=>(useContext(ThemeContext))