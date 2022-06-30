import { useLinkProps } from "@react-navigation/native";
import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import { ImageBackground } from "react-native-web";

const sendText = async (phoneNumber) => {
  const loginResponse = await fetch("https://dev.stedi.me/twofactorlogin/"+phoneNumber, {
    method: "Post",
    headers: {
      'Content-Type': 'application/text'
    }
  });
  // const loginResponseText = await loginResponse.text();
  // console.log("login Response",loginResponseText);
}


const getToken = async({phoneNumber, otp, setUserLoggedIn}) =>{
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin', {
    method: "Post",
    body:JSON.stringify({otp, phoneNumber}),
    headers: {
      'Content-Type': 'application/text'
    },
    // body:{
    // phoneNumber,
    // otp
    // }
  });
  const responseCode = tokenResponse.status;
  if (responseCode==200){
    setUserLoggedIn(true);
  }
  const tokenResponseString = await tokenResponse.text;
}

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(null);

  return (
    <SafeAreaView style ={styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="801-555-1212"
      />
      <TextInput
        style={styles.input}
        onChangeText={setOtp}
        value={otp}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
        <Text>send text</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{
          getToken({phoneNumber, otp, setUserLoggedIn:props.setUserLoggedIn});
        }}
      >
        <Text>log in</Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
    marginTop: 100
  }, 
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    margin: 15,
    width: 75,
  }
});

export default Login;