import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

export default function Monitoramento() {
    const data = [<Esteiras />, <Ativador />, <Tempos />, <Parada />,<Pecas />];

    return (
        <View style={styles.container}>
            <Link href="../../entry" style={styles.icon}>
                <EvilIcons name="arrow-left" size={40} color="#666" />
            </Link>

            <Carousel
                loop={false}
                width={width * 0.85}
                height={500}
                data={data}
                scrollAnimationDuration={500}
                renderItem={({ item }) => (
                    <View style={styles.box1}>
                        {item}
                    </View>
                )}
            />
        </View>
    );
}

function Esteiras() {
    return (
        <View>
            <Text style={styles.titulo}>Esteiras</Text>
            <Text style={styles.ligado}>🟢 Esteira 1: Ligada</Text>
            <Text style={styles.desligado}>🔴 Esteira 2: Desligada</Text>
        </View>
    );
}

function Ativador() {
    return (
        <View>
            <Text style={styles.titulo}>Dados da máquina</Text>
            <Text>• Ativador: Ligado</Text>
            <Text>• Tempo de processo da máquina: 0.0</Text>
            <Text>• Ultima parada: Est. 1</Text>
            <Text>• Erros: 0</Text>
        </View>
    );
}

function Tempos() {
    return (
        <View>
            <Text style={styles.titulo}>Tempos de Operação</Text>
            <Text>⏱ Processo: 00:12:45</Text>
            <Text>⏱ Total ligado: 03:21:10</Text>
        </View>
    );
}

function Parada() {
    return (
        <View>
            <Text style={styles.titulo}>Última Parada</Text>
            <Text>📅 2025-04-10 14:25</Text>
        </View>
    );
}

function Pecas() {
    return (
        <View>
            <Text style={styles.titulo}>Quantidade de peças</Text>
            <Text>• Qtd Metal:</Text>
            <Text>• Qtd Plásticos:</Text>
            <Text>• Qtd Total:</Text>
            <Text>• Qtd Rejeitados:</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B4DEBE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box1: {
        backgroundColor: '#F0F0D8',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
        
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ligado: {
        color: 'green',
        marginBottom: 5,
    },
    desligado: {
        color: 'red',
    },
});
