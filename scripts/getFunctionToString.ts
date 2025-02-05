import fs from 'fs';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import * as t from '@babel/types';

export const traverse = process.env['TEST']
  ? _traverse
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((_traverse as any).default as typeof _traverse);

/**
 * Extracts a function by name from a file and returns it as a string.
 * @param filePath - Path to the TypeScript/TSX file
 * @param functionName - The name of the function to extract
 * @returns The function code as a string, or null if not found
 */
export function getFunctionToString(
  filePath: string,
  functionName: string
): string | null {
  // Read file contents
  const code = fs.readFileSync(filePath, 'utf-8');

  // Parse the file using Babel
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  let functionCode: string | null = null;

  // Traverse the AST to find the function by name
  traverse(ast, {
    FunctionDeclaration(path) {
      if (path.node.id?.name === functionName) {
        functionCode = code.slice(path.node.start ?? 0, path.node.end ?? 0);
      }
    },
    VariableDeclaration(path) {
      // Handle function expressions & arrow functions
      path.node.declarations.forEach(declaration => {
        if (
          t.isVariableDeclarator(declaration) &&
          t.isIdentifier(declaration.id) &&
          declaration.id.name === functionName &&
          (t.isArrowFunctionExpression(declaration.init) ||
            t.isFunctionExpression(declaration.init))
        ) {
          functionCode = code.slice(path.node.start ?? 0, path.node.end ?? 0);
        }
      });
    },
  });

  // Ensure functionCode is a string before using replace()
  if (functionCode) {
    return (functionCode as string).replace(/`/g, '\\`');
  }

  return null;
}
