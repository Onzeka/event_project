import React, {useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import { CustomButton, CustomButtonHalf, ReturnButton, ReturnButtonSearch } from '../../components/CustomButton';
import { CustomInputNumber, CustomInputSearch, CustomInput, DateInput } from '../../components/Custominput';
import { sha256 } from "js-sha256";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TopBarCross } from "../../components/TopBarCross";
import * as Localization from 'expo-localization';

const PhoneNumberScreen = (props) => {
    
    var informations_tracker = props.route.params;
    console.log(informations_tracker);

    if ('phone_number' in informations_tracker){
        var phone_number = informations_tracker.phone_number;
    }else{
        var phone_number = '';
    }

    const countries = require('../../../assets/Countries/countries.json');

    const currentCountryIndex = () => {
        var index = 0;
        {Object.keys(countries).map(item => {
            if (countries[item].value === Localization.region){
                index = item;
            }
        })}
        return index;
    }

    const {height, width} = useWindowDimensions();
    const [visible, setVisible] = useState(false);
    const [currentindex, setCurrentIndex] = useState(currentCountryIndex())
    const [searchCountry, setSearchCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(phone_number);

    const CountriesSearch = ({ searchstring }) => {

        if (searchstring === ""){
            var displayed_countries = countries;
        }else{
            var displayed_countries = [];
            {Object.keys(countries).map(index => {
                if (countries[index].name.includes(searchstring)){
                    displayed_countries = displayed_countries.concat(countries[index]);
                };
            })};
        };

        return (
            <View>
                <FlatList 
                    data={displayed_countries}
                    renderItem={
                        ({ item }) => {
                            return (<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', padding: 15, marginHorizontal: 10}} onPress={() => {selectIndex(item.index)}}>
                                <Text style={{fontSize: 20, width: '70%', color: "#918b85"}}>{item.name}</Text>
                                <Text style={{fontSize: 20, width: '30%', color: "#918b85", textAlign: 'right'}}>{item.callcode}</Text>
                            </TouchableOpacity>)}
                        }
                    keyExtractor={item => item.value}
                    initialNumToRender={20}
                    />
            </View>
        )
    }

    const toggleDropdown = () => {
        setVisible(!visible);
      };
    
    const selectIndex = (index) => {
        setCurrentIndex(index);
        setVisible(!visible);
    }

    const onReturn = () => {
        props.navigation.goBack()
    }; 

    const onNum = () => {
        informations_tracker.phone_number = phoneNumber
        props.navigation.navigate("ValidatePhoneNumberScreen", informations_tracker)
    }
    
    return (
        <View>
            {
                visible ?
                (
                    <View style={styles.root}>
                        <View 
                            style={{ 
                                backgroundColor: '#e9e9e9', 
                                height: 55, 
                                width: width, 
                                marginTop: height * 0.013, 
                                alignItems: 'center', 
                                shadowColor: 'black', 
                                elevation: 3,
                                flexDirection: 'row',
                                marginBottom: 15,
                            }}
                        >                        
                            <ReturnButtonSearch onPress={toggleDropdown}/>
                            <CustomInputSearch placeholder="Search" value={searchCountry} setValue={setSearchCountry}/>
                        </View>
                        <CountriesSearch searchstring={searchCountry}/>
                    </View>
                ) : (
                    <View style={styles.root}>
                        <TopBarCross scale={0.11}/>
                        <ReturnButton onPress={onReturn}/>
                        <Text style={[styles.big_text, {marginTop: height * 0.15}]}>My phone number</Text>
                        <Text style={styles.text}>Your phone number will be used for authentication or in case of lost password.</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30, width: '90%'}}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 20 }} onPress={toggleDropdown}>
                                <Text style={{marginRight: 7, fontSize: 20}}>{countries[currentindex].value}  {countries[currentindex].callcode}</Text>
                                <Icon name='caret-down'/>
                            </TouchableOpacity>
                            <CustomInputNumber value={phoneNumber} setValue={setPhoneNumber} placeholder="Phone number"/>
                        </View>
                        <CustomButton text="Continue" onPress={onNum}/>
                    </View>
                )
            }
        </View>
    );

}

const ValidatePhoneNumberScreen = (props) => {

    var informations_tracker = props.route.params;
    console.log(informations_tracker);

    const onReturn = () => {
        props.navigation.goBack()
    }; 

    const onValidation = () => {
        props.navigation.navigate("MailScreen", informations_tracker)
    }

    return (
        <View style={styles.root}>
            <TopBarCross scale={0.22}/>
            <ReturnButton onPress={onReturn}/>
            <Text style={styles.big_text}>Phone Validation</Text>
            <CustomButton text="continue" onPress={onValidation} />
        </View>
    )
}

const validateEmail = (email) => {

    var re = /\S+@\S+\.\S+/;

    return re.test(String(email))

  };

