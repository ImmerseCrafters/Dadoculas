let currentRotationX = 0;
let currentRotationY = 0;

function rollDice() {
    const input = document.getElementById('movieInput').value;
    const movies = input.split('\n').filter(m => m.trim() !== "");
    const numMovies = movies.length;

    if (numMovies < 2 || numMovies > 6) {
        alert("Introduce entre 2 y 6 películas por favor.");
        return;
    }

    const dice = document.getElementById('dice');
    const faces = document.querySelectorAll('.face');
    const resultText = document.getElementById('result');

    // Cambiar la forma del dado según el número de pelis
    dice.className = `cube dice-${numMovies}`;

    // Asignar nombres a las caras
    faces.forEach((face, i) => {
        if (i < numMovies) {
            face.style.display = "flex";
            face.innerText = movies[i];
        } else {
            face.style.display = "none";
        }
    });

    const randomIndex = Math.floor(Math.random() * numMovies);
    let targetX = 0;
    let targetY = 0;

    // Lógica de rotación matemática
    if (numMovies === 6) {
        const cubeRotations = [
            {x:0, y:0}, {x:0, y:180}, {x:0, y:-90}, 
            {x:0, y:90}, {x:-90, y:0}, {x:90, y:0}
        ];
        targetX = cubeRotations[randomIndex].x;
        targetY = cubeRotations[randomIndex].y;
    } else {
        const angle = 360 / numMovies;
        targetY = -(angle * randomIndex);
        targetX = 0;
    }

    // Sumamos vueltas extra (1440deg = 4 vueltas) para el efecto
    currentRotationX += 1440 + targetX;
    currentRotationY += 1440 + targetY;

    dice.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    resultText.innerText = "🎬 ¡Rodando...!";

    setTimeout(() => {
        resultText.innerText = `🍿 ¡Vemos: ${movies[randomIndex]}!`;
    }, 3000);
}
