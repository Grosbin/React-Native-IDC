import React, {createContext, useEffect, useReducer, useState} from 'react';
import {Appearance, AppState, useColorScheme} from 'react-native';
import {useLocalStorage} from '../hooks/useLocalStorage';

import {
  ThemeState,
  themeReducer,
  lightTheme,
  darkTheme,
} from '../reducer/themeReducer';

interface ThemeContexProps {
  theme: ThemeState;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

export const ThemeContex = createContext({} as ThemeContexProps);
export const ThemeProvider = ({children}: any) => {
  const [theme, dispatch] = useReducer(themeReducer, lightTheme);

  // useEffect(() => {
  //   getDateTheme();
  // }, []);

  const setDarkTheme = () => {
    dispatch({type: 'set_dark_theme'});
    return console.log('SetDarkTheme Activado');
  };
  const setLightTheme = () => {
    dispatch({type: 'set_lingt_theme'});
    return console.log('SetLingtTheme Activado');
  };

  return (
    <ThemeContex.Provider value={{theme, setDarkTheme, setLightTheme}}>
      {children}
    </ThemeContex.Provider>
  );
};
