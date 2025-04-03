import { Link } from 'expo-router';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Pressable } from 'react-native';


export default function LoginScreen() {
  return (
    <View style={styles.container}>    
      <View style={styles.header}>
        <Image source={require('@/assets/images/clp_image.png')} style={styles.logo} />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput style={styles.input} 
        placeholder="Informe o E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        placeholderTextColor="#666"
        />
        <TextInput style={styles.input} 
        placeholder="Informe a Senha"
        secureTextEntry={true}
        autoCapitalize="none"
        />

        
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.textFooter}>
            Não tem cadastro ainda?{" "}
            <Link href="./singUp">
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
    backgroundColor: '#F0F0D8', // Fundo verde inferior
  },
   header:{
      
   },
  logo: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    position: 'absolute',
    top: 50, // Ajusta a logo para ficar mais centralizada
    marginTop: -20,
    marginLeft:117,
  },
  loginContainer: {
    backgroundColor:'#B4DEBE',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200, // Aumentei a margem para separar mais do topo60
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
    color: '# ',
    fontSize: 15,
    marginTop: 18,
  },
  textLink: {
    fontWeight: 'bold',
    color: '#333',
  }

});
