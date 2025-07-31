const paymentMethodSelect = document.getElementById('payment-method');
const paymentDetailsDiv = document.getElementById('payment-details');

paymentMethodSelect.addEventListener('change', () => {
    const selectedMethod = paymentMethodSelect.value;
    paymentDetailsDiv.innerHTML = '';

    switch (selectedMethod) {
        case 'tarjeta-credito':
            paymentDetailsDiv.innerHTML = `
                <label for="card-number">Número de tarjeta:</label>
                <input type="text" id="card-number" name="card-number" required>
                <label for="expiration-date">Fecha de vencimiento:</label>
                <input type="text" id="expiration-date" name="expiration-date" required>
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" required>
            `;
            break;
        case 'tarjeta-debito':
            paymentDetailsDiv.innerHTML = `
                <label for="card-number">Número de tarjeta:</label>
                <input type="text" id="card-number" name="card-number" required>
                <label for="expiration-date">Fecha de vencimiento:</label>
                <input type="text" id="expiration-date" name="expiration-date" required>
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" required>
            `;
            break;
        case 'paypal':
            paymentDetailsDiv.innerHTML = `
                <label for="paypal-email">Correo electrónico de PayPal:</label>
                <input type="email" id="paypal-email" name="paypal-email" required>
            `;
            break;
        case 'transferencia-bancaria':
            paymentDetailsDiv.innerHTML = `
                <label for="bank-account">Número de cuenta bancaria:</label>
                <input type="text" id="bank-account" name="bank-account" required>
            `;
            break;
        default:
            break;
    }
});