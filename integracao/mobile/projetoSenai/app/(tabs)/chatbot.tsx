import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link } from 'expo-router';

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Olá! Sou o assistente do sistema de separação de materiais. Em que posso te ajudar?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulando resposta do bot
    const response = generateResponse(input);
    setMessages((prev) => [...prev, { from: 'bot', text: response }]);
    setInput('');
  };

  const generateResponse = (text: string) => {
    text = text.toLowerCase();

    if (text.includes('status')) return 'O CLP está operando normalmente.';
    if (text.includes('recicláveis')) return 'Hoje, foram detectadas 83 peças recicláveis.';
    if (text.includes('histórico')) return 'O histórico de produção está disponível no dashboard.';
     if (text.includes('erro')) return 'Erro na esteira 1';
    return 'Desculpe, não entendi. Tente perguntar sobre o status, erro, peças recicláveis ou histórico.';
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <Link href="/(tabs)/entry" style={styles.icon}>
         <EvilIcons name="arrow-left" size={45} color="#666" />
      </Link>
      <ScrollView style={styles.messages}>
        {messages.map((msg, index) => (
          <View key={index} style={[styles.message, msg.from === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#666"
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0D8',
  },
  messages: {
    padding: 16,
  },
  message: {
    marginTop: 50,
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#77CCA4',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#B4DEBE',
  },
  messageText: {
    color: '#333',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0D8',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#77CCA4',
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
   icon: {
     position: 'absolute',
     top: 20,
     left: 20,
     zIndex: 10,
  },
});
