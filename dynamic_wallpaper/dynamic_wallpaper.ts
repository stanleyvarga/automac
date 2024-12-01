#!/usr/bin/env ts-node

import { $, fs, os, path } from "zx";
import type { TimePeriod } from "./randomize_images";

type Months = "january" | "february" | "march" | "april" | "may" | "june" | "july" | "august" | "september" | "october" | "november" | "december";
type TimeOfDay = {
  hours: number;
  minutes: number;
};
type DaySchedule = {
  dawn: TimeOfDay;
  sunrise: TimeOfDay;
  morning: TimeOfDay;
  noon: TimeOfDay;
  sunset: TimeOfDay;
  dusk: TimeOfDay;
  night: TimeOfDay;
};
interface Settings {
  state: { current: string };
  files: {
    [K in TimePeriod]: {
      images: string[];
      hours: number;
      minutes: number;
    };
  };
}

let settings: Settings = {
  state: { current: "" },
  files: {
    dawn: { hours: 0, minutes: 0, images: [] },
    sunrise: { hours: 0, minutes: 0, images: [] },
    morning: { hours: 0, minutes: 0, images: [] },
    noon: { hours: 0, minutes: 0, images: [] },
    sunset: { hours: 0, minutes: 0, images: [] },
    dusk: { hours: 0, minutes: 0, images: [] },
    night: { hours: 0, minutes: 0, images: [] },
  },
};

const MONTHS: Record<Months, DaySchedule> = {
  january: {
    dawn: { hours: 7, minutes: 0 },
    sunrise: { hours: 8, minutes: 0 },
    morning: { hours: 9, minutes: 0 },
    noon: { hours: 12, minutes: 0 },
    sunset: { hours: 16, minutes: 0 },
    dusk: { hours: 17, minutes: 0 },
    night: { hours: 18, minutes: 0 },
  },
  february: {
    dawn: { hours: 7, minutes: 0 },
    sunrise: { hours: 7, minutes: 30 },
    morning: { hours: 9, minutes: 0 },
    noon: { hours: 12, minutes: 0 },
    sunset: { hours: 17, minutes: 0 },
    dusk: { hours: 18, minutes: 0 },
    night: { hours: 19, minutes: 0 },
  },
  march: {
    dawn: { hours: 6, minutes: 30 },
    sunrise: { hours: 7, minutes: 0 },
    morning: { hours: 9, minutes: 0 },
    noon: { hours: 12, minutes: 0 },
    sunset: { hours: 18, minutes: 0 },
    dusk: { hours: 19, minutes: 0 },
    night: { hours: 20, minutes: 0 },
  },
  april: {
    dawn: { hours: 6, minutes: 0 },
    sunrise: { hours: 6, minutes: 30 },
    morning: { hours: 9, minutes: 0 },
    noon: { hours: 12, minutes: 0 },
    sunset: { hours: 19, minutes: 0 },
    dusk: { hours: 20, minutes: 0 },
    night: { hours: 21, minutes: 0 },
  },
  may: {
    dawn: { hours: 5, minutes: 30 },
    sunrise: { hours: 6, minutes: 0 },
    morning: { hours: 9, minutes: 0 },
    noon: { hours: 12, minutes: 0 },
    sunset: { hours: 20, minutes: 0 },
    dusk: { hours: 21, minutes: 0 },
    night: { hours: 22, minutes: 0 },
  },
  june: {
    dawn: { hours: 5, minutes: 0 },
    sunrise: { hours: 5, minutes: 30 },
    morning: { hours: 9, minutes: 0 },
    noon: { hours: 12, minutes: 0 },
    sunset: { hours: 21, minutes: 0 },
    dusk: { hours: 22, minutes: 0 },
    night: { hours: 23, minutes: 0 },
  },
  july: {
    dawn: { hours: 5, minutes: 30 },
    sunrise: { hours: 6, minutes: 0 },
    morning: { hours: 9, minutes: 0 },
    noon: { hours: 12, minutes: 0 },
    sunset: { hours: 21, minutes: 0 },
    dusk: { hours: 22, minutes: 0 },
    night: { hours: 23, minutes: 0 },
  },
  august: {
    dawn: { hours: 6, minutes: 0 },
    sunrise: { hours: 6, minutes: 30 },
    morning: { hours: 9, minutes: 0 },
    noon: { hours: 12, minutes: 0 },
    sunset: { hours: 20, minutes: 0 },
    dusk: { hours: 21, minutes: 0 },
    night: { hours: 22, minutes: 0 },
  },
  september: {
    dawn: { hours: 6, minutes: 30 },
    sunrise: { hours: 7, minutes: 0 },
    morning: { hours: 9, minutes: 0 },
    noon: { hours: 12, minutes: 0 },
    sunset: { hours: 19, minutes: 0 },
    dusk: { hours: 20, minutes: 0 },
    night: { hours: 21, minutes: 0 },
  },
  october: {
    dawn: { hours: 7, minutes: 0 },
    sunrise: { hours: 7, minutes: 30 },
    morning: { hours: 9, minutes: 0 },
    noon: { hours: 12, minutes: 0 },
    sunset: { hours: 18, minutes: 0 },
    dusk: { hours: 19, minutes: 0 },
    night: { hours: 20, minutes: 0 },
  },
  november: {
    dawn: { hours: 7, minutes: 0 },
    sunrise: { hours: 7, minutes: 30 },
    morning: { hours: 9, minutes: 0 },
    noon: { hours: 12, minutes: 0 },
    sunset: { hours: 17, minutes: 0 },
    dusk: { hours: 18, minutes: 0 },
    night: { hours: 19, minutes: 0 },
  },
  december: {
    dawn: { hours: 7, minutes: 0 },
    sunrise: { hours: 8, minutes: 0 },
    morning: { hours: 9, minutes: 30 },
    noon: { hours: 12, minutes: 0 },
    sunset: { hours: 16, minutes: 0 },
    dusk: { hours: 17, minutes: 0 },
    night: { hours: 18, minutes: 0 },
  },
};

