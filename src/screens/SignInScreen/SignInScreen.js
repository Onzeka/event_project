import React, { useState } from "react";
import {View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import { CustomInput } from '../../components/Custominput';
import { CustomButton } from '../../components/CustomButton';

const SignInScreen = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {height} = useWindowDimensions();
    const onSignInPressed = () => {
        console.warn("Sign in");
    }
    const onForgotPasswordPressed = () => {
        console.warn("forgot password");
    }
    const onSignInFacebook = () => {
        console.warn("Sign with fb");
    }
    const onSignInGoogle = () => {
        console.warn("Sign with GG");
    }
    const onRegisterIn = () => {

        if (String(props.route.params) !== 'undefined'){
            var informations_tracker = props.route.params;
        }else{
            var informations_tracker = {};
        }
        props.navigation.navigate("PhoneNumberScreen", informations_tracker);
    }

    return (
        <View style={styles.root}>
            <Image source={Logo} style={[styles.logo, {height: height * 0.2}]} resizeMode="contain"/>
            <CustomInput placeholder="Username" value={username} setValue={setUsername} />
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
            <CustomButton text="Sign in" onPress={onSignInPressed}/>
            <CustomButton text="Forgot password ?" onPress={onForgotPasswordPressed} type="TERTIARY"/>
            <CustomButton text="Sign in with Facebook" onPress={onSignInFacebook} bgColor='#E7EAF4' fgColor='#4765A9'/>
            <CustomButton text="Sign in with Google" onPress={onSignInGoogle} bgColor='#FAE9EA' fgColor='#DD4D44'/>
            <CustomButton text="Don't have an account ? Create one" onPress={onRegisterIn} type="TERTIARY" />
        </View>
    )
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#F9FBC',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        marginVertical: 60,
    }
})

export default SignInScreen ;