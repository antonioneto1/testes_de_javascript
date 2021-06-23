const botao = document.querySelector('#botao_contador');

const resultado = document.querySelectorAll('#resultado')


const arr = x => Array.from(x);

const num = x => Number(x) || 0;

const str = x => String(x);

const vazio = xs => xs.length === 0;

const pegar = n => xs => xs.slice(0,n);

const drop = n => xs => xs.slice(n);

const reverse = xs => xs.slice(0).reverse();

const comp = f => g => x => f (g (x));

const not = x => !x;

const fragmento = n => xs =>
  vazio(xs) ? [] : [pegar(n)(xs), ...fragmento (n) (drop (n) (xs))];


botao.addEventListener('click', (e) => {
  const valor_inicial = parseInt(document.querySelector('#valor_inicial').value)
  const valor_final = parseInt(document.querySelector('#valor_final').value)
  if(valor_inicial && valor_final && (valor_final > valor_inicial)){
    calcular_numeros(e, valor_inicial, valor_final)
  } else if(valor_final < valor_inicial){
    alert('O Valor Inicial Não pode ser Maior que o valor Final')
  }
  else{
    alert('Você precisa digitar um Valor valido para ser calculado')
  }
})


function calcular_numeros(e, valor_inicial, valor_final){
  array_de_numeros = []
  while (valor_inicial != valor_final){
    array_de_numeros.push(valor_inicial);
    valor_inicial += 1
  }
  array_de_numeros.push(valor_final);
  calcular_letras(array_de_numeros, valor_final)
}

function calcular_letras(array_de_numeros, valor_final){
  total_numero_de_letras = 0
  array_de_numeros.map(function(num) {
    string = conversor_de_numeros_em_letras(num)

    numero_de_letras = string.replaceAll(" ","").length
    total_numero_de_letras += numero_de_letras

  });
   inicial = parseInt(document.querySelector('#valor_inicial').value)
  alert('A quantida de Letras de ' + inicial + ' Até ' + valor_final + ' É ' + total_numero_de_letras)
}

let conversor_de_numeros_em_letras = n => {
  let a = [
    '', 'um', 'dois', 'tres', 'quatro',
    'cinco', 'seis', 'sete', 'oito', 'nove',
    'dez', 'onze', 'doze', 'treze', 'quatorze',
    'quinze', 'dezeseis', 'dezesete', 'dezoito', 'dezenove'
  ];
  let b = [
    '', '', 'vinte', 'trinta', 'quarenta',
    'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'
  ];
  let c = [
    '', 'mil', 'milhao', 'bilhao', 'trilha', 'quatrilhão',
    'quintilhão', 'sextilhão', 'setilhão', 'octilhão', 'nonilhão'
  ];

  let agrupar = ([unidades,dezenas,centena]) => {
    return [
      num(centena) === 0 ? '' : a[centena] + ' mil ',
      num(unidades) === 0 ? b[dezenas] : b[dezenas] && b[dezenas] + '-' || '',
      a[dezenas+unidades] || a[unidades]
    ].join('');
  };

  let milhares = (group,i) => group === '' ? group : `${group} ${c[i]}`;
  
  if (typeof n === 'number') return conversor_de_numeros_em_letras(String(n));
  if (n === '0')             return 'zero';
  return comp (fragmento(3)) (reverse) (arr(n))
    .map(agrupar)
    .map(milhares)
    .filter(comp(not)(vazio))
    .reverse()
    .join('');
};





