// Cambiar entre los formularios de login y registro
document.getElementById('switch-to-register').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

document.getElementById('switch-to-login').addEventListener('click', function() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

// Llamada al backend para login
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass: password })
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage);  
    }else{
        console.log("a")
        window.location.href = '/home.html';
    }
});

// Llamada al backend para registro
document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('http://localhost:3000/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass: password })
    });

    if (response.ok) {
        alert('Usuario registrado exitosamente');
        // Puedes redirigir o hacer algo después del registro exitoso
    } else {
        const errorMessage = await response.text();
        alert(errorMessage);  // Mostrar el error en caso de fallo en el registro
    }
});
