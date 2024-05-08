//Importação do useState
import React, { useState } from "react";
//Importação dos componentes padrões do React Native
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Image,
} from "react-native";
//Importação da API axios
import axios from "axios";

const App = () => {
  //Variável CEP com o valor em branco que mudara quando você digitar algo no Input
  const [cep, setCep] = useState("");
  //Variável ADDRESS com o valor nulo que mudará quando a função for executada
  const [address, setAddress] = useState(null);

  //A função fetchAddres é uma função async. Async é uma palavra chave que define se a função é assíncrona ou não
  const fetchAddress = async () => {
    //Try vai funcionar com um IF e ELSE
    //Onde primeiramente ele vai tentar(try) executar a função response
    //E caso não de certo ele usa o catch para pegar o erro e imprimi-lo no console
    try {
      //Essa função response tem um await. Await espera a resposta quando a função for executada, porém o código continua rodando pelo fato da função ser assíncrona
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Image source={require("./Mapa.png")} />
        <Text style={styles.textinho}>Digite o CEP:</Text>
        {/* Neste Input o valor vai ser CEP, ou seja qualquer coisa que for inserida aqui sera definida como valor da variável CEP(através do onChangeText) */}
        <TextInput
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          style={styles.inputs}
        />
        {/* Quando esse Pressable for pressionado a função fetchAddress vai ser executada */}
        <Pressable onPress={fetchAddress}>
          <Text style={styles.button}>Buscar Endereço</Text>
        </Pressable>
        {address && (
          //É a função vai ser impressa nessa View
          <View style={styles.resposta}>
            <Text style={styles.results}>CEP: {address.cep}</Text>
            <Text style={styles.results}>Rua: {address.logradouro}</Text>
            <Text style={styles.results}>Bairro: {address.bairro}</Text>
            <Text style={styles.results}>Cidade: {address.localidade}</Text>
            <Text style={styles.results}>Estado: {address.uf}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8FF",
  },

  container2: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 200,
  },

  inputs: {
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
    width: 300,
    borderWidth: 2,
    borderColor: "#DC143C",
    backgroundColor: "transparent",
    color: "#DC143C",
  },

  textinho: {
    fontWeight: "bold",
    marginTop: 25,
    marginRight: 205,
    paddingRight: 10,
    paddingLeft: 10,
    color: "#DC143C",
  },

  button: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#DC143C",
    width: 175,
    height: 45,
    borderRadius: 10,
  },

  resposta: {
    marginTop: 500,
    position: "absolute",
    backgroundColor: "#DC143C",
    borderRadius: 10,
  },

  results: {
    padding: 10,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default App;
