import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import GenericText from '../../components/Text'
import { Screens } from '../../themes'
import { LocalImages } from '../../constants/imageUrlConstants'
import PhoneInput from 'react-native-phone-number-input'
import Button from '../../components/Button'
import AnimatedLoader from '../../components/Loader/AnimatedLoader'
import TextInput from '../../components/TextInput'


const EditEmailAddress = (props:any) => {

  const navigateAction = () => {
    props.navigation.navigate("EditEmailAddOtp");
  };

  return (
    <View style={styles.sectionContainer}>
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
          {"Update Email Address"}
        </GenericText>

       
        <View />
      </View>

      <GenericText
          style={[
            {
              fontSize: 16,
              color: Screens.black,
              fontWeight: "500",
              alignSelf:'center',
              marginTop:15
           
            },
          ]}
        >
          {"Please enter your new Email Address"}
        </GenericText> 

        <GenericText
          style={[
            {
              fontSize: 13,
              marginTop:20,
              paddingHorizontal:15
            },
          ]}
        >
          {"Email"}
        </GenericText> 

        <TextInput
              style={{
                container: styles.textInputContainer,
              }}
            />

        <View style={{paddingHorizontal:15,marginTop:100}}>

          <Button
          onPress={navigateAction}
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
     
    </View>
  )
}

export default EditEmailAddress

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
  textInputContainer: {
    borderRadius: 10,
    borderColor: Screens.thickGray,
    borderWidth: 2,
    marginLeft: 10,
    marginTop: 10,
  },

})