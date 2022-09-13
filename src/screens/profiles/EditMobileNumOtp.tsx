import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import GenericText from '../../components/Text'
import { Screens } from '../../themes'
import { LocalImages } from '../../constants/imageUrlConstants'
import PhoneInput from 'react-native-phone-number-input'
import { useAppSelector } from '../../hooks/hooks'
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import Button from '../../components/Button'
import AnimatedLoader from '../../components/Loader/AnimatedLoader'


const EditMobileNumOtp = (props:any) => {

    const userDetails = useAppSelector((state) => state.account);
    const [code, setCode] = useState();
    const onPinCodeChange = (code: any) => {
      setCode(code);
    };

  return (
    <View style={styles.sectionContainer}>
       <ScrollView
        contentContainerStyle={styles.sectionContainer}
       >

      <View style={styles.sectionHeaderContainer}>

       <TouchableOpacity
        onPress={()=>props.navigation.goBack()}
        >

        <Image
          resizeMode="contain"
          style={styles.logoContainer}
          source={LocalImages.backImage}
        ></Image>
        </TouchableOpacity>
        <GenericText
          style={[
            {
              fontSize: 20,
              color: Screens.pureWhite,
              fontWeight: "500",
              marginLeft:-10
            },
          ]}
        >
          {"Update Mobile Number"}
        </GenericText>

       
        <View />
      </View>

      <GenericText
          style={[
            {
              fontSize: 16,
              color: Screens.grayShadeColor,
              fontWeight: "500",
              alignSelf:'center',
              marginTop:15
           
            },
          ]}
        >
          {"Enter OTP you reciered on your old mobile"}
        </GenericText> 
        <GenericText
          style={[
            {
              fontSize: 16,
              color: Screens.grayShadeColor,
              fontWeight: "500",
              alignSelf:'center',
          
            },
          ]}
        >
          {userDetails.responseData.phone}
        </GenericText> 


        <View style={{ alignSelf: "center",marginTop:25 }}>
            <SmoothPinCodeInput
              cellStyle={{
                borderWidth: 0.5,
                borderColor: Screens.grayShadeColor,
                borderRadius: 5,
                
              }}
              cellStyleFocused={{
                borderColor: Screens.colors.primary,
                borderWidth: 2,
              }}
              password
              cellSize={50}
              codeLength={6}
              value={code}
              onTextChange={onPinCodeChange}
            />
          </View>

           <TouchableOpacity>

          <GenericText
          style={[
            {
              fontSize: 13,
              color: "#293FEE",
              fontWeight: "500",
              alignSelf:"flex-end",
              marginRight:35,
              marginTop:8,
              textDecorationLine: 'underline'
                
            },
          ]}
        >
          {"Re-Send Code"}
         </GenericText> 
        </TouchableOpacity>   


        <GenericText
          style={[
            {
              fontSize: 16,
              color: Screens.grayShadeColor,
              fontWeight: "500",
              alignSelf:'center',
              marginTop:40
           
            },
          ]}
        >
          {"Enter OTP you reciered on your new mobile"}
        </GenericText> 
        <GenericText
          style={[
            {
              fontSize: 16,
              color: Screens.grayShadeColor,
              fontWeight: "500",
              alignSelf:'center',
          
            },
          ]}
        >
          {userDetails.responseData.phone}
        </GenericText> 


        <View style={{ alignSelf: "center",marginTop:25 }}>
            <SmoothPinCodeInput
              cellStyle={{
                borderWidth: 0.5,
                borderColor: Screens.grayShadeColor,
                borderRadius: 5,
                
              }}
              cellStyleFocused={{
                borderColor: Screens.colors.primary,
                borderWidth: 2,
              }}
              password
              cellSize={50}
              codeLength={6}
              value={code}
              onTextChange={onPinCodeChange}
            />
          </View>

           <TouchableOpacity>
          <GenericText
          style={[
            {
              fontSize: 13,
              color: "#293FEE",
              fontWeight: "500",
              alignSelf:"flex-end",
              marginRight:35,
              marginTop:8,
              textDecorationLine: 'underline'
                
            },
          ]}
        >
          {"Re-Send Code"}
         </GenericText> 
        </TouchableOpacity>   
        <View style={{paddingHorizontal:15,marginTop:10}}>

        <Button
            style={{
            buttonContainer: {
                elevation: 5,
            },
            text: {
                color: Screens.pureWhite,
            },
            iconStyle: {
                tintColor: Screens.pureWhite,
            },
            }}
            title={"SUBMIT"}
        ></Button>
        </View>


        <AnimatedLoader
            loadingText="Loading..."
        />

    </ScrollView> 
     
    </View>
  )
}

export default EditMobileNumOtp

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: Screens.colors.background,
  },
  logoContainer: {
    width: 25,
    height: 25,
    tintColor: "#fff",
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    height: 120,
    backgroundColor: "#8b88db",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },

})