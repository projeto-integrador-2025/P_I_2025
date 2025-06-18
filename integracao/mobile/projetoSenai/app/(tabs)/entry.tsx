import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Link } from 'expo-router';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>    

      <View>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.options}>
        <Text style={styles.text}>Projeto Integrador</Text>
        <Link href="/(tabs)/monitoramento" asChild>
          <TouchableOpacity style={styles.box1}>
            <Text style={styles.linkText}>Monitoramento</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(tabs)/chatbot" asChild>
          <TouchableOpacity style={styles.box1}>
            <Text style={styles.linkText}>Chatbot</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(tabs)/dashboard" asChild>
          <TouchableOpacity style={styles.box1}>
            <Text style={styles.linkText}>Dashboard</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(tabs)/sobre" asChild>
          <TouchableOpacity style={styles.box1}>
            <Text style={styles.linkText}>Sobre Nós</Text>
          </TouchableOpacity>
        </Link>
      </View>

      


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0D8', 
  },
 
  options: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    width: 200,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B4DEBE',
    borderRadius: 10,
    borderWidth: 1,
  },
  //B4DEBE
  //F0F0D8
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 25,
  },
  box1: {
    backgroundColor: '#F0F0D8',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    width: '80%', 
    alignItems: 'center',
    marginVertical: 8,
  },
  linkText: {
    color: '#000',
    fontSize: 16,
  },
  logo:{
    width: 140,
    height: 190,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
},

});
