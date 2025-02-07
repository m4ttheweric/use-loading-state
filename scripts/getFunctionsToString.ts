import fs from 'fs';
import * as path from 'path';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import * as t from '@babel/types';
import fg from 'fast-glob';

export const traverse = process.env['TEST']
  ? _traverse
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((_traverse as any).default as typeof _traverse);

/**
 * Extracts functions from files matching a glob pattern that are marked with a `// @extract` comment above them.
 * @param pattern - Glob pattern to match TypeScript/TSX files
 * @returns A map of extracted function names and their corresponding code strings
 */
export function getFunctionsToString(
  pattern: string
): Record<string, Record<string, string>> {
  const functionsToExtract: Record<string, Record<string, string>> = {};

  // Find matching files using fast-glob
  const filePaths = fg.sync(pattern, { absolute: true });

  for (const filePath of filePaths) {
    const code = fs.readFileSync(filePath, 'utf-8');

    // Parse the file using Babel
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    let lastComment: string | null = null;
    let fileName = path.parse(filePath).base.replace('-', ''); // Get the file name

    fileName = fileName.substring(0, fileName.lastIndexOf('.')); // Remove the extension

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
            const key = `${functionName}`; // Use file name for uniqueness
            if (!functionsToExtract[fileName]) {
              functionsToExtract[fileName] = {};
            }
            functionsToExtract[fileName][key] = functionCode.replace(
              /`/g,
              '\\`'
            );
          }

          lastComment = null; // Reset comment tracking
        }
      },
    });
  }

  return functionsToExtract;
}
