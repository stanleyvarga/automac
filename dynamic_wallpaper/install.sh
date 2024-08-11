cp ../Library/LaunchAgents/de.bernhard-baehr.sleepwatcher.plist $HOME/Library/LaunchAgents
cp ../Library/LaunchAgents/com.automac.wallpaper_sheduler.plist $HOME/Library/LaunchAgents

# Unload sleepwatcher if it exists
sleepwatcher_plist="$HOME/Library/LaunchAgents/de.bernhard-baehr.sleepwatcher.plist"
if [ -f "$sleepwatcher_plist" ]; then
  launchctl unload -w "$sleepwatcher_plist"
fi

# Unload wallpaper_scheduler if it exists
wallpaper_scheduler_plist="$HOME/Library/LaunchAgents/com.automac.wallpaper_scheduler.plist"
if [ -f "$wallpaper_scheduler_plist" ]; then
  launchctl unload -w "$wallpaper_scheduler_plist"
fi

launchctl load -w "$sleepwatcher_plist"
launchctl load -w "$wallpaper_scheduler_plist"

chmod +x $DOTFILES/_automac/dynamic_wallpaper/dynamic_wallpaper.ts
chmod +x $DOTFILES/_automac/dynamic_wallpaper/dynamic_wallpaper.sh
chmod +x $DOTFILES/_automac/dynamic_wallpaper/randomize_images.ts

zsh -c "bun $DOTFILES/_automac/dynamic_wallpaper/randomize_images.ts"
zsh -c "bun $DOTFILES/_automac/dynamic_wallpaper/dynamic_wallpaper.sh"
