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

    // 1. Limpiar caras y asignar pelis
    faces.forEach((face, index) => {
        face.style.display = index < movies.length ? "block" : "none";
        if (movies[index]) face.innerText = movies[index];
    });

    // 2. Elegir ganadora
    const randomIndex = Math.floor(Math.random() * movies.length);
    
    // 3. Definir rotaciones según la cara ganadora
    const rotations = [
        { x: 0, y: 0 },          // Cara 1 (Front)
        { x: 0, y: 180 },        // Cara 2 (Back)
        { x: 0, y: -90 },        // Cara 3 (Right)
        { x: 0, y: 90 },         // Cara 4 (Left)
        { x: -90, y: 0 },        // Cara 5 (Top)
        { x: 90, y: 0 }          // Cara 6 (Bottom)
    ];

    // Añadimos múltiples vueltas (360 * 5) para el efecto de animación
    const extraSpin = 1800; 
    const target = rotations[randomIndex];
    
    dice.style.transform = `rotateX(${target.x + extraSpin}deg) rotateY(${target.y + extraSpin}deg)`;

    // 4. Mostrar resultado tras la animación
    resultText.innerText = "Sorteando...";
    setTimeout(() => {
        resultText.innerText = `🍿 ¡Hoy toca ver: ${movies[randomIndex]}!`;
    }, 3000);
}
