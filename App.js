import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [tarefasAtual, setTarefasAtual] = useState('');
    const [listaTarefas, setListaTarefas] = useState([]);

    const handleAdicionarTarefa = () => {
        if (tarefasAtual.trim() !== '') {
            return;
        }
        setListaTarefas([...listaTarefas, tarefasAtual]);
        setTarefasAtual('');

    };
    const salvarTeste = async () => {
        await AsyncStorage.setItem('chave_secreta', 'Felipe');
        console.log('Teste salvo no cofre!');
    } ;
    return (
        <View>
            <Text style={styles.title}> Lista de Tarefas</Text>
            <View style={styles.inputContainer} >
                <TextInput
                    style={styles.input}
                    placeholder="Digite o reparo necessario"
                    value={tarefasAtual}
                    onChangeText={setTarefasAtual}
                />
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdicionarTarefa}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollArea}>
                contentContanerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                <View style={styles.listaBox}>
                    {listaTarefas.map((tarefa, index) => (
                        <View key={index} style={styles.cardTarefa}>
                            <Text style={styles.tarefaText}>{tarefa}</Text>
                        </View>
                    ))}
                </View>  start
            </ScrollView>
        </View>
    );


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 20,
    },
    counterBox: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    counterLabel: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 4,
    },
    counterText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        fontSize: 16,
        marginRight: 12,
    },
    button: {
        width: 56,
        height: 56,
        backgroundColor: '#007AFF',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
    },
});
}
