import React from "react";
import {View, TextInput, StyleSheet} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const CustomInput = ({value, setValue, placeholder, secureTextEntry=false}) => {
    return (
        <View style={styles.container}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
};

const DateInput = ({date, setDate}) => {

    return (
        <View style={styles.container}>
            <TextInputMask
                placeholder="DD/MM/YYYY"
                type={'datetime'}
                options={{
                    format: 'DD/MM/YYYY',
                }}
                value={date.dt}
                onChangeText={(text) => {
                    setDate({
                    dt: text,
                    });
                }}
                // add the ref to a local var
                ref={(ref) => (datetimeField = ref)}
            />
        </View>
    );
};

const CustomInputSearch = ({value, setValue, placeholder, secureTextEntry=false}) => {
    return (
        <View style={styles.search}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
};

const CustomInputNumber = ({value, setValue, placeholder, secureTextEntry=false}) => {
    return (
        <View style={styles.number}>
            <TextInput 
                keyboardType="numeric"
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                style={{ fontSize: 20 }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
     container: {
        backgroundColor: 'white',
        width: '93%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,

        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10,
     },
    search: {
        backgroundColor: 'transparent',
        width: '93%',
        height: 50,
        justifyContent: 'center',
    },
    number: {
        backgroundColor: 'transparent',
        height: 50,
        justifyContent: 'center',
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    }
})

export { CustomInputSearch, CustomInput, DateInput, CustomInputNumber };