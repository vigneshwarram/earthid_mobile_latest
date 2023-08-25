import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { Screens } from '../../themes'
import Header from "../../components/Header";
import { LocalImages } from '../../constants/imageUrlConstants';


const CreditScreen = (props:any) => {
  return (
    <View style={styles.sectionContainer}>
       <Header
            isBack
            letfIconPress={() => props.navigation.goBack()}
            headingText= {"credits"}
            linearStyle={styles.linearStyle}
        ></Header>
        <View style={styles.subContainer}>
           <Image
           source={LocalImages.flexin}
           style={{width:'40%',height:55,marginBottom:30,resizeMode:'contain'}}
           />
            <Image
           source={LocalImages.hedera}
           style={{width:'40%',height:55,marginBottom:30,resizeMode:'contain'}}
           />
            <Image
           source={LocalImages.earth}
           style={{width:'40%',height:55,marginBottom:30,resizeMode:'contain'}}
           />
        </View>
    </View>
  )
}

export default CreditScreen

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        backgroundColor: Screens.colors.background,
      },
      linearStyle: {
        height: 120,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 4,
      },
      subContainer:{
        flex:1,
        justifyContent:'center',
        marginTop:-80,
        alignItems:'center'
      }
})