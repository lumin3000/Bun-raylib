import { readFileSync, writeFileSync } from 'fs';

// 读取 Zig 文件内容
function readZigFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const functionNames = new Set();
  
  lines.forEach(line => {
    const match = line.match(/fn (\w+)/);
    if (match) {
      functionNames.add(match[1]);
    }
  });

  return functionNames;
}

// 读取 JSON 文件内容
function readJsonFile(filePath) {
  const jsonContent = readFileSync(filePath, 'utf8');
  return JSON.parse(jsonContent);
}

// 比较函数名称并生成新的 JSON 文件
function compareAndGenerateNoneffi(zigFunctions, ffiJson, outputFilePath) {
  const noneffi = {};

  Object.keys(ffiJson).forEach(funcName => {
    if (!zigFunctions.has(funcName)) {
      noneffi[funcName] = ffiJson[funcName];
    }
  });

  writeFileSync(outputFilePath, JSON.stringify(noneffi, null, 2));
}

// 主函数
function main() {
  const zigFilePath = './raylib-zig/lib/raylib-ext.zig';
  const ffiJsonFilePath = './ffi.json';
  const noneffiJsonFilePath = './noneffi.json';

  const zigFunctions = readZigFile(zigFilePath);
  console.log(zigFunctions.size);
  const ffiJson = readJsonFile(ffiJsonFilePath);
  console.log(Object.keys(ffiJson).length);
  compareAndGenerateNoneffi(zigFunctions, ffiJson, noneffiJsonFilePath);

  console.log('noneffi.json has been generated successfully.');
}

main();
