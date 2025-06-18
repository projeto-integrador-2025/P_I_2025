import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const logo = require('../assets/images/logo.png');

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.subtitle}>
        Solução inteligente para o monitoramento e classificação de resíduos.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => router.push('/auth/login')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0D8',  // bege esverdeado claro
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4A7C59', // verde musgo médio escuro
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666', // cinza escuro para contraste suave
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
  },
  buttonPrimary: {
    backgroundColor: '#77CCA4', // verde pastel vibrante
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#4A7C59',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // para sombra no Android
  },
  buttonText: {
    color: '#F0F0D8', // cor clara para o texto do botão
    fontSize: 18,
    fontWeight: '600',
  },
});
