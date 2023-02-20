
import React, { useState, useEffect, useCallback } from "react";
import { AppRegistry, Text, View, Image, Button } from "react-native";
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
const Share = () => {
    const [sharedData, setSharedData] = useState("");
    const [sharedMimeType, setSharedMimeType] = useState("");
  
    useEffect(() => {
      ShareMenuReactView.data().then(async({ mimeType, data }) => {
        console.log('data[0]?.data',data[0]?.mimeType)
        setSharedData(data[0]?.data);
        setSharedMimeType(data[0]?.mimeType);
      });
    
    }, []);
   console.log('sharedData===>',sharedData)
    return (
      <View style={{flex:1}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
       
          <Image style={{width:400,height:600,resizeMode:'contain'}} source={{ uri: sharedData }} />
        
        </View>
       
        <Button
          title="Dismiss"
          onPress={() => {
            ShareMenuReactView.dismissExtension();
          }}
        />
     {sharedData!=='' &&    <Button
          title="Continue In App With Extra Data"
          onPress={() => {
        
         //   ShareMenuReactView.continueInApp({ data:sharedData.toString() ,mimeType:sharedMimeType});
          }}
        />}
    
      
      
      </View>
    );
  };
  export default Share;
  