#!/usr/bin/env node

// node greeting.js --target CodeGrid --decorate

// option部を取り出す
const args = process.argv.slice(2);

// package.jsonからバージョンを読み込み
const version = require('./package.json').version;

// ヘルプ用のテキスト
const help = `
Usage: greeting [options]

Options:
  -t, --target <name> Specify greeting target
  -d, --decorate      Decorate greeting
  -v, --version       Output version number
  -h, --help          Output help
`;

if (args[0] === '-v' || args[0] === '--version') {
  console.log(version);
  process.exit(0);
}

if (args[0] === '-h' || args[0] === '--help') {
  console.log(help);
  process.exit(0);
}

const defaultOptions = {
  target: null,
  decorate: false,
};

const argOptions = args.reduce((acc, arg, i, array) => {
  switch (arg) {
    case '--target':
    case '-t':
      acc['target'] = array[i + 1];
      break;
    case '--decorate':
    case '-d':
      acc['decorate'] = true;
      break;
    default:
      break;
  }
  return acc;
}, {});

// デフォルトオプションを上書き
const options = Object.assign({}, defaultOptions, argOptions);

if (!options.target) {
  console.error('--target, -t is not specified!');
  process.exit(1); // 異常終了
}

const greeting = options.decorate
  ? `*****>>> Hello, ${options.target}! <<<*****`
  : `Hello, ${options.target}!`;

console.log(greeting);
