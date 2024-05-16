import fs from "fs";

import { dlopen, FFIType, suffix, ptr } from "bun:ffi";
import ffi from "./ffi.json";

const {
	ctring,
	fn,
	pointer,
	i8,
	i16,
	i32,
	i64,
	i64_fast,
	u8,
	u16,
	u32,
	u64,
	u64_fast,
	f32,
	f64,
	bool,
	char,
} = FFIType;
const path = "zig-out/lib/libgame_library.dylib";

const lib = dlopen(
	path,
	Object.assign({}, ffi, {
		beforeUpdate: {
			return: i32,
		},
		update: {
			return: i32,
		},
		beforeClose: {
			return: i32,
		},
	}),
);
const rl = lib.symbols;
const cstr = (s) => ptr(Buffer.from(s || "\0"));

const rgb = (r, g, b, a) =>
	((r & 0xff) | ((g & 0xff) << 8) | ((b & 0xff) << 16) | ((a & 0xff) << 24)) >>>
	0;

export const LIGHTGRAY = rgb(200, 200, 200, 255); // Light Gray
export const GRAY = rgb(130, 130, 130, 255); // Gray
export const DARKGRAY = rgb(80, 80, 80, 255); // Dark Gray
export const YELLOW = rgb(253, 249, 0, 255); // Yellow
export const GOLD = rgb(255, 203, 0, 255); // Gold
export const ORANGE = rgb(255, 161, 0, 255); // Orange
export const PINK = rgb(255, 109, 194, 255); // Pink
export const RED = rgb(230, 41, 55, 255); // Red
export const MAROON = rgb(190, 33, 55, 255); // Maroon
export const GREEN = rgb(0, 228, 48, 255); // Green
export const LIME = rgb(0, 158, 47, 255); // Lime
export const DARKGREEN = rgb(0, 117, 44, 255); // Dark Green
export const SKYBLUE = rgb(102, 191, 255, 255); // Sky Blue
export const BLUE = rgb(0, 121, 241, 255); // Blue
export const DARKBLUE = rgb(0, 82, 172, 255); // Dark Blue
export const PURPLE = rgb(200, 122, 255, 255); // Purple
export const VIOLET = rgb(135, 60, 190, 255); // Violet
export const DARKPURPLE = rgb(112, 31, 126, 255); // Dark Purple
export const BEIGE = rgb(211, 176, 131, 255); // Beige
export const BROWN = rgb(127, 106, 79, 255); // Brown
export const DARKBROWN = rgb(76, 63, 47, 255); // Dark Brown
export const WHITE = rgb(255, 255, 255, 255); // White
export const BLACK = rgb(0, 0, 0, 255); // Black
export const BLANK = rgb(0, 0, 0, 0); // Blank (Transparent)
export const MAGENTA = rgb(255, 0, 255, 255); // Magenta
export const RAYWHITE = rgb(245, 245, 245, 255); // My own White (raylib logo)

//console.log(rl +Object.keys(rl).length);

// 读取图像并获取尺寸
const imagePath = "assets/raylib_logo.png";
const imageData = fs.readFileSync(imagePath);
// const info = await sharp(imageData).metadata();
// const { data, info: { width, height } } = await sharp(imageData)
// .raw()
// .toBuffer({ resolveWithObject: true });

// // 创建raylib的Image对象
// let image = {
// data,
// width,
// height,
// mipmaps: 1,
// format: 7  // RAYLIB支持的格式，7 通常对应 RGBA 32bit
// };

const screenWidth = 800;
const screenHeight = 450;

rl.InitWindow(
	screenWidth,
	screenHeight,
	cstr("raylib [js] example - project folder"),
);

//const imagePtr = rl.LoadImageFromMemory(cstr('png'),imageData.buffer, imageData.length);
//console.log(imagePtr);
//const logo = rl.LoadTextureFromImage(imagePtr);
//rl.UploadImage(logo);
//const logo = rl.LoadImage(cstr("assets/raylib_logo.png"));

let app = () => {
	// const logo = rl.LoadTexture(cstr("assets/raylib_logo.png"));
    rl.beforeUpdate();
	console.log(`beforeUpdated`);
	rl.SetTargetFPS(60);
	while (!rl.WindowShouldClose()) {
		//const offset = Math.sin(getTime())*50
		rl.BeginDrawing();
		rl.ClearBackground(RAYWHITE);
		rl.update();
		//rl.DrawTexture(logo, (screenWidth/2) - (logo.width/2), (screenHeight/2) - (logo.height/2) + offset, WHITE)
		rl.DrawText(
			cstr("This is an example for loading a folder!"),
			190,
			200,
			20,
			LIGHTGRAY,
		);
		rl.DrawFPS(10, 10);
		rl.EndDrawing();
	}
	// rl.UnloadTexture(logo);
	rl.beforeClose();
	rl.CloseWindow();
};

setTimeout(() => {
	app();
	console.log(".....1 second has passed.");
}, 1000);
