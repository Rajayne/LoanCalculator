function getCurrentUIValues() {
  return {
    amount: +(document.getElementById('loan-amount').value),
    years: +(document.getElementById('loan-years').value),
    rate: +(document.getElementById('loan-rate').value),
  };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values = {amount: 1000, years: 10, rate: 4.5};
  const amountUI = document.getElementById('loan-amount');
  amountUI.value = values.amount;
  const yearsUI = document.getElementById('loan-years');
  yearsUI.value = values.years;
  const rateUI = document.getElementById('loan-rate');
  rateUI.value = values.rate;
  // eslint-disable-next-line no-use-before-define
  update();
}

// Given amount, years and rate calculate the monthly payment 2 decimal places
// P = Amount of principle
// i = periodic interest rate (in our case yearly rate ÷ 12)
// n = total number of payments (years × 12)
// monthlyPayment = (P*i)/(1-(1+i)**-n)
function calculateMonthlyPayment(values) {
  const monthlyRate = (values.rate / 100) / 12;
  const n = Math.floor(values.years * 12);
  const monthlyPayment = (values.amount * monthlyRate) / (1 - (1 + monthlyRate) ** -n);

  return monthlyPayment.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyUI = document.getElementById('monthly-payment');
  monthlyUI.innerText = `$${monthly}`;
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentUIValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentUIValues));
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calc-form');
  if (form) {
    setupIntialValues();
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      update();
    });
  }
});
