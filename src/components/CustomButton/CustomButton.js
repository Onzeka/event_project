import React from "react";
import {Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
    return (
        <Pressable 
            onPress={onPress} 
            style={[
                styles.container, 
                styles[`container_${type}`],
                bgColor ? {backgroundColor: bgColor} : {}
            ]}>
            <Text 
                style={[
                    styles[`text_${type}`],
                    fgColor ? {color: fgColor} : {}
                    ]}
                >{text}
            </Text>
        </Pressable>
    );
};

const CustomButtonHalf = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
    return (
        <Pressable 
            onPress={onPress} 
            style={[
                styles.container_half, 
                styles[`container_${type}`],
                bgColor ? {backgroundColor: bgColor} : {}
            ]}>
            <Text 
                style={[
                    styles[`text_${type}`],
                    fgColor ? {color: fgColor} : {}
                    ]}
                >{text}
            </Text>
        </Pressable>
    );
};

const ReturnButton = ({ onPress }) => {

    return (
        <TouchableOpacity onPress={onPress} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={{ width: '95%', marginTop: 30}}>
            <Icon name="angle-left" size={35} color='#B0BEC5'/>
        </TouchableOpacity>
    )
}

const ReturnButtonSearch = ({ onPress }) => {

    return (
        <TouchableOpacity onPress={onPress} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={{ width: '10%', marginLeft: 20, marginRight: 10}}>
            <AntDesignIcon name="arrowleft" size={25} color='#B0BEC5'/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '93%',
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    container_half: {
        width: '45%',
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 7,
        marginRight: 7,
    },
    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    },
    text_PRIMARY: {
        fontWeight: 'bold',
        color: 'white',
    }
})

export { CustomButton, CustomButtonHalf, ReturnButton, ReturnButtonSearch };