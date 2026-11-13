import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [tarefasAtual, setTarefasAtual] = useState('');
    const [listaTarefas, setListaTarefas] = useState([]);

  
    const salvarDadosLocal = async (novaLista) => {
        try {
            const listaString = JSON.stringify(novaLista);
            await AsyncStorage.setItem('minhas_tarefas', listaString);
        } catch (error) {
            console.error('Erro ao salvar dados: ', error);
        }
    };


    const resgatarDadosLocal = async () => {
        try {
            const listaString = await AsyncStorage.getItem('minhas_tarefas');
            if (listaString !== null) {
                setListaTarefas(JSON.parse(listaString));
            }
        } catch (error) {
            console.error('Erro ao resgatar dados: ', error);
        }
    };


    useEffect(() => {
        resgatarDadosLocal();
    }, []);


    const handleAdicionarTarefa = () => {

        if (tarefasAtual.trim() === '') {
            return;
        }


        const novaLista = [...listaTarefas, tarefasAtual];
        setListaTarefas(novaLista);
        salvarDadosLocal(novaLista);
        setTarefasAtual('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Tarefas</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o reparo necessario"
                    value={tarefasAtual}
                    onChangeText={setTarefasAtual}
                />

                <TouchableOpacity style={styles.button} onPress={handleAdicionarTarefa}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
                <View style={styles.listaBox}>
                    {listaTarefas.map((tarefa, index) => (
                        <View key={index} style={styles.cardTarefa}>
                            <Text style={styles.tarefaText}>{tarefa}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
    scrollArea: {
        flex: 1,
    },
    listaBox: {
        paddingBottom: 20,
    },
    cardTarefa: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    tarefaText: {
        fontSize: 16,
        color: '#1A1A1A',
    },
});
