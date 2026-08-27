import type { DatapackConfig, ResourcePackConfig, SandstoneConfig } from "sandstone";
import fs from "fs";
import path from "path";

const config = {
  name: "RecipesGenerator",
  packs: {
    datapack: {
      description: ["A pack by Mizab."],
      packFormat: 71
    } as DatapackConfig,
    resourcepack: {
      description: ["A pack by Mizab."],
      packFormat: 55
    } as ResourcePackConfig
  },
  onConflict: {
    default: "warn"
  },
  namespace: "recipes_generator",
  packUid: "8iGibCt0",
  mcmeta: "latest",
  saveOptions: {},
  path: "C:/Users/mizab/AppData/Roaming/ModrinthApp/profiles/Fabric 1.21.5/saves/Testing/datapacks",
  scripts: {
    afterAll: () => {
      // 1. Define paths
      const outputDatapackDir = path.resolve("./.sandstone/output/datapack");
      const mcmetaPath = path.join(outputDatapackDir, "pack.mcmeta");
      const targetDir = path.join(config.path, config.name);

      // 2. Read and modify pack.mcmeta
      if (fs.existsSync(mcmetaPath)) {
        const rawMcmeta = fs.readFileSync(mcmetaPath, "utf-8");
        const mcmeta = JSON.parse(rawMcmeta);

        if (mcmeta.pack) {
          // Remove the min_format and max_format
          delete mcmeta.pack.min_format;
          delete mcmeta.pack.max_format;

          // Apply pack_format and description from the config
          mcmeta.pack.pack_format = config.packs.datapack.packFormat;
          mcmeta.pack.description = config.packs.datapack.description;
        }

        // Write the changes back to the file
        fs.writeFileSync(mcmetaPath, JSON.stringify(mcmeta, null, 2), "utf-8");
        console.log(`[Sandstone] Updated pack.mcmeta format to ${config.packs.datapack.packFormat}`);
      } else {
        console.warn(`[Sandstone] Could not find pack.mcmeta at ${mcmetaPath}`);
      }

      // 3. Copy the datapack to the target directory under the config name
      if (fs.existsSync(outputDatapackDir)) {
        // Ensure the base datapacks folder exists
        if (!fs.existsSync(config.path)) {
          fs.mkdirSync(config.path, { recursive: true });
        }

        // Remove the existing target folder (RecipesGenerator) if it exists so it replaces cleanly
        if (fs.existsSync(targetDir)) {
          fs.rmSync(targetDir, { recursive: true, force: true });
        }

        // Copy the contents of output/datapack into the target directory
        fs.cpSync(outputDatapackDir, targetDir, { recursive: true });
        console.log(`[Sandstone] Successfully copied datapack to: ${targetDir}`);
      } else {
        console.warn(`[Sandstone] Output datapack directory not found at ${outputDatapackDir}`);
      }
    }
  }
} as SandstoneConfig;

export default config;
