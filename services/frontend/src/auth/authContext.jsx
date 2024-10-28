import React, {createContext,useState, useContext} from "react";


//Contexto de authenticacion
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthToken(null);
    }

    return(
        <AuthContext.Provider value={{authToken,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

//Hook para usar contexto en otros componentes
export const useAuth = () => useContext(AuthContext);