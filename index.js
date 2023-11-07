const fs = require('fs');
const readline = require('readline');
const part1 = require('./src/part1')
const part2 = require('./src/part2')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// Check if two command-line arguments (JSON file names) were provided
if (process.argv.length < 4) {
    console.log('Usage: node readFiles.js file1.json file2.json');
    process.exit(1); // Exit with an error code
}

// Get the file names from the command-line arguments
const ordersFile = process.argv[2];
const feesFile = process.argv[3];


// Function to read a JSON file
function readJSONFile(fileName) {
    try {
        const content = fs.readFileSync(fileName, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Error reading ${fileName}: ${error.message}`);
        process.exit(1); // Exit with an error code
    }
}

// Read the JSON files
const orders = readJSONFile(ordersFile);
const fees = readJSONFile(feesFile);

function selectChallenge() {
  rl.question('Select Challenge part (part1/part2): ', (respuesta) => {
    if (respuesta.trim().toLowerCase() === 'part1') {
      rl.close();
      part1(orders, fees)
    } else if (respuesta.trim().toLowerCase() === 'part2') {
      part2(orders, fees)
      rl.close();
    } else {
      console.log('Invalid option. Please choose either part1 or part2.');
      selectChalenge();
    }
  });
}

selectChallenge();