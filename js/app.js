// Elements
const currency1 = document.getElementById('currency1');
const currency2 = document.getElementById('currency2');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const rateEl = document.getElementById('rate');
const swapBtn = document.getElementById('swap');
const dateEl = document.getElementById('date-container');

// Logic
function getData() {
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency1.value}`)
    .then((res) => res.json())
    .then((data) => {
      const currentRate = data.rates[`${currency2.value}`];
      updateDOM(currentRate);
    });
}

function updateDOM(rate) {
  input2.value = (Number(input1.value) * rate).toFixed(2);
  rateEl.innerText = ` 1 ${currency1.value} = ${rate} ${currency2.value} `;
}

function changeCurrency() {
  let aux = currency1.value;

  currency1.value = currency2.value;
  currency2.value = aux;

  getData();
}

// Current date display
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

dateEl.innerHTML = `<p>Actualizado hoy (${dd}/${mm}/${yyyy})</p>`;

// Event listeners
input1.addEventListener('input', getData);
input2.addEventListener('input', getData);

currency1.addEventListener('change', getData);
currency2.addEventListener('change', getData);

swapBtn.addEventListener('click', changeCurrency);
