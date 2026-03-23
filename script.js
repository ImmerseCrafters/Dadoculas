// Variable global para acumular las vueltas y que siempre gire
let currentRotationX = 0;
let currentRotationY = 0;

function rollDice() {
    const input = document.getElementById('movieInput').value;
    const movies = input.split('\n').filter(m => m.trim() !== "");
    
    if (movies.length < 2 || movies.length > 6) {
        alert("Por favor, introduce entre 2 y 6 películas.");
        return;
    }

    const dice = document.getElementById('dice');
    const faces = document.querySelectorAll('.face');
    const resultText = document.getElementById('result');

    // 1. Asignar películas a las caras visibles
    faces.forEach((face, index) => {
        if (index < movies.length) {
            face.style.display = "block";
            face.innerText = movies[index];
        } else {
            face.style.display = "none";
        }
    });

    // 2. Elegir ganadora al azar
    const randomIndex = Math.floor(Math.random() * movies.length);
    
    // 3. Coordenadas exactas para que cada cara quede de frente
    const faceRotations = [
        { x: 0, y: 0 },          // Cara 1
        { x: 0, y: 180 },        // Cara 2
        { x: 0, y: -90 },        // Cara 3
        { x: 0, y: 90 },         // Cara 4
        { x: -90, y: 0 },        // Cara 5
        { x: 90, y: 0 }          // Cara 6
    ];

    const target = faceRotations[randomIndex];

    // 4. EL TRUCO: Sumamos al menos 5 vueltas completas (1800deg) 
    // a la posición actual para que siempre parezca una "tirada nueva"
    currentRotationX += 1800 + target.x; 
    currentRotationY += 1800 + target.y;

    // Aplicamos la rotación acumulada
    dice.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;

    // 5. Feedback visual
    resultText.innerText = "🎲 ¡Lanzando dado...!";
    resultText.style.color = "#ffeb3b"; // Color amarillo mientras gira

    setTimeout(() => {
        resultText.innerText = `🍿 ¡Hoy toca: ${movies[randomIndex]}!`;
        resultText.style.color = "#ffffff";
    }, 3000); // Coincide con el tiempo de la transición CSS
}
