"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//pegar o form
const form = document.querySelector('#search-form > form');
//pegar o conteúdo do formulário digitado pelo usuário
const input = document.querySelector('#input-localizacao'); //especifica o tipo de input
//
const sectionTempoInfo = document.querySelector('#tempo-info');
//adicionar evento no form - transformando a callback em função assíncrona
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault(); //impede o recarregamento da página
    if (!input || !sectionTempoInfo)
        return; //retorna a função se o input for nulo
    //pegar o conteúdo do input
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert('O local precisa ter pelo menos 3 letras.');
        return;
    }
    //fazer uma requisição - pegar a url da api openweatherapi
    //acrescentar o await depois de tornar a callback em assíncrona
    const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=32b8823b187195355ef8a09f773d0e74&lang=pt_br&units=metric`);
    //convertendo a resposta em JSON
    const dados = yield resposta.json();
    //pegar o clima
    const infos = {
        temperatura: Math.round(dados.main.temp),
        local: dados.name,
        icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };
    //jogando o HTML de forma dinâmica
    sectionTempoInfo.innerHTML = `
    <div class="tempo-dados">
      <h2>${infos.local}</h2>

      <span>${infos.temperatura}°C</span>
    </div>
    <img src="${infos.icone}" alt="" />
  `;
    console.log(dados);
}));
//link da api
//https://api.openweathermap.org/data/2.5/weather?q=sao%20paulo&appid=32b8823b187195355ef8a09f773d0e74&lang=pt_br&units=metric
//link da imagem
//https://openweathermap.org/img/wn/10d@2x.png
/*adicionando o tratamento de erros com try/catch

try {
const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=32b8823b187195355ef8a09f773d0e74&lang=pt_br&units=metric`)
  
  //convertendo a resposta em JSON
  const dados = await resposta.json();

  //pegar o clima
  const infos = {
    temperatura: Math.round(dados.main.temp),
    local: dados.name,
    icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
  }

  //jogando o HTML de forma dinâmica
  sectionTempoInfo.innerHTML = `
    <div class="tempo-dados">
      <h2>${infos.local}</h2>

      <span>${infos.temperatura}°C</span>
    </div>
    <img src="${infos.icone}" alt="" />
  `;
  } catch (error) {
   console.log('Deu um erro na obtenção dos dados da API', err)
   }
  //console.log(dados);
})*/ 
