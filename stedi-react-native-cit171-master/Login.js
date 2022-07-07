import {useState} from "react";
import { TouchableOpacity, SafeAreaView, StyleSheet, TextInput, Text } from "react-native";

const sendText = async (phoneNumber) => {
  console.log(phoneNumber)
  // using fetch do a POST to https://dev.stedi.me/twofactorlogin
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers:{
      'content-type':'application/text'
    
  }})
  const loginResponseText = await loginResponse.text()
  console.log(loginResponseText);//print the response
  };

const getToken = async({oneTimePassword, phoneNumber, setUserLoggedIn, setUserToken}) =>{
  
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    body: JSON.stringify({oneTimePassword, phoneNumber}),
    headers:{
      'content-type':'application/text'
  },
});
  const responseCode = loginResponse.status
  const loginResponseText = await loginResponse.text()
  console.log("LOGIN RESPONSE:", loginResponseText)
  console.log("Response Code:", responseCode)
  if(responseCode == 200){
    setUserLoggedIn(true)
    setUserToken(loginResponseText)
  }
}

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setoneTimePassword] = useState(null);

  return (
    <SafeAreaView style ={styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="numeric"
        placeholder="801-555-1212"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
        <Text>Get OTP</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setoneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{getToken({oneTimePassword, phoneNumber, setUserLoggedIn:props.setUserLoggedIn, setUserToken:props.setUserToken})}}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  mainView:{
    marginTop: 100
  },
  button:{
    alignItems:"center",
    width: 100,
    margin: 10,
    borderwidth: 1,
    borderRadius: 20, 
    padding: 10,
    backgroundColor: "#DDDD",
    alignSelf: "center",
  }
});

export default Login;