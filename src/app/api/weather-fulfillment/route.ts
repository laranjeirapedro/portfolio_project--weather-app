import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  // Recebe os dados do Dialogflow, incluindo a cidade
  const { queryResult } = await request.json();
  const city = queryResult.parameters['location'];  // O parâmetro de cidade que o usuário informou

  // Verifica se a cidade foi passada
  if (!city) {
    return NextResponse.json({
      fulfillmentText: 'Desculpe, não consegui encontrar a cidade. Você poderia tentar novamente?',
    });
  }

  // Chave de API da WeatherAPI
  const apiKey = 'b0dc2002600e43989ee14134252901';  // Substitua pela sua chave de API
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    // Fazendo a requisição para a WeatherAPI
    const response = await axios.get(url);
    const weatherData = response.data;

    // Caso a API de clima não retorne dados válidos
    if (!weatherData.current) {
      return NextResponse.json({
        fulfillmentText: `Desculpe, não consegui encontrar informações sobre o clima de ${city}. Tente novamente.`,
      });
    }

    // Extrai os dados de clima e temperatura
    const temperature = weatherData.current.temp_c;
    const condition = weatherData.current.condition.text;

    // Retorna a resposta ao Dialogflow
    return NextResponse.json({
      fulfillmentText: `A temperatura atual em ${city} é de ${temperature}°C e o clima está ${condition}.`,
    });

  } catch (error) {
    console.error('Erro ao acessar a API do WeatherAPI:', error);
    return NextResponse.json({
      fulfillmentText: 'Houve um erro ao tentar acessar as informações do clima. Tente novamente mais tarde.',
    });
  }
}