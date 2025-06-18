import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');
const cardWidth = (width - 72) / 2;

// Importação das imagens locais
const rafaelImage = require('../../assets/images/rafael.jpeg');
const victorImage = require('../../assets/images/victor.jpeg');
const danielImage = require('../../assets/images/daniel.jpeg');
const valentinaImage = require('../../assets/images/valentina.jpeg');
const joseImage = require('../../assets/images/jose.jpeg');
const juliaImage = require('../../assets/images/julia.jpeg');
const samuelImage = require('../../assets/images/samuel.jpeg');

const teamMembers = [
  {
    id: 1,
    name: 'Rafael Bastos',
    role: 'Automação',
    location: 'Sorocaba, SP',
    email: 'teste@test.com',
    image: rafaelImage,
    description: 'Responsável pela automação e CLP.',
  },
  {
    id: 2,
    name: 'Julia de Lima',
    role: 'Nuvem',
    location: 'Sorocaba, SP',
    email: 'teste@test.com',
    image: juliaImage,
    description: 'Desenvolvimento e integração do projeto na nuvem pela AWS.',
  },
  {
    id: 3,
    name: 'Valentina Leite',
    role: 'Backend',
    location: 'Sorocaba, SP',
    email: 'teste@test.com',
    image: valentinaImage,
    description: 'Responsável pela criação e desenvolvimento da API.',
  },
  {
    id: 4,
    name: 'Victor',
    role: 'Banco de Dados',
    location: 'Sorocaba, SP',
    email: 'teste@test.com',
    image: victorImage,
    description: 'Criação e manutenção do banco de dados.',
  },
  {
    id: 5,
    name: 'José Eduardo',
    role: 'Frontend',
    location: 'Sorocaba, SP',
    email: 'teste@test.com',
    image: joseImage,
    description: 'Desenvolvimento do frontend da aplicação.',
  },
  {
    id: 6,
    name: 'Samuel Wellington',
    role: 'Mobile',
    location: 'Sorocaba, SP',
    email: 'teste@test.com',
    image: samuelImage,
    description: 'Desenvolvimento e criação do aplicativo mobile.',
  },
  {
    id: 7,
    name: 'Daniel Asiático',
    role: 'Chatbot',
    location: 'Sorocaba, SP',
    email: 'teste@test.com',
    image: danielImage,
    description: 'Construção do chatbot da aplicação.',
  },
  {
    id: 8,
    name: 'Otavio',
    role: '',
    location: 'Sorocaba, SP',
    email: 'teste@test.com',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: '',
  },
];

export default function TeamScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Link href="/(tabs)/entry" asChild>
        <TouchableOpacity style={styles.backButton}>
          <EvilIcons name="arrow-left" size={40} color="#444" />
        </TouchableOpacity>
      </Link>

      <View style={styles.backgroundGradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Nossa Equipe</Text>
          </View>

          {/* Team Grid */}
          <View style={styles.teamGrid}>
            {teamMembers.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <Image
                  source={typeof member.image === 'number' ? member.image : { uri: member.image }}
                  style={styles.memberImage}
                />
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>

                  <View style={styles.memberDetails}>
                    <View style={styles.detailRow}>
                      <View style={styles.locationIcon} />
                      <Text style={styles.detailText}>{member.location}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <View style={styles.emailIcon} />
                      <Text style={styles.detailText}>{member.email}</Text>
                    </View>
                  </View>

                  <Text style={styles.memberDescription}>{member.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Team Stats */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Juntos, fazemos a diferença</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Especialistas</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Estados</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>100%</Text>
                <Text style={styles.statLabel}>Dedicação</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0D8',
  },
  backgroundGradient: {
    flex: 1,
    backgroundColor: '#F0F0D8',
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#ffffffcc',
    padding: 8,
    borderRadius: 30,
    zIndex: 10,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 12,
    textAlign: 'center',
  },
  teamGrid: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  memberCard: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  memberImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F3F4F6',
  },
  memberInfo: {
    padding: 16,
  },
  memberName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#065F46',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 12,
  },
  memberDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#059669',
    marginRight: 6,
  },
  emailIcon: {
    width: 12,
    height: 8,
    backgroundColor: '#059669',
    marginRight: 6,
    borderRadius: 2,
  },
  detailText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    flex: 1,
  },
  memberDescription: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    lineHeight: 16,
  },
  statsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#065F46',
    marginBottom: 24,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#059669',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#047857',
  },
});
