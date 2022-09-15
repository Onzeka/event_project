import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from './screens/SignInScreen';
import { PhoneNumberScreen, ValidatePhoneNumberScreen, MailScreen, RulesScreen, UsernameScreen, BirthdayScreen, PasswordScreen, ImageScreen, LaSuite } from './screens/Register';

const { Navigator, Screen } = createStackNavigator(); 

const AppNavigator = () => {

    return (
        <NavigationContainer>
            <Navigator initialRouteName='SignInScreen' screenOptions={{headerShown: false}}>
                <Screen name='SignInScreen' component={SignInScreen} />
                <Screen name='PhoneNumberScreen' component={PhoneNumberScreen} />
                <Screen name='ValidatePhoneNumberScreen' component={ValidatePhoneNumberScreen} />
                <Screen name="MailScreen" component={MailScreen} />
                <Screen name="RulesScreen" component={RulesScreen} />
                <Screen name="UsernameScreen" component={UsernameScreen} /> 
                <Screen name="BirthdayScreen" component={BirthdayScreen} />
                <Screen name="PasswordScreen" component={PasswordScreen} />
                <Screen name="ImageScreen" component={ImageScreen} />
                <Screen name="LaSuite" component={LaSuite} />
            </Navigator>
        </NavigationContainer>
    );
};

export { AppNavigator };