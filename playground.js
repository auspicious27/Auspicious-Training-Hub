function outf(text) {
    const output = document.getElementById('output');
    output.textContent += text;
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

async function runCode() {
    const code = document.getElementById('code-editor').value;
    const output = document.getElementById('output');
    
    output.textContent = '';
    output.style.color = '#00ff00';
    
    Sk.pre = "output";
    Sk.configure({
        output: outf,
        read: builtinRead
    });
    
    try {
        await Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, code, true);
        });
        
        if (output.textContent === '') {
            output.textContent = '✓ Code executed successfully (no output)';
        }
    } catch (error) {
        output.textContent = `❌ Error:\n${error.toString()}`;
        output.style.color = '#ff4444';
    }
}

function clearOutput() {
    document.getElementById('output').textContent = 'Output cleared. Run your code to see results.';
    document.getElementById('output').style.color = '#00ff00';
}

const examples = {
    hello: `# Hello World Example
print("Hello, World!")
print("Welcome to Python Playground!")`,
    
    loop: `# For Loop Example
for i in range(1, 6):
    print("Number:", i)`,
    
    function: `# Function Example
def greet(name):
    return "Hello, " + name + "!"

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
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print("First 10 Fibonacci numbers:")
print(fibonacci(10))`
};

function loadExample(type) {
    document.getElementById('code-editor').value = examples[type];
}

// Ready message
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('output').textContent = '✓ Python ready! Write your code and click Run.';
});
