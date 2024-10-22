// public/script.js
document.addEventListener('DOMContentLoaded', function() {
    const fruitForm = document.getElementById('fruit-form');
    const fruitTableBody = document.querySelector('#fruit-table tbody');
    const messageDiv = document.getElementById('message');

    // Gyümölcsök betöltése
    fetch('/api/fruits')
        .then(response => response.json())
        .then(fruits => {
            fruits.forEach(fruit => addFruitToTable(fruit));
        });

    // Új gyümölcs rögzítése
    fruitForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const price = parseFloat(document.getElementById('price').value);
        const unit = document.getElementById('unit').value;
        const quantity = parseFloat(document.getElementById('quantity').value);

        // Adatok elküldése a szervernek
        fetch('/api/fruits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price, unit, quantity })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                messageDiv.textContent = data.message;
            }
            if (data.fruit) {
                addFruitToTable(data.fruit);
                fruitForm.reset();
            }
        })
        .catch(error => console.error('Hiba:', error));
    });

    // Gyümölcs hozzáadása a táblázathoz
    function addFruitToTable(fruit) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fruit.name}</td>
            <td>${fruit.price}</td>
            <td>${fruit.unit}</td>
            <td>${fruit.quantity}</td>
        `;
        fruitTableBody.appendChild(row);
    }
});
