// Fetch exchange rates from an API
async function fetchExchangeRates() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    return data.rates;
  }
  
  // Populate currency dropdowns with options
  async function populateCurrencies() {
    const rates = await fetchExchangeRates();
    const fromCurrencyDropdown = document.getElementById('from');
    const toCurrencyDropdown = document.getElementById('to');
  
    for (const currency in rates) {
      const option1 = document.createElement('option');
      option1.value = currency;
      option1.text = currency;
      const option2 = document.createElement('option');
      option2.value = currency;
      option2.text = currency;
      fromCurrencyDropdown.add(option1);
      toCurrencyDropdown.add(option2);
    }
  }
  
  // Convert currency
  function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;
  
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[toCurrency];
        const result = amount * rate;
        document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
      })
      .catch(error => console.error('Error:', error));
  }
  
  // Populate currency dropdowns on page load
  populateCurrencies();
  