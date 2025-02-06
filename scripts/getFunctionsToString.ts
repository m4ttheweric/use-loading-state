import fs from 'fs';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import * as t from '@babel/types';

export const traverse = process.env['TEST']
  ? _traverse
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((_traverse as any).default as typeof _traverse);

/**
 * Extracts functions from a file that are marked with a `// @extract` comment above them.
 * @param filePath - Path to the TypeScript/TSX file
 * @returns A map of extracted function names and their corresponding code strings
 */
export function getFunctionsToString(filePath: string): Record<string, string> {
  // Read file contents
  const code = fs.readFileSync(filePath, 'utf-8');

  // Parse the file using Babel
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  const functionsToExtract: Record<string, string> = {};
  let lastComment: string | null = null;

  // Traverse AST to find functions marked with `// @extract`
  traverse(ast, {
    enter(path) {
      if (path.node.leadingComments) {
        const comment = path.node.leadingComments
          .map(c => c.value.trim())
          .find(c => c === '@extract');

        if (comment) {
          lastComment = '@extract';
        }
      }

      if (
        lastComment === '@extract' &&
        (t.isFunctionDeclaration(path.node) ||
          t.isVariableDeclaration(path.node))
      ) {
        let functionName: string | null = null;
        let functionCode: string | null = null;

        if (t.isFunctionDeclaration(path.node) && path.node.id) {
          functionName = path.node.id.name;
          functionCode = code.slice(path.node.start!, path.node.end!);
        } else if (t.isVariableDeclaration(path.node)) {
          const decl = path.node.declarations[0];

          if (t.isVariableDeclarator(decl) && t.isIdentifier(decl.id)) {
            functionName = decl.id.name;
            functionCode = code.slice(path.node.start!, path.node.end!);
          }
        }

        if (functionName && functionCode) {
          functionsToExtract[functionName] = functionCode.replace(/`/g, '\\`');
        }

        lastComment = null; // Reset comment tracking
      }
    },
  });

  return functionsToExtract;
}
