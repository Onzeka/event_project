import React from "react";
import {useWindowDimensions, View, SafeAreaView} from 'react-native';

const TopBarCross = ({scale}) => {

    const { height, width } = useWindowDimensions()

    return (
        <SafeAreaView style={{ alignItems: 'flex-start', width: width }}>          
            <View style={{ height: 5, width: width, marginTop: height * 0.014, backgroundColor: 'black', position: 'absolute'  }}/>
            <View style={{ height: 5, width: width * scale, marginTop: height * 0.014, backgroundColor: 'blue', position: 'absolute'  }}/>  
        </SafeAreaView>
    )
};

export { TopBarCross };