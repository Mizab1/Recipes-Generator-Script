import { Recipe } from "sandstone";
import config from "../sandstone.config";

interface OreUpgrade {
  item: unknown;
  time: number;
}

const BASE_TIME: number = 30;
const MAX_TIME: number = 150;

const ORES: readonly OreUpgrade[] = [
  { item: "minecraft:iron_ingot", time: 5 },
  { item: "minecraft:gold_ingot", time: 10 },
  { item: "minecraft:diamond", time: 15 }
];

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0 && seconds > 0) {
    return `${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  }
  return `${seconds}s`;
}

// Helper function to calculate combinations with replacement
function getCombinations(arr: readonly String[], length: number): Array<Array<String>> {
  if (length === 1) return arr.map((item) => [item]);
  const combinations: Array<Array<String>> = [];

  arr.forEach((item, index) => {
    const smallerCombinations: Array<Array<String>> = getCombinations(arr.slice(index), length - 1);
    smallerCombinations.forEach((combo) => {
      combinations.push([item, ...combo]);
    });
  });

  return combinations;
}

let recipeCount: number = 0;

for (let slotCount = 1; slotCount <= 8; slotCount++) {
  const combos = getCombinations(ORES, slotCount);

  for (const combo of combos) {
    recipeCount++;

    const baseIngredients: Array<String> = ["minecraft:carrot_on_a_stick"];
    let addedTime: number = 0;

    combo.forEach((ore: any) => {
      baseIngredients.push(ore.item);
      addedTime += ore.time;
    });

    const totalTime: number = Math.min(BASE_TIME + addedTime, MAX_TIME);
    const formattedLoreTime = formatTime(totalTime);

    Recipe(`pause_clock_upgrade_${recipeCount}`, {
      type: "minecraft:crafting_shapeless",
      ingredients: baseIngredients,
      result: {
        id: "minecraft:carrot_on_a_stick",
        count: 1,
        components: {
          //@ts-ignore
          item_name: {
            text: "Pause Clock",
            color: "gold",
            italic: false
          },
          lore: [`Timer: ${formattedLoreTime}`],
          custom_data: {
            freeze_time: totalTime,
            is_pause_clock: 1
          },
          custom_model_data: {
            strings: ["pause_clock"]
          }
        }
      }
    });
  }
}

Recipe("minecraft:clock", {
  type: "minecraft:crafting_shaped",
  category: "equipment",
  key: {
    "#": "minecraft:gold_ingot",
    X: "minecraft:redstone"
  },
  pattern: [" # ", "#X#", " # "],
  result: {
    id: "minecraft:carrot_on_a_stick",
    count: 1,
    components: {
      //@ts-ignore
      item_name: {
        text: "Pause Clock",
        color: "gold",
        italic: false
      },
      lore: [`Timer: 30s`],
      custom_data: {
        freeze_time: 30,
        is_pause_clock: 1
      },
      custom_model_data: {
        strings: ["pause_clock"]
      }
    }
  }
});

Recipe(`${config.namespace}:play_clock`, {
  type: "minecraft:crafting_shaped",
  category: "equipment",
  key: {
    "#": "minecraft:diamond",
    X: "minecraft:redstone"
  },
  pattern: ["###", "#X#", "###"],
  result: {
    id: "minecraft:carrot_on_a_stick",
    count: 1,
    components: {
      //@ts-ignore
      item_name: {
        text: "Play Clock",
        color: "gold",
        italic: false
      },
      custom_data: {
        is_play_clock: 1
      },
      custom_model_data: {
        strings: ["play_clock"]
      }
    }
  }
});
