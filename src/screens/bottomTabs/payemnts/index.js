import React, { useState, useEffect, useCallback } from "react";
import { AppRegistry, Text, View, Image, TouchableOpacity } from "react-native";
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import { PlaidLink, LinkSuccess, LinkExit, LinkLogLevel, LinkIOSPresentationStyle } from 'react-native-plaid-link-sdk';
const Payment = () => {
  const [sharedData, setSharedData] = useState("");
  const [sharedMimeType, setSharedMimeType] = useState("");
const createToken =()=>{
    
}

  return (
    <View style={{ flex: 1,backgroundColor:'#fff' }}>
    <PlaidLink
        tokenConfig={{
            token: "link-sandbox-abae3653-881d-4697-9618-b5d5bfad0005",
            // OPTIONAL - log level.
            logLevel: LinkLogLevel.ERROR,
            // OPTIONAL - Hides native activity indicator if true.
            noLoadingState: false,
        }}
        onSuccess={(success: LinkSuccess) => { createToken() }}
        onExit={(exit: LinkExit) => { console.log(exit) }}
        // OPTIONAL - MODAL or FULL_SCREEEN presentation on iOS. Defaults to MODAL.
        // UI is always presented in full screen on Android.
        iOSPresentationStyle={LinkIOSPresentationStyle.MODAL}
    >
        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:'100%'}}>
        <View style={{width:120,height:50,backgroundColor:'blue',justifyContent:'center',alignItems:"center"}}> 
        <Text style={{color:'#fff',fontWeight:'bold'}}>Connect  Bank</Text>
        </View>
        </View>
       
       
    </PlaidLink>
  
   
    </View>
  );
};
export default Payment;
