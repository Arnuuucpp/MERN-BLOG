const heatmapContainer = document.getElementById('custom-heatmap');
const monthLabels = document.getElementById('month-labels');
const streakDisplay = document.getElementById('streak-count');

// Initial State
let myProgress = JSON.parse(localStorage.getItem('mernProgress')) || {};

function generateHeatmap() {
    heatmapContainer.innerHTML = '';
    monthLabels.innerHTML = '';

const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
monthLabels.innerHTML = ''; // Clear first

months.forEach(m => {
    const span = document.createElement('span');
    span.innerText = m;
    monthLabels.appendChild(span);
});

    // 2. Generate Squares
    // We'll show a full year grid, but only today onwards is "active"
    const totalSquares = 364; 
    const today = new Date();
    
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        
        // Calculate date for this square relative to a starting point (e.g., March 1st)
        const startDate = new Date(2026, 2, 1); // March 1, 2026
        const currentSquareDate = new Date(startDate);
        currentSquareDate.setDate(startDate.getDate() + i);
        
        const dateKey = currentSquareDate.toDateString();
        const isDone = myProgress[dateKey];
        const isToday = currentSquareDate.toDateString() === today.toDateString();

        square.className = `w-3 h-3 rounded-sm transition-all duration-300`;
        
        if (isDone) {
            square.classList.add('bg-green-400', 'shadow-[0_0_8px_rgba(74,222,128,0.5)]');
        } else if (isToday) {
            square.classList.add('bg-zinc-800', 'border', 'border-zinc-700'); // Highlight today
        } else {
            square.classList.add('bg-zinc-900/50'); // Future or empty days
        }

        // Add tooltip info (optional)
        square.title = dateKey;
        
        heatmapContainer.appendChild(square);
    }
    updateStreak();
}

function checkInToday() {
    const todayKey = new Date().toDateString();
    
    if (myProgress[todayKey]) {
        alert("Already logged! Go build something great now. 💻");
        return;
    }

    myProgress[todayKey] = true;
    localStorage.setItem('mernProgress', JSON.stringify(myProgress));
    generateHeatmap();
}

function updateStreak() {
    const days = Object.keys(myProgress).length;
    streakDisplay.innerText = `STREAK: ${days} DAYS`;
}

generateHeatmap();