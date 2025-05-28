import { Link } from 'expo-router';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Pressable,  } from 'react-native';
import { router } from 'expo-router';
import { Eye, EyeOff} from 'lucide-react-native';
import React, { useState } from 'react';



export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    
    router.replace('../../mobile/app/(tabs)');
  };


  return (

    <View style={styles.container}>    
      <View style={styles.header}>
        <Image source={require('../../mobile/assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput style={styles.input} 
        placeholder="Informe o E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        placeholderTextColor="#666"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Informe a Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye size={22} color="#666" />
            ) : (
              <EyeOff size={22} color="#666" />
            )}
          </TouchableOpacity>
        </View>
          
        

        
        <TouchableOpacity style={styles.button}>
            <Link href="./entry">
            <Text style={styles.buttonText}>Login{" "}</Text>
            </Link>
        </TouchableOpacity>

        <Text style={styles.textFooter}>
            Não tem cadastro ainda?{" "}
            <Link href="./signUp">
              <Text style={styles.textLink}>Cadastrar</Text>
            </Link>
         </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0D8', 
  },
   header:{
      
   },
  logo: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    position: 'absolute',
    top: 50, 
    marginTop: -20,
    marginLeft:117,
  },
  loginContainer: {
    backgroundColor:'#B4DEBE',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200, 
    borderTopLeftRadius:80,
    
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 25,
    marginTop: -40,
    padding: 30,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  input: {
    width: '80%',
    height: 55, // Inputs mais altos
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 40, // Maior espaçamento entre os inputs
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    elevation: 2,

  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    width: '80%',
    height: 55,
    marginBottom: 40,
    elevation: 2,
  },
  
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  
  button: {
    width: '80%',
    height: 50, // Botão mais alto também
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerText: {
    marginTop: 20,
    color: '#666',
    fontSize: 15,
  },
  registerLink: {
    fontWeight: 'bold',
    color: '#333',
  },
  textFooter: {
    color: '#fff',
    fontSize: 15,
    marginTop: 18,
  },
  textLink: {
    fontWeight: 'bold',
    color: '#333',
  }

});
