let pyodide;

async function loadPyodide() {
    if (!pyodide) {
        document.getElementById('output').textContent = 'Loading Python environment...';
        pyodide = await loadPyodide();
        document.getElementById('output').textContent = 'Python ready! Write your code and click Run.';
    }
}

async function runCode() {
    const code = document.getElementById('code-editor').value;
    const output = document.getElementById('output');
    
    try {
        if (!pyodide) {
            await loadPyodide();
        }
        
        output.textContent = 'Running...';
        
        // Capture stdout
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);
        
        // Run user code
        pyodide.runPython(code);
        
        // Get output
        const result = pyodide.runPython('sys.stdout.getvalue()');
        output.textContent = result || 'Code executed successfully (no output)';
        
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.style.color = '#ff4444';
        setTimeout(() => {
            output.style.color = '#00ff00';
        }, 3000);
    }
}

function clearOutput() {
    document.getElementById('output').textContent = 'Output cleared. Run your code to see results.';
}

const examples = {
    hello: `# Hello World Example
print("Hello, World!")
print("Welcome to Python Playground!")`,
    
    loop: `# For Loop Example
for i in range(1, 6):
    print(f"Number: {i}")`,
    
    function: `# Function Example
def greet(name):
    return f"Hello, {name}!"

print(greet("Python"))
print(greet("World"))`,
    
    list: `# List Operations
numbers = [1, 2, 3, 4, 5]
print("Original list:", numbers)
print("Sum:", sum(numbers))
print("Max:", max(numbers))
print("Reversed:", numbers[::-1])`,
    
    fibonacci: `# Fibonacci Series
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=' ')
        a, b = b, a + b
    print()

print("First 10 Fibonacci numbers:")
fibonacci(10)`
};

function loadExample(type) {
    document.getElementById('code-editor').value = examples[type];
}

// Load Pyodide on page load
window.addEventListener('DOMContentLoaded', loadPyodide);