const currentMonth: Months = new Date().toLocaleString("default", { month: "long" }).toLowerCase() as Months;
// const now = new Date();
const currentMinutes: number = 9 * 60 + 29;
// const currentMinutes: number = now.getHours() * 60 + now.getMinutes();
const currentDate: string = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");

const logFile: string = path.join(os.homedir(), ".dotfiles/_automac/logs/dynamic_wallpaper.log");
const dynamicWallpaperPath: string = path.join(os.homedir(), ".dotfiles/_automac/dynamic_wallpaper");
const wallpapersDir: string = path.join(os.homedir(), "Wallpapers");
const settingsFile: string = path.join(os.homedir(), ".dotfiles/_automac/dynamic_wallpaper/settings.json");
const wallpaperCountFile: string = path.join(os.homedir(), ".dotfiles/_automac/dynamic_wallpaper/history.json");

function getRandomImage(images: string[]): string | undefined {
  return images[0];
}

function saveSettings(settingsFile: string, settings: Settings): void {
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
}

function updateWallpaperCount(imagePath: string): void {
  let wallpaperCount: { [key: string]: number } = {};
  if (fs.existsSync(wallpaperCountFile)) {
    wallpaperCount = JSON.parse(fs.readFileSync(wallpaperCountFile, "utf-8"));
  }

  const relativeImagePath = path.relative(wallpapersDir, imagePath);

  if (relativeImagePath in wallpaperCount) {
    wallpaperCount[relativeImagePath] = Number(wallpaperCount[relativeImagePath]) + 1;
  } else {
    wallpaperCount[relativeImagePath] = 1;
  }

  // Sort the object by value (count) in descending order
  const sortedWallpaperCount = Object.fromEntries(Object.entries(wallpaperCount).sort(([, a], [, b]) => b - a));

  fs.writeFileSync(wallpaperCountFile, JSON.stringify(sortedWallpaperCount, null, 2));
}

const minutesToHours = (min: number): string => {
  const hours = Math.floor(min / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (min % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

async function main() {
  let timeOfDay: keyof DaySchedule = "night"; // default
  const schedule = MONTHS[currentMonth];
  for (const [period, time] of Object.entries(schedule)) {
    const timeInMinutes = time.hours * 60 + time.minutes;

    console.log("TIME_IN_MINUTES", period, minutesToHours(timeInMinutes));

    if (currentMinutes >= timeInMinutes) {
      timeOfDay = period as keyof DaySchedule;
    } else {
      break;
    }
  }

  if (fs.existsSync(settingsFile)) {
    settings = JSON.parse(fs.readFileSync(settingsFile, "utf-8"));
  }

  const previousState = settings.state.current;

  console.log(`Current: ${timeOfDay}, Previous : ${previousState}`);

  if (timeOfDay !== previousState) {
    console.log("Changing wallpaper...");
    if (settings.files[timeOfDay as keyof Settings["files"]].images.length === 0) {
      console.log("No images found. Running randomize.ts...");
      try {
        await $`bun ${dynamicWallpaperPath}/randomize_images.ts`;
        console.log("Randomize script ran successfully.");
      } catch (error) {
        console.error("Error running script:", error);
      }
    }
    settings = JSON.parse(fs.readFileSync(settingsFile, "utf-8"));

    const fullImagePath = `${wallpapersDir}/${timeOfDay}/${getRandomImage(settings.files[timeOfDay as keyof Settings["files"]].images)}`;

    if (!fullImagePath) {
      await $`echo "[${currentDate} ${currentMinutes}] No image found" >> ${logFile}`;
      process.exit(1);
    }

    // Remove first element from the array
    settings.files[timeOfDay as keyof Settings["files"]].images.shift();

    const plistFile = path.join(os.homedir(), "Library/Application Support/com.apple.wallpaper/Store/Index.plist");

    if (fs.existsSync(plistFile)) {
      try {
        await $`/usr/libexec/PlistBuddy -c "set AllSpacesAndDisplays:Desktop:Content:Choices:0:Files:0:relative file:///${fullImagePath}" ${plistFile}`.quiet();
        await $`killall WallpaperAgent`.quiet();
      } catch (error) {
        console.error("Error changing wallpaper:", error);
        await $`echo "[${currentDate} ${currentMinutes}] Error changing wallpaper: ${error}" >> ${logFile}`;
      }
    } else {
      console.log("Plist file not found. Trying alternative method to change wallpaper.");
      try {
        await $`osascript -e 'tell application "Finder" to set desktop picture to POSIX file "${fullImagePath}"'`.quiet();
      } catch (error) {
        console.error("Error changing wallpaper with alternative method:", error);
        await $`echo "[${currentDate} ${currentMinutes}] Error changing wallpaper with alternative method: ${error}" >> ${logFile}`;
      }
    }

    // Update the wallpaper count
    updateWallpaperCount(fullImagePath);

    // await $`echo "[${currentDate} ${currentTime}] `;
    settings.state.current = timeOfDay;
    saveSettings(settingsFile, settings);
  } else {
    await $`echo "[${currentDate} ${currentMinutes}] Skipping update, wallpaper for ${timeOfDay} already set" >> ${logFile}`;
    await $`echo "No change needed, wallpaper already set for this time of day."`;
  }
}

main().catch(console.error);
