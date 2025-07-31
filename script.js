const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const serviceList = document.getElementById('service-list');
const paymentForm = document.getElementById('payment-form');
const payBtn = document.getElementById('pay-btn');

// Configuración de Google Sign-In
const clientId = 'TU_CLIENT_ID_DE_GOOGLE';
const scopes = 'profile email';
const redirectUri = 'http://localhost:8080';

// Configuración de PayPal
const paypalClientId = 'TU_CLIENT_ID_DE_PAYPAL';

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

// Pagar con PayPal
payBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const serviceId = document.getElementById('service').value;
    const amount = document.getElementById('amount').value;
    // Crear orden de pago con PayPal
    paypal.Buttons({
        env: 'sandbox',
        client: {
            sandbox: paypalClientId,
        },
        payment: (data, actions) => {
            return actions.payment.create({
                transactions: [
                    {
                        amount: {
                            total: amount,
                            currency: 'USD',
                        },
                    },
                ],
            });
        },
        onAuthorize: (data, actions) => {
            return actions.payment.execute().then((response) => {
                console.log(response);
                alert('Pago realizado con éxito');
            });
        },
    }).render('#pay-btn');
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