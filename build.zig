const std = @import("std");
const rl = @import("buildHelper/build.zig");

pub fn build(b: *std.Build) !void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const raylib_dep = b.dependency("raylib-zig", .{
        .target = target,
        .optimize = optimize,
    });

    const raylib = raylib_dep.module("raylib");
    const raylib_math = raylib_dep.module("raylib-math");
    const rlgl = raylib_dep.module("rlgl");

    const lib = b.addSharedLibrary(.{
        .name = "game_library",
        .root_source_file = .{ .path = "src/main.zig" },
        .optimize = optimize,
        .target = target,
    });

    rl.link(b, lib, target, optimize);
    lib.root_module.addImport("raylib", raylib);
    lib.root_module.addImport("raylib-math", raylib_math);
    lib.root_module.addImport("rlgl", rlgl);

    b.installArtifact(lib);
}
