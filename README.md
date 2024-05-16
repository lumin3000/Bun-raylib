# Bun-raylib
raylib javascript binding in bun ffi and raylib-zig.

This project utilises Bun FFI in conjunction with raylib-zig to employ the raylib library, facilitating the development of raylib applications using JavaScript and TypeScript. Operations such as loadImage may cause Bun to crash; however, this issue can be circumvented by performing loadImage within the Zig environment. Compilation has only been confirmed on macOS thus far, yet given Bun's recent support for Windows, it should presumably operate without issue on that platform as well, pending confirmation.

Date: 17th May 2024.
