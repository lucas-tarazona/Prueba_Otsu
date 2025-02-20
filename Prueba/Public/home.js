// Llamada al backend para obtener los productos
window.onload = async function() {
    try {
        const response = await fetch('http://localhost:3000/productos');
        if (response.ok) {
            const productos = await response.json();
            mostrarProductos(productos);
        } else {
            alert('No se pudieron cargar los productos');
        }
    } catch (error) {
        console.error('Error al obtener productos:', error);
        alert('Error al cargar los productos');
    }
};

// Función para mostrar los productos en la página
function mostrarProductos(productos) {
    const productosContainer = document.getElementById('productos-container');
    
    if (productos.length === 0) {
        productosContainer.innerHTML = '<p>No hay productos disponibles.</p>';
    } else {
        productos.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto');
            
            productoElement.innerHTML = `
                <h3>${producto.Nombre}</h3>
                <p><span class="variacion">Variación:</span> ${producto.Variaciones}</p>
                <p class="observaciones"><strong>Observaciones:</strong> ${producto.Observaciones}</p>
            `;
            
            productosContainer.appendChild(productoElement);
        });
    }
}
