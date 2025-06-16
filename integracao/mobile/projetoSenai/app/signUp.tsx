import { Link } from 'expo-router';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Pressable } from 'react-native';



export default function SignUpScreen() {
  return (
    <View style={styles.container}>    
      <View style={styles.header}>
        
        
        <Text style={styles.title}>Cadastrar</Text>
      </View>

      <View style={styles.register}>
              <TextInput style={styles.input} 
                   keyboardType='default'
                   placeholder='Informe seu nome'
                   autoCapitalize="none"
                   autoComplete="additional-name"
                   placeholderTextColor="#666"
              />
              <TextInput style={styles.input} 
                      placeholder="Informe o E-mail"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      placeholderTextColor="#666"
               />
                <TextInput style={styles.input} 
                       placeholder="Criar uma Senha"
                       secureTextEntry={true}
                       autoCapitalize="none"
                />
                <TextInput style={styles.input} 
                       placeholder="Confirmar Senha"
                       secureTextEntry={true}
                       autoCapitalize="none"
                />

                <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <Text style={styles.textFooter}>
                            Ja tem uma conta?{" "}
                            <Link href="./">
                              <Text style={styles.textLink}>Entrar</Text>
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
  icon:{
    flex: 1,
    marginTop: 30,
    marginLeft: 13,
    
  },
  title:{
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 34,
    marginTop: 20,
    color:'#666'
  },
  register:{
    backgroundColor: '#B4DEBE',
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 60,
    borderTopLeftRadius: 80,
    
    
  },
  input:{
    width: '80%',
    height: 55, // Inputs mais altos
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: -20, // Maior espaçamento entre os inputs
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    elevation: 2,
    marginTop: 80,
    marginLeft: 38,
    margin:30,
    
  },
  button: {
    width: '80%',
    height: 55, 
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginLeft: 38,
    marginTop: 70,

  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  textFooter: {
    color: '# ',
    fontSize: 15,
    marginTop: 10,
    marginLeft: 100,
    
  },
  textLink: {
    fontWeight: 'bold',
    color: '#333',
  }


});
