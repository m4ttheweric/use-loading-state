import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { getFunctionsToString } from './getFunctionsToString';

const execute = (command: string) => {
  execSync(command, { stdio: 'inherit' });
};

// Manually define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the source TSX file
const inputFilePath = path.resolve(__dirname, '../src/code-snippets/**/*.tsx');

// Path to the output TypeScript file
const outputFilePath = path.resolve(
  __dirname,
  '../src/code-snippets/code-strings.ts'
);

const extractedFunctions = getFunctionsToString(inputFilePath);

const outputContent = `
// Auto-generated file - do not edit manually
${Object.entries(extractedFunctions)
  .map(
    ([name, functions]) =>
      `export const ${name}Code = {${Object.entries(functions).map(([name, code]) => `${name}: \`${code}\``)}};\n`
  )
  .join('\n')}
`;

// Write to the output file
fs.writeFileSync(outputFilePath, outputContent.trim(), 'utf-8');

// run the prettier script on the file
execute('bun run prettier --write src/code-snippets/code-strings.ts');

console.log(`Extracted functions saved to ${outputFilePath}`);
