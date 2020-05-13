/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [cripto, setCripto] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const consultarCripto = async () => {
      if (consultarAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
        const res=await axios.get(url);
        setResultado(res.data.DISPLAY[cripto][moneda]);
        console.log(resultado);
        setConsultarAPI(false);
        
      }
    };
    consultarCripto();
  }, [consultarAPI]);

  const obtenerMoneda = moneda => {
    setMoneda(moneda);
  };

  const obtenerCripto = cripto => {
    setCripto(cripto);
  };
  return (
    <ScrollView>
      <Header />
      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          cripto={cripto}
          obtenerMoneda={obtenerMoneda}
          obtenerCripto={obtenerCripto}
          setConsultarAPI={setConsultarAPI}
        />
      </View>
      <Cotizacion
          resultado={resultado}
        />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
