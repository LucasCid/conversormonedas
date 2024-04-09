const monedaEl_one = document.getElementById('moneda-uno');
const monedaEl_two = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');

// ------------
fetch('/mindicador.json')
  .then(response => response.json())
  .then(data => {
    const tasasCLP = data;

    function calculateCLP() {
      const moneda_one = monedaEl_one.value;
      const moneda_two = monedaEl_two.value;

      const tasa = tasasCLP[moneda_one].valor / tasasCLP[moneda_two].valor;

      cambioEl.innerText = `1 ${moneda_one} = ${tasa.toFixed(2)} ${moneda_two}`;
      cantidadEl_two.value = (cantidadEl_one.value * tasa).toFixed(2);
    }

    monedaEl_one.addEventListener('change', calculateCLP);
    cantidadEl_one.addEventListener('input', calculateCLP);
    monedaEl_two.addEventListener('change', calculateCLP);
    cantidadEl_two.addEventListener('input', calculateCLP);

    tazaEl.addEventListener('click', () => {
      const temp = monedaEl_one.value;
      monedaEl_one.value = monedaEl_two.value;
      monedaEl_two.value = temp;
      calculateCLP();
    });

    calculateCLP();
  })
  .catch(error => console.error('Error al obtener los datos del archivo JSON:', error));

//  --------------------
fetch('https://mindicador.cl/api/')
  .then(response => response.json())
  .then(data => {
    const tasasExternas = data;


    const tasaUF = tasasExternas.uf.valor;
    const tasaEuro = tasasExternas.euro.valor;
    const tasaDolar = tasasExternas.dolar.valor;

    console.log('Tasa UF:', tasaUF);
    console.log('Tasa Euro:', tasaEuro);
    console.log('Tasa Dólar:', tasaDolar);
  })

  .catch(error => console.error('Error al obtener las tasas de cambio externas:', error));