const MailScreen = (props) => {

    var informations_tracker = props.route.params;
    console.log(informations_tracker);

    if ('email' in informations_tracker){
        var email_start = informations_tracker.email;
    }else{
        var email_start = '';
    }

    const [email, setEmail] = useState(email_start);
    const [errorMessage, setErrorMessage] = useState(null);
    const {height} = useWindowDimensions();

    const onReturn = () => {
        props.navigation.goBack()
    }; 

    const enterEmail = () => {

        informations_tracker.email = email;

        if (validateEmail(email)){
            setErrorMessage(null);
            props.navigation.navigate("RulesScreen", informations_tracker)
        }else{
            setErrorMessage("Please select a valid email address.");
            setEmail("");
        }
    }; 

    return (
        <View style={styles.root}>
            <TopBarCross scale={0.34}/>
            <ReturnButton onPress={onReturn}/>
            <Text style={[styles.big_text, {marginTop: height * 0.15}]}>My email address</Text>
            <Text style={styles.text}>Enter your email address in case you lose your password.</Text>
            <CustomInput placeholder="Email" value={email} setValue={setEmail} />
            {
                errorMessage && <Text style={[styles.text, {color: 'red'}]}>{errorMessage}</Text>
            }
            <CustomButton text="Continue" onPress={enterEmail}/>
        </View>
    );
};

const SingleRule = ({ rule, description }) => {

    return (
        <View style={styles.single_rule}>
            <View style={styles.rule}>
                <Icon name="check" color='#4CAF50' style={[{padding: 10}]}/>
                <Text style={styles.rule_text}>{rule}</Text>
            </View>
            <Text style={styles.text}>{description}</Text>
        </View>
    );

};

const RulesScreen = (props) => {
    
    var informations_tracker = props.route.params;
    console.log(informations_tracker);

    const onReturn = () => {
        props.navigation.goBack();
    };  

    const onAccept = () => {
        props.navigation.navigate("UsernameScreen", informations_tracker);
    };
    const {height} = useWindowDimensions();

    return (
        <View style={styles.root}>
            <TopBarCross scale={0.45}/>
            <ReturnButton onPress={onReturn}/>
            <Text style={[styles.big_text, {marginTop: height * 0.15}]}>Welcome</Text>
            <Text style={[styles.text, {marginBottom: height * 0.06}]}>Welcome to **name** ! Please respect the following rules for a lifebreaker experience.</Text>
            <SingleRule rule="Rule 1" description="Rule 1 description"/>
            <SingleRule rule="Rule 2" description="Rule 2 description"/>
            <SingleRule rule="Rule 3" description="Rule 3 description"/>
            <CustomButton text="I accept" onPress={onAccept}/>
        </View>
    );
};

const UsernameScreen = (props) => {

    var informations_tracker = props.route.params;
    console.log(informations_tracker);

    const {height} = useWindowDimensions();
    const [firstname, setFirstName] = useState("");

    const onReturn = () => {
        props.navigation.goBack();
    };  

    const onFirstName = () => {
        informations_tracker.username = firstname;
        props.navigation.navigate("BirthdayScreen", informations_tracker);
    };

    return (
        <View style={styles.root}>
            <TopBarCross scale={0.56}/>
            <ReturnButton onPress={onReturn}/>
            <Text style={[styles.big_text, {marginTop: height * 0.15}]}>My first name</Text>
            <Text style={styles.text}>This is the first name that users will see on your profile.</Text>
            <CustomInput placeholder="First name" value={firstname} setValue={setFirstName}/>
            <CustomButton text="Continue" onPress={onFirstName} />
        </View>
    );
};

const BirthdayScreen = (props) => {

    const convertStringToInt = (str) => {
        if (str.charAt(0) === '0'){
            return parseInt(str.charAt(1));
        }else{
            return parseInt(str);
        };
    };

    const checkBirthday = (date) => {

        var values = date.dt.split('/').map(function (v) {
            return convertStringToInt(v.replace(/\D/g, ''));
          });

        console.log(values[1] <= 12 )

        if (values[1] <= 12 && values[0] <= 31){

            const current_day = new Date().getDate();
            const current_month = new Date().getMonth() + 1;
            const current_year = new Date().getFullYear();

            if (values[2] <= current_year - 18){
                if (values[2] === current_year - 18){
                    if (values[1] === current_month){
                        if (values[0] > current_day){
                            return "This application is forbidden to under 18s.";
                        }else{
                            return "";
                        }
                    };
                    if (values[1] > current_month){
                        return "This application is forbidden to under 18s.";
                    };
                    return "";
                };
                return "";
            }else{
                return "This application is forbidden to under 18s.";
            };
        }else{
            return "Incorrect format.";
        };
    };

    var informations_tracker = props.route.params;
    console.log(informations_tracker);

    const {height} = useWindowDimensions();
    const [birthday, setBirthday] = useState({date: null, dt: null, registrationDate: ''});
    const [errorMessage, setErrorMessage] = useState("");

    const onBirthday = () => {

        if (birthday.dt !== null){

            const message = checkBirthday(birthday);

            if (message === ""){

                setErrorMessage("");
                informations_tracker.birthday = birthday.dt;
                props.navigation.navigate("PasswordScreen", informations_tracker);

            }else{
                setErrorMessage(message);
            };
        }else{
            setErrorMessage("Please enter a date.")
        };
    };

    const onReturn = () => {
        props.navigation.goBack();
    };  

    return (
        <View style={styles.root}>
            <TopBarCross scale={0.67}/>
            <ReturnButton onPress={onReturn}/>
            <Text style={[styles.big_text, {marginTop: height * 0.15}]}>My birthday</Text>
            <Text style={styles.text}>Users will see how old you are.</Text>
            <DateInput date={birthday} setDate={setBirthday}/>
            {
                errorMessage && <Text style={[styles.text, {color: 'red'}]}>{errorMessage}</Text>
            }
            <CustomButton text="Continue" onPress={onBirthday} />
        </View>
    );
};

