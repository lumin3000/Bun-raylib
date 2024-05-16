# Bun-raylib
raylib javascript binding in bun ffi and raylib-zig.

This project utilises Bun FFI in conjunction with raylib-zig to employ the raylib library, facilitating the development of raylib applications using JavaScript and TypeScript. Operations such as loadImage may cause Bun to crash; however, this issue can be circumvented by performing loadImage within the Zig(0.12)environment. Compilation has only been confirmed on macOS thus far, yet given Bun's recent support for Windows, it should presumably operate without issue on that platform as well, pending confirmation.

How to start:
```
git submodule update --init --recursive
cp ./buildHelper/build.zig ./raylib-zig
zig build
bun ./index.js
```
Date: 17th May 2024.

