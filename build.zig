const std = @import("std");
const rl = @import("raylib-zig/build.zig");

pub fn build(b: *std.Build) !void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    // 创建依赖
    const raylib_dep = b.dependency("raylib-zig", .{
        .target = target,
        .optimize = optimize,
    });

    // 从依赖中获取模块
    const raylib = raylib_dep.module("raylib");
    const raylib_math = raylib_dep.module("raylib-math");
    const rlgl = raylib_dep.module("rlgl");

    // 创建共享库而不是可执行文件
    const lib = b.addSharedLibrary(.{
        .name = "game_library",
        .root_source_file = .{ .path = "src/main.zig" },
        .optimize = optimize,
        .target = target,
    });

    // 链接 raylib-zig 到共享库
    rl.link(b, lib, target, optimize);
    lib.root_module.addImport("raylib", raylib);
    lib.root_module.addImport("raylib-math", raylib_math);
    lib.root_module.addImport("rlgl", rlgl);

    // 安装共享库
    //lib.addLinkFlag("-Wl,--export-all-symbols");
    b.installArtifact(lib);
}
