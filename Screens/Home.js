import { StyleSheet, Text, View, Pressable, Image, StatusBar } from 'react-native'
import React from 'react'
import Footer from '../Components/Footer'


const Home = ({navigation}) => {

    const handleLoginPress = () => {
        navigation.navigate('LogIn')
    }

    const handleRegisterPressed = () => {
        navigation.navigate('Register')
    }

  return (
    <View style={styles.container}>
        <StatusBar barStyle={'default'}/>
        <View>
            <Image style={styles.image} source={require('../assets/images/mentalhealth.png')}/>
            <Text style={styles.text}>Mental health tests in your pocket</Text>
            <Pressable style={[styles.button, {backgroundColor: '#b2f2c3'}]} onPress={handleLoginPress}>
                <Text>
                    Log In
                </Text>
            </Pressable>
            <Pressable style={[styles.button, {backgroundColor: 'lightgrey'}]} onPress={handleRegisterPressed}>
                <Text style={{color: 'black'}}>
                    Register
                </Text>
            </Pressable>

        </View>
        <Footer />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text : {
        fontSize: 25
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        margin: 15
    },
    buttonText: {
        color: 'grey'
    },
    image: {
        width: 250,
        height: 250,
        margin: 20,
        borderRadius: 200,
        alignSelf: 'center'
      }
})