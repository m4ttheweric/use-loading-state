import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { getFunctionsToString } from './getFunctionsToString';

// Manually define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the source TSX file
const inputFilePath = path.resolve(
  __dirname,
  '../src/code-snippets/example-code.tsx'
);

// Path to the output TypeScript file
const outputFilePath = path.resolve(
  __dirname,
  '../src/code-snippets/code-strings.ts'
);

const extractedFunctions = getFunctionsToString(inputFilePath);

const outputContent = `
// Auto-generated file - do not edit manually
${Object.entries(extractedFunctions)
  .map(([name, code]) => `export const ${name}Code = \`${code}\`;\n`)
  .join('\n')}
`;

// Write to the output file
fs.writeFileSync(outputFilePath, outputContent.trim(), 'utf-8');

console.log(`Extracted functions saved to ${outputFilePath}`);
