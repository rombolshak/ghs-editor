const fs = require('fs');
const path = require('path');
const input_dir = path.resolve(__dirname, '../../gloomhavensecretariat/data');
const output_dir = path.resolve(__dirname, '../assets/json');

function getSubfolders(dataPath) {
  return fs
    .readdirSync(dataPath, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => path.join(dataPath, item.name));
}

function getSubfolderFiles(dataPath) {
  if (!fs.existsSync(dataPath)) return [];
  return fs
    .readdirSync(dataPath, { withFileTypes: true })
    .filter(item => item.isFile())
    .map(item => path.join(dataPath, item.name));
}

function loadFile(dataPath) {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

const editions = getSubfolders(input_dir);

const monsters = [];
for (let edition of editions) {
  const monstersFiles = getSubfolderFiles(path.join(edition, 'monster'));
  for (let monsterFile of monstersFiles) {
    const monster = loadFile(monsterFile);
    if (monster['hidden']) continue;
    monsters.push({
      name: monster['name'],
      edition: monster['edition'],
      deck: monster['deck'],
      count: monster['count'],
    });
  }
}

fs.writeFileSync(path.join(output_dir, 'monsters.generated.json'), JSON.stringify(monsters), 'utf8');
