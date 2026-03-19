const heatmapContainer = document.getElementById('custom-heatmap');
const monthLabels = document.getElementById('month-labels');
const streakDisplay = document.getElementById('streak-count');
const feedContainer = document.getElementById('feed-container');


const posts = [
    {
        date: "MARCH 19, 2026",
        day: "04`",
        title: "GRIND DAY : 04",
        learned: "Revising css by building ",
        mistakes: "was busy with some work"
    },
    {
        date: "MARCH 18, 2026",
        day: "03`",
        title: "GRIND DAY : 03",
        learned: "VERSION CONTROL",
        mistakes: "SLEPT ON THE KEYBOARD AND LOST 2-3 HOURS OF WORK. ALWAYS COMMIT OFTEN!"
    },
    {
        date: "MARCH 17, 2026",
        day: "02",
        title: "GRIND DAY : 02",
        learned: "Implemented dynamic rendering so I don't have to touch HTML every day.",
        mistakes: "Fixed the month label alignment issue in the CSS grid."
    },
    {
        date: "MARCH 16, 2026",
        day: "01",
        title: "GRIND DAY : 01",
        learned: "Built my own custom heatmap and understood LocalStorage.",
        mistakes: "Struggled with CSS Grid column flow initially."
    },
    {
        date: "MARCH 15, 2026",
        day: "00",
        title: "The Journey Begins DAY 0",
        learned: "Designed the initial UI and setup the MERN Log aesthetic.",
        mistakes: "None, just pure excitement to start!"
    }
];

// Initial State
let myProgress = JSON.parse(localStorage.getItem('mernProgress')) || {};

// --- 2. RENDER THE BLOG FEED ---
function renderFeed() {
    feedContainer.innerHTML = ''; // Clear existing
    posts.forEach(post => {
        const articleHTML = `
            <article class="relative pl-8 border-l border-zinc-800 hover:border-blue-500 transition-all">
                <div class="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <p class="text-[10px] text-zinc-600 mb-2 font-mono uppercase tracking-widest">${post.date}</p>
                <h3 class="text-white font-bold text-xl mb-4">${post.title}</h3>
                <div class="space-y-4 text-sm leading-relaxed">
                    <p><span class="text-green-500 font-bold uppercase text-[10px] mr-2">✓ Learnt:</span> ${post.learned}</p>
                    <p><span class="text-red-500 font-bold uppercase text-[10px] mr-2">⚠ Mistakes:</span> ${post.mistakes}</p>
                </div>
            </article>
        `;
        feedContainer.innerHTML += articleHTML;
    });
}

// --- 3. HEATMAP LOGIC ---
function generateHeatmap() {
    heatmapContainer.innerHTML = '';
    monthLabels.innerHTML = '';

    const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    
    months.forEach(m => {
        const span = document.createElement('span');
        span.innerText = m;
        monthLabels.appendChild(span);
    });

    const totalSquares = 364; 
    const today = new Date();
    const startDate = new Date(2026, 2, 1); // March 1, 2026
    
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        const currentSquareDate = new Date(startDate);
        currentSquareDate.setDate(startDate.getDate() + i);
        
        const dateKey = currentSquareDate.toDateString();
        const isDone = myProgress[dateKey];
        const isToday = currentSquareDate.toDateString() === today.toDateString();

        square.className = `w-3 h-3 rounded-sm transition-all duration-300`;
        
        if (isDone) {
            square.classList.add('bg-green-400', 'shadow-[0_0_8px_rgba(74,222,128,0.5)]');
        } else if (isToday) {
            square.classList.add('bg-zinc-800', 'border', 'border-zinc-700');
        } else {
            square.classList.add('bg-zinc-900/50');
        }

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

// Initialize everything
generateHeatmap();
renderFeed();