const readline = require('readline');
require('colors');
const fs = require('fs');
const figlet = require('figlet');

// Function to load presentation content from the JSON file
function loadPresentationContent(filename) {
  try {
    filename = filename.toLowerCase().replace(/.json$/g,"")+".json";
    const data = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error loading presentation content from file '${filename}': ${err.message}`.red);
    process.exit(1);
  }
}

// Get the filename from command-line argument or use the default 'presentation.json'
const filename = process.argv[2] || 'presentationware.json';
const testData = loadPresentationContent(filename);

let lastViewedId = null;


function findItem(id) {
  const mainId = id.match(/^\d+/)[0];
  const subIdMatch = id.match(/[a-zA-Z]+$/);
  const subId = subIdMatch ? subIdMatch[0] : '';
  const mainItem = testData.find((item) => item.id === mainId);
  if (mainItem && mainItem.subBullets && subId) {
    return mainItem.subBullets.find((subBullet) => subBullet.id === `${mainId}${subId}`);
  }
  return mainItem;
}

function displayContent(id) {
  const item = findItem(id);
  if (item) {
    console.log(`\n${figlet.textSync(item.title, { font: 'Standard' }).bold}`);
    console.log(item.content.yellow+"\n");
    // Display sub-bullets with a leading dash if they exist
    if (item.subBullets) {
      item.subBullets.forEach((subBullet) => {
        console.log(`  ${subBullet.id.cyan}: ${subBullet.title}+\n`);
      });
    }

    lastViewedId = id;
  } else {
    console.log('\nInvalid input. Please enter a valid number to get information (e.g., 1) or a number followed by a letter (e.g., 1a).'.red);
  }
}

function displayOptions() {
  console.log(`\n${figlet.textSync('AI Testing Presentation', { font: 'Standard' }).blue}`);
  console.log('Available Options:'.green);
  testData.forEach((data) => {
    const formattedId = (data.id === lastViewedId) ? `${data.id.underline.bold.cyan}` : `${data.id.cyan}`;
    console.log(`\n${formattedId}: ${data.title}`);
    // Display sub-bullets if they exist
    if (data.subBullets) {
      data.subBullets.forEach((subBullet) => {
        const _sub = subBullet.id.toString().replace(/[0-9]/g,'');
        console.log(`- ${(subBullet.id === lastViewedId) ? _sub.underline.bold.cyan : _sub.cyan}: ${subBullet.title}`);
      });
    }
  });
}

function startPrompt() {
  displayOptions();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.setPrompt(`${'Enter a number (e.g., 1) or a number followed by a letter (e.g., 1a):'.magenta}`);
  rl.prompt();

  rl.on('line', (input) => {
    const sanitizedInput = input.trim().toLowerCase();

    if (sanitizedInput === '') {
      displayOptions();
    } else {
      displayContent(sanitizedInput);
    }

    rl.prompt();
  });

  rl.on('close', () => {
    console.log('\nThank you for exploring AI testing with us! Have a great day!'.yellow);
    process.exit(0);
  });
}

// Start the console prompt
startPrompt();
