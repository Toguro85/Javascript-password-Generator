const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const lowercaseEl = document.getElementById('lowercase');
const uppercaseEl = document.getElementById('uppercase');
const symbolsEl = document.getElementById('symbols');
const numbersEl = document.getElementById('numbers');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc ={
  lower: getRandomLower,
  upper: getRandomUpper,
  symbol: getRandomSymbol,
  number: getRandomNumber
}

generate.addEventListener('click',() =>{
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length){
  let pass = '';
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

  if(typesCount === 0)
  return '';

  for(let i=0; i<length; i+=typesCount){
    typesArr.forEach(type =>{
      const funcName = Object.keys(type)[0];
      pass += randomFunc[funcName]();
    });
    }
    const finalPass = pass.slice(0, length);
    return finalPass;
}

clipboard.addEventListener('click',() =>{
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if(!password)
  return '';

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard');
});
	//if(!password) { return; }



function getRandomLower(){
  return String.fromCharCode(Math.floor(Math.random() *26) +97);
}

function getRandomUpper(){
  return String.fromCharCode(Math.floor(Math.random() *26) +65);
}

function getRandomNumber(){
  return String.fromCharCode(Math.floor(Math.random() *10) +48);
}

function getRandomSymbol(){
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)];
}