const PasswordScreen = (props) => {

    var informations_tracker = props.route.params;
    console.log(informations_tracker);

    const {height} = useWindowDimensions();
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const onPassword = () => {

        if (password.length <= 5){
            setErrorMessage("The password must be at least 6 characters long.");
            setPassword("");
            setConfirmPassword("");
        }else{
            if (password === confirmpassword){
                setErrorMessage(null);
                informations_tracker.password_hash = sha256(password);
                props.navigation.navigate("ImageScreen", informations_tracker);
            }else{
                setErrorMessage("The two passwords are not the same.");
                setPassword("");
                setConfirmPassword("");
            };
        };
    };

    const onReturn = () => {
        props.navigation.goBack();
    }; 

    return (
        <View style={styles.root}>
            <TopBarCross scale={0.78}/>
            <ReturnButton onPress={onReturn}/>
            <Text style={[styles.big_text, {marginTop: height * 0.15}]}>My password</Text>
            <Text style={styles.text}>Do not give this information to anyone else!</Text>
            <CustomInput value={password} setValue={setPassword} placeholder="Password" secureTextEntry={true}/>
            <CustomInput value={confirmpassword} setValue={setConfirmPassword} placeholder="Confirm your password" secureTextEntry={true}/>
            {
                errorMessage && <Text style={[styles.text, {color: 'red'}]}>{errorMessage}</Text>
            }
            <CustomButton text="Continue" onPress={onPassword} />
        </View>
    );
};

const ImageScreen = (props) => { 

    const [image, setImage] = useState(null);
    
    const uploadImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!_image.cancelled){
            setImage(_image.uri)
        }
    };

    const takePicture = async () => {
        let _image = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        setImage(_image.uri)
    }

    const onImage = () => {
        informations_tracker.image_uri = image
        props.navigation.navigate("LaSuite", informations_tracker)
    };

    const onReturn = () => {
        props.navigation.goBack();
    }; 

    const {height, width} = useWindowDimensions();

    var informations_tracker = props.route.params;
    console.log(informations_tracker);

    return (
            <View style={styles.root}>
                <TopBarCross scale={0.89}/>
                <ReturnButton onPress={onReturn}/>
                <View style={[styles.container, {marginTop: height * 0.15}]}>
                    {
                        image ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> :
                        <Image source={require('../../../assets/images/profile.jpg')} style={{ width: 200, height: 200 }}/>
                    }
                </View>
                <View style={styles.rule}>
                    <CustomButtonHalf text="Take a picture" onPress={takePicture} />
                    <CustomButtonHalf text="Upload a picture" onPress={uploadImage} />
                </View>
                <Text style={[styles.text, {width: width * 0.7, paddingVertical: 20, marginLeft: 17}]}>Users will see this photo on your profile.</Text>
                <CustomButton text="Continue" onPress={onImage} />
            </View>
    );
};

const LaSuite = (props) => {
    
    var informations_tracker = props.route.params;
    console.log(informations_tracker);

    return (<View style={styles.root}>
        <Text style={styles.big_text}>La Suite</Text>
    </View>);
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#F9FBC',
        alignItems: 'center',
        padding: 20,
    },
    big_text: {
        fontSize: 35,
        color: '#37474F',
        width: '93%',
        marginVertical: 10,
    },
    text: {
        width: '93%',
        marginVertical: 10,
        color: '#90A4AE',
    },
    single_rule: {
        width: '93%',
        marginBottom: 10,
    },
    rule: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
});

export { PhoneNumberScreen, ValidatePhoneNumberScreen, MailScreen, RulesScreen, UsernameScreen, BirthdayScreen, PasswordScreen, ImageScreen, LaSuite };