const API_URL = "http://localhost:3000/auth";
let attempts = 0;
let isLocked = false;

async function login() {
    if (isLocked) return;

    const rut = document.getElementById('rut').value;
    const pass = document.getElementById('pass').value;
    const errorMsg = document.getElementById('error-msg');
    const loadingScreen = document.getElementById('loading-screen');
    const btnIngresar = document.getElementById('btn-ingresar');

    // 1. Mostrar carga
    errorMsg.innerText = "";
    loadingScreen.style.display = "block";
    btnIngresar.style.display = "none";

    try {
        // Simulación de delay de red (1.5 seg)
        await new Promise(resolve => setTimeout(resolve, 1500));

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rut, pass })
        });

        const data = await response.json();
        loadingScreen.style.display = "none";

        if (response.ok && data.success) {
            document.getElementById('user-name').innerText = data.nombre;
            document.getElementById('user-rut-display').innerText = `RUT: ${rut}`;
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('payment-section').style.display = 'block';
        } else {
            btnIngresar.style.display = "block";
            attempts++;
            if (attempts >= 3) startLockout();
            else errorMsg.innerText = `Datos incorrectos. Intento ${attempts}/3`;
        }
    } catch (err) {
        loadingScreen.style.display = "none";
        btnIngresar.style.display = "block";
        errorMsg.innerText = "Error: El servidor no responde.";
    }
}

function startLockout() {
    isLocked = true;
    let seconds = 300;
    const timerDisplay = document.getElementById('timer');
    const interval = setInterval(() => {
        timerDisplay.innerText = `BLOQUEO: ${Math.floor(seconds/60)}:${seconds%60 < 10 ? '0' : ''}${seconds%60}`;
        if (seconds-- <= 0) { clearInterval(interval); isLocked = false; attempts = 0; timerDisplay.innerText = ""; }
    }, 1000);
}

// Iniciar con Enter
document.addEventListener("keypress", (e) => { if(e.key === "Enter") login(); });