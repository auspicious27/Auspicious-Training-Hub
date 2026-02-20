// 43 Days DSA Practice Challenge Data
const practiceData = [
    { day: 1, problems: [
        { title: "Sum of Digits - GFG", url: "https://www.geeksforgeeks.org/problems/sum-of-digits1742/1" },
        { title: "Add Digits - LeetCode", url: "https://leetcode.com/problems/add-digits/" },
        { title: "Problem 1807A - Codeforces", url: "https://codeforces.com/problemset/problem/1807/A" },
        { title: "Ugly Number - LeetCode", url: "https://leetcode.com/problems/ugly-number/" },
        { title: "Problem 1352A - Codeforces", url: "https://codeforces.com/contest/1352/problem/A" },
        { title: "Number of Common Factors", url: "https://leetcode.com/problems/number-of-common-factors/" }
    ]},
    { day: 2, problems: [
        { title: "FizzBuzz - HackerRank", url: "https://www.hackerrank.com/challenges/fizzbuzz/problem" },
        { title: "GCD of Two Numbers", url: "https://www.geeksforgeeks.org/problems/gcd-of-two-numbers3459/1" },
        { title: "Power of Two", url: "https://leetcode.com/problems/power-of-two/" },
        { title: "Prime Number - GFG", url: "https://www.geeksforgeeks.org/problems/prime-number2314/1" }
    ]},
    { day: 3, problems: [
        { title: "Water Consumption", url: "https://www.codechef.com/problems/WATERCONS" },
        { title: "Armstrong Numbers", url: "https://www.geeksforgeeks.org/problems/armstrong-numbers2727/1" },
        { title: "Sum Multiples", url: "https://leetcode.com/problems/sum-multiples/description/" }
    ]},
    { day: 4, problems: [
        { title: "Monk's Problem", url: "https://www.hackerearth.com/practice/math/number-theory/primality-tests/practice-problems/algorithm/monks-problem-ffeebf8a/" }
    ]},
    { day: 5, problems: [
        { title: "Pattern Problems", url: "https://read.learnyard.com/square-star-and-rhombus-start-patterns/" }
    ]},
    { day: 6, problems: [
        { title: "Sum of Array", url: "https://www.geeksforgeeks.org/problems/sum-of-array2326/1" },
        { title: "Check if Array is Sorted", url: "https://www.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1" }
    ]},
    { day: 7, problems: [
        { title: "Smallest and Second Smallest", url: "https://www.geeksforgeeks.org/problems/find-the-smallest-and-second-smallest-element-in-an-array3226/1" },
        { title: "Leaders in Array", url: "https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1" }
    ]},
    { day: 8, problems: [
        { title: "Count Elements with Max Frequency", url: "https://leetcode.com/problems/count-elements-with-maximum-frequency/description/" }
    ]},
    { day: 9, problems: [
        { title: "Make it Non-Decreasing", url: "https://www.hackerearth.com/practice/data-structures/arrays/1-d/practice-problems/algorithm/make-it-non-decreasing-7d3391fd/" }
    ]},
    { day: 10, problems: [
        { title: "Replace Elements", url: "https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/" },
        { title: "Unique Occurrences", url: "https://leetcode.com/problems/unique-number-of-occurrences/description/" }
    ]}
];

// Add days 11-43
for (let i = 11; i <= 43; i++) {
    practiceData.push({
        day: i,
        problems: [
            { title: `Day ${i} - Practice Problems`, url: "#" },
            { title: `More Problems Coming Soon`, url: "#" }
        ]
    });
}

function loadProgress() {
    const saved = localStorage.getItem('dsa-progress');
    return saved ? JSON.parse(saved) : {};
}

function saveProgress(progress) {
    localStorage.setItem('dsa-progress', JSON.stringify(progress));
}

function updateStats() {
    const progress = loadProgress();
    const completedDays = Object.keys(progress).filter(day => progress[day].completed).length;
    const totalPoints = completedDays * 100;
    
    document.getElementById('completed-days').textContent = completedDays;
    document.getElementById('total-points').textContent = totalPoints;
    document.getElementById('solved-problems').textContent = completedDays * 5;
    document.getElementById('streak').textContent = completedDays;
}

function renderDays() {
    const container = document.getElementById('days-container');
    const progress = loadProgress();
    
    container.innerHTML = practiceData.map(dayData => {
        const dayProgress = progress[`day${dayData.day}`] || { completed: false };
        const isCompleted = dayProgress.completed;
        
        return `
            <div class="day-card ${isCompleted ? 'completed' : ''}" data-day="${dayData.day}">
                <div class="day-header">
                    <span class="day-number">Day ${dayData.day}</span>
                    <span class="day-status">${isCompleted ? '✅' : '⭕'}</span>
                </div>
                <ul class="problems-list">
                    ${dayData.problems.map(problem => `
                        <li>
                            <a href="${problem.url}" target="_blank" class="problem-link">
                                <i class="fas fa-link"></i>
                                ${problem.title}
                            </a>
                        </li>
                    `).join('')}
                </ul>
                <button class="mark-complete-btn ${isCompleted ? 'completed' : ''}" onclick="toggleDayComplete(${dayData.day})">
                    ${isCompleted ? '✓ Completed' : 'Mark as Complete'}
                </button>
            </div>
        `;
    }).join('');
}

function toggleDayComplete(day) {
    const progress = loadProgress();
    const dayKey = `day${day}`;
    
    if (!progress[dayKey]) {
        progress[dayKey] = { completed: false };
    }
    
    progress[dayKey].completed = !progress[dayKey].completed;
    saveProgress(progress);
    renderDays();
    updateStats();
}

document.addEventListener('DOMContentLoaded', () => {
    renderDays();
    updateStats();
});
