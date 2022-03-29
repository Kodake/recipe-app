import { createContext, useReducer } from 'react';

export const ThemeContext = createContext({} as any);

export interface ThemeState {
    type?: 'CHANGE_COLOR' | 'CHANGE_MODE';
    color: string;
    mode: 'light' | 'dark';
}

const themeInicialState: ThemeState = {
    color: '#58249c',
    mode: 'light'
}

const themeReducer = (state: ThemeState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, color: action.payload };
        case 'CHANGE_MODE':
            return { ...state, mode: action.payload };
        default:
            return state;
    }
}

export const ThemeProvider = ({ children }: any) => {
    // Declaring the reducer
    const [state, dispatch] = useReducer(themeReducer, themeInicialState);

    // Custom logic
    const changeColor = (color: string) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color });
    }

    const changeMode = (mode: string) => {        
        dispatch({ type: 'CHANGE_MODE', payload: mode });
    }

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                changeColor,
                changeMode
            }}>
            {children}
        </ThemeContext.Provider>
    );
}