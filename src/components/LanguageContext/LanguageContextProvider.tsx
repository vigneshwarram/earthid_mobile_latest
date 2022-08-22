import { StyleSheet } from 'react-native'
import React, { createContext, useState } from 'react'
import { AppLanguage } from '../Languages/Languages';
import App from '../../../App';


export const LanguageContext =createContext<any>({})

const languageSelectedFailCountMetric = 'LanguageSelectedFailCount_';


const LanguageContextProvider = ({children}:any) => {

    const[languageCode,SetLanguageCode]=useState(AppLanguage.ENGLISH)

    const changeLanguagePreference = async (
        newLanguagePreference:AppLanguage,
        metricEventSource: string
      ): Promise<void> => {
        if (newLanguagePreference) {
          // Setting language in the local context and MAP Settings
          SetLanguageCode(newLanguagePreference);
        //  artNativeMap.setMAPSettings(mapSettingsConfig(newLanguagePreference));
        }
      };
    
  return (
    <LanguageContext.Provider
    value={{
      languageCode,
      changeLanguagePreference
    }}>
    {children}
  </LanguageContext.Provider>
  )
}

export default LanguageContextProvider

const styles = StyleSheet.create({})