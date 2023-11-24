import React, { useState, useEffect, useCallback } from "react";
import { AppRegistry, Text, View, ActivityIndicator, Alert } from "react-native";
import ShareMenu, { ShareMenuReactView } from "react-native-share-menu";
import { dateTime } from "../../../utils/encryption";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  createUserSignature,
  saveDocuments,
} from "../../../redux/actions/authenticationAction";
import { PlaidLink, LinkSuccess, LinkExit, LinkLogLevel, LinkIOSPresentationStyle } from 'react-native-plaid-link-sdk';
const Payment = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useAppDispatch();
  const [bankdata, setBankDetails] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const documentsDetailsList = useAppSelector((state) => state.Documents);
  const [transactionDetails, setTransactionDetails] = useState(null);

const createToken =(success)=>{
  setBankDetails(success)   
  createAccessToken(success)
}

const createVerifiableCred=(verifyVcCred)=>{
  var date = dateTime();
  setLoading(true)
  var documentDetails: IDocumentProps = {
    id: `ID_VERIFICATION${Math.random()}${"selectedDocument"}${Math.random()}`,
    name: "Proof of Funds",
    path: "filePath",
    documentName: "Proof of Funds",
    categoryType: 'Finance',
    date: date?.date,
    time: date?.time,
    txId: "data?.result",
    // docType: verifyVcCred?.type[1],
    docExt: ".jpg",
    processedDoc: "",
    isVc: true,
    vc: JSON.stringify(verifyVcCred),
    verifiableCredential: verifyVcCred,
    docName: "",
    base64: undefined,
  };

  var DocumentList = documentsDetailsList?.responseData
    ? documentsDetailsList?.responseData
    : [];
    DocumentList.push(documentDetails);

  dispatch(saveDocuments(DocumentList)).then(()=>{
  setTimeout(()=>{
    setLoading(false)
      Alert.alert("Proof of fund generated successfully");
      props.navigation.navigate("Documents");
  },1000)
  })

}


const getTransactionDetails =(success)=>{
  const fetchData = async () => {
    setLoading(true)
    try {
      
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const response = await fetch('https://sandbox.plaid.com/transactions/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include additional headers here, such as authentication headers
        },
        body: JSON.stringify({
          client_id: '6554bf99082eed001dec1f49',
          secret: '00abb6e92f09a1893d430e5463d76b',
          access_token: success?.access_token,
          "start_date": "2018-01-01",
          "end_date": "2023-02-01",
        }),
      });
      const result = await response.json();
      
      // Check if the request was successful
      if (!response.ok) {
        setLoading(false)
        throw new Error('Network response was not ok');
      }
      console.log('setTransactionDetails',JSON.stringify(result))
      setTransactionDetails(result)
      createVerifiableCred(result?.accounts[0]?.balances)
      // Parse the JSON response
     // const result = await response.json();
      setLoading(false)

      // Set the data in the state
      //setData(result);
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}

const createAccessToken =(success)=>{
  const fetchData = async () => {
    setLoading(true)
    try {
      
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const response = await fetch('https://sandbox.plaid.com/item/public_token/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include additional headers here, such as authentication headers
        },
        body: JSON.stringify({
          client_id: '6554bf99082eed001dec1f49',
          secret: '00abb6e92f09a1893d430e5463d76b',
          public_token: success?.publicToken,
        }),
      });
      const result = await response.json();
      
      // Check if the request was successful
      if (!response.ok) {
        setLoading(false)
        throw new Error('Network response was not ok');
      }
      console.log('accessTokem',result)
      setAccessToken(result?.access_token)
      getTransactionDetails(result)
      // Parse the JSON response
     // const result = await response.json();
      setLoading(false)
      // Set the data in the state
      //setData(result);
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}


useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const response = await fetch('https://sandbox.plaid.com/link/token/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include additional headers here, such as authentication headers
        },
        body: JSON.stringify({
          client_id: '6554bf99082eed001dec1f49',
          secret: '00abb6e92f09a1893d430e5463d76b',
          client_name: 'Personal Finance App',
          user: {
            client_user_id: 'user-id',
            phone_number: '+1 415 5550123',
          },
          products: ['transactions'],
          language: 'en',
          country_codes: ['US'],
        }),
      });
      const result = await response.json();
      console.log('result',result)
      // Check if the request was successful
      if (!response.ok) {
        setLoading(false)
        throw new Error('Network response was not ok');
      }

      // Parse the JSON response
     // const result = await response.json();
      setLoading(false)
      // Set the data in the state
      setData(result);
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

  return (
    <View style={{ flex: 1,backgroundColor:'#fff' }}>
     {loading?  <View style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator
                  size={'large'}
                  color={"red"}
                ></ActivityIndicator>
              </View>:
    <PlaidLink
        tokenConfig={{
            token: data?.link_token,
            // OPTIONAL - log level.
            logLevel: LinkLogLevel.ERROR,
            // OPTIONAL - Hides native activity indicator if true.
            noLoadingState: false,
        }}
        onSuccess={(success: LinkSuccess) => { createToken(success) }}
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
}
  
   
    </View>
  );
};
export default Payment;
