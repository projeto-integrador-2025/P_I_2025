
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';


export default function DashboardScreen() {
  return (
    <View style={styles.container}>    
    
      <View style={styles.options}>
        <TouchableOpacity style={styles.monitoramento}>
          <Link href="./monitoramento">Monitoramento</Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatbot}><Link href="./chatbot">Chatbot</Link></TouchableOpacity>
        <TouchableOpacity style={styles.dashboard}><Link href="./dashboard">Dashoard</Link></TouchableOpacity>
        <TouchableOpacity style={styles.about}><Link href="./sobre">Sobre Nós</Link></TouchableOpacity>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B4DEBE', // Fundo verde inferior
  },
  options:{
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 200,
    width: 200,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0D8',
    borderRadius: 10,
  },
  monitoramento:{
    backgroundColor: '#B4DEBE',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  dashboard:{
    backgroundColor: '#B4DEBE',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  chatbot:{
    backgroundColor: '#B4DEBE',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  about:{
    backgroundColor: '#B4DEBE',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  }
   

});
