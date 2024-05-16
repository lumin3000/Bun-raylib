const std = @import("std");
const math = std.math;
const rand = std.rand;
const fmt = std.fmt;

const rl = @import("raylib");
const rlm = @import("raylib-math");

var texture: rl.Texture = undefined;

pub export fn beforeUpdate() i32 {
    const camera = rl.Camera3D{
        .position = .{ .x = 0.0, .y = 10.0, .z = 10.0 },
        .target = .{ .x = 0.0, .y = 0.0, .z = 0.0 },
        .up = .{ .x = 0.0, .y = 1.0, .z = 0.0 },
        .fovy = 45.0,
        .projection = rl.CameraProjection.camera_perspective,
    };
    rl.beginMode3D(camera);
    rl.drawLine3D(.{ .x = -4.0, .y = 0.0, .z = 0.0 }, .{ .x = 4.0, .y = 0.0, .z = 0.0 }, rl.Color.red);
    rl.endMode3D();
    rl.initAudioDevice();
    rl.closeAudioDevice();

    // 使用 bufPrintz 将 Zig 字符串格式化为 C 风格字符串

    const image = rl.loadImage("assets/raylib_logo.png");
    texture = rl.loadTextureFromImage(image);
    rl.unloadImage(image);

    return 1;
}

pub export fn update() i32 {
    const screenWidth = 800;
    const screenHeight = 450;
    rl.drawTexture(texture, screenWidth / 2 - @divTrunc(texture.width, 2), screenHeight / 2 - @divTrunc(texture.height, 2), rl.Color.white);
    return 1;
}

pub export fn beforeClose() i32 {
    rl.unloadTexture(texture);
    return 1;
}
