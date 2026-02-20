// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.topic-list a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Code copy functionality
document.querySelectorAll('pre code').forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.addEventListener('click', () => {
        navigator.clipboard.writeText(block.textContent);
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    });
    block.parentElement.style.position = 'relative';
    block.parentElement.appendChild(button);
});

// Quiz functionality
document.querySelectorAll('.question input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const question = this.closest('.question');
        const details = question.querySelector('details');
        if (details && !details.open) {
            setTimeout(() => {
                details.open = true;
            }, 500);
        }
    });
});

// Progress tracking
function updateProgress() {
    const completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]');
    document.querySelectorAll('.day-button').forEach(button => {
        const day = button.textContent.trim();
        if (completedDays.includes(day)) {
            button.classList.add('completed');
        }
    });
}

function markDayComplete(day) {
    const completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]');
    if (!completedDays.includes(day)) {
        completedDays.push(day);
        localStorage.setItem('completedDays', JSON.stringify(completedDays));
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    
    // Add copy button styling
    const style = document.createElement('style');
    style.textContent = `
        .copy-button {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px 10px;
            background: var(--gradient-start);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.8rem;
            opacity: 0.8;
            transition: opacity 0.3s;
        }
        .copy-button:hover {
            opacity: 1;
        }
        .day-button.completed {
            background: linear-gradient(to right, #4caf50, #45a049);
        }
        .topic-list a.active {
            background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
            color: white;
            padding-left: 1.2rem;
        }
    `;
    document.head.appendChild(style);
});
