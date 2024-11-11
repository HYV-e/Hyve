import React, { useState } from 'react'
import { Alert, StyleSheet, View, Pressable, TextInput, Text, Image } from 'react-native'
import { supabase } from '../lib/supabase'
import { router } from 'expo-router';

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);


  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
      else router.push("/home")

    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Sucessfully signed up!')
    setLoading(false)
  }

  return (
    <View style={styles.parent}>
      <View style={styles.logo}>
        <Image source={require('../assets/graphics/image.png')} style={{ width: 80, height: 80 }}  />
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Přihlásit se</Text>
        <Text style={styles.labels}>Email</Text>
        <TextInput
          style={styles.prompt}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          placeholderTextColor={'#3C4D54'}
          autoCapitalize={'none'}
          underlineColorAndroid={'transparent'}
        />
        <Text style={styles.labels}>Heslo</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={{ fontSize: 20, flex: 1, color: '#3C4D54' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!passwordVisible}
            placeholder="********"
            placeholderTextColor={'#3C4D54'}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />
          <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image source={require('../assets/graphics/eye.png')} style={styles.eye} />
          </Pressable>
        </View>
        <View style={styles.rememberForgotContainer}>
          <View style={styles.rememberMe}>
            <Pressable style={{width: 15, height: 15}} onPress={() => setRememberMe(!rememberMe)}>
              <Image source={require('../assets/graphics/checked.png')} style={{ width: 15, height: 15, opacity: rememberMe ? 100 : 0 }} />
            </Pressable>
            <Text style={styles.rememberMeText}>Zapamatovat si mě</Text>
          </View>
          <Pressable onPress={() => Alert.alert('Zapomenuté heslo')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>
        </View>
        <Pressable disabled={loading} style={styles.login} onPress={() => signInWithEmail()}><Text style={styles.loginText}>Přihlásit se</Text></Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    paddingTop: '55%',
    backgroundColor: 'white',
  },
  logo: {
    width: 1,
    height: 1,
    position: 'absolute',
    top: '15%',
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  container: {
    padding: 25,
    backgroundColor: '#0E1317',
    height: '100%',
    borderTopLeftRadius: 77,
    paddingTop: 40,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
  },
  labels: {
    color: 'white',
    marginBottom: 10,
    fontSize: 16,
  },
  eye : {
    marginRight: 5,
    width: 30,
    height: 30,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    padding: 13,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#3C4D54',
  },
  prompt: {
    marginBottom: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#3C4D54',
    color: '#3C4D54',
    padding: 15,
    fontSize: 20,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: 'white',
    marginLeft: 8,
  },
  forgotPasswordText: {
    color: '#13CFF3',
  },
  login: {
    color: '#0E1317',
    backgroundColor: '#F0F8FF',
    padding: 15,
    borderRadius: 10,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
})