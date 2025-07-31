const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const serviceList = document.getElementById('service-list');
const paymentForm = document.getElementById('payment-form');
const payBtn = document.getElementById('pay-btn');

// Configuración de Google Sign-In
const clientId = 'TU_CLIENT_ID_DE_GOOGLE';
const scopes = 'profile email';
const redirectUri = 'http://localhost:8080';

// Configuración de Stripe
const stripe = Stripe('TU_CLAVE_PUBLICA_DE_STRIPE');
const elements = stripe.elements();

// Cargar servicios dinámicos
const services = [
    { id: 1, name: 'Servicio 1' },
    { id: 2, name: 'Servicio 2' },
    { id: 3, name: 'Servicio 3' },
];

services.forEach((service) => {
    const option = document.createElement('option');
    option.value = service.id;
    option.textContent = service.name;
    serviceList.appendChild(option);
});

// Login con Google
loginBtn.addEventListener('click', () => {
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`;
    window.location.href = authUrl;
});

// Logout
logoutBtn.addEventListener('click', () => {
    // Eliminar token de acceso
    localStorage.removeItem('accessToken');
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'block';
});

// Pagar con tarjeta de crédito
payBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const serviceId = document.getElementById('service').value;
    const amount = document.getElementById('amount').value;
    const cardNumber = document.getElementById('card-number').value;
    const expirationDate = document.getElementById('expiration-date').value;
    const cvv = document.getElementById('cvv').value;

    // Crear token de pago con Stripe
    stripe.createToken({
        card: {
            number: cardNumber,
            exp_month: expirationDate.split('/')[0],
            exp_year: expirationDate.split('/')[1],
            cvc: cvv,
        },
    }).then((result) => {
        if (result.error) {
            console.error(result.error);
        } else {
            const token = result.token.id;
            // Enviar token a tu servidor para procesar el pago
            fetch('/procesar-pago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    serviceId,
                    amount,
                }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        }
    });
});

// Comprobar si el usuario está autenticado
const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
} else {
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
}