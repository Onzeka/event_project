import { useState } from "react";
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';

const Permission = async () => {

    const [location, setLocation] = useState(null);

    let { status } = await Location.requestForegroundPermissionsAsync();
    setLocation(status)
    const [permission, requestPermission] = Camera.useCameraPermissions();
    
    return location
};

export default Permission;