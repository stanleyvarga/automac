# Define common paths and file names
launch_agents_src_dir="Library/LaunchAgents"
launch_agents_dest_dir="$HOME/Library/LaunchAgents"
sleepwatcher_plist="de.bernhard-baehr.sleepwatcher.plist"
wallpaper_scheduler_plist="com.automac.wallpaper_scheduler.plist"

# Copy plist files to the destination directory
ln -s "$launch_agents_src_dir/$sleepwatcher_plist" "$launch_agents_dest_dir/$sleepwatcher_plist"
ln -s "$launch_agents_src_dir/$wallpaper_scheduler_plist" "$launch_agents_dest_dir/$wallpaper_scheduler_plist"

# Check if the files have been copied properly
if [ ! -L "$launch_agents_dest_dir/$sleepwatcher_plist" ]; then
  echo "Error: Symlink for $sleepwatcher_plist was not created properly"
  exit 1
fi

if [ ! -L "$launch_agents_dest_dir/$wallpaper_scheduler_plist" ]; then
  echo "Error: Symlink for $wallpaper_scheduler_plist was not created properly"
  exit 1
fi

chmod 644 "$launch_agents_src_dir/$sleepwatcher_plist"
chmod 644 "$launch_agents_src_dir/$wallpaper_scheduler_plist"

# Unload plist files if they exist
sleepwatcher_plist_path="$launch_agents_dest_dir/$sleepwatcher_plist"
wallpaper_scheduler_plist_path="$launch_agents_dest_dir/$wallpaper_scheduler_plist"

if [ -f "$sleepwatcher_plist_path" ]; then
  launchctl unload "$sleepwatcher_plist_path"
fi

if [ -f "$wallpaper_scheduler_plist_path" ]; then
  launchctl unload "$wallpaper_scheduler_plist_path"
fi

# Load the plist files
launchctl load -w "$sleepwatcher_plist_path"
launchctl load -w "$wallpaper_scheduler_plist_path"

launchctl load -w $HOME/Library/LaunchAgents/de.bernhard-baehr.sleepwatcher.plist

# Define paths to scripts
dynamic_wallpaper_dir="$DOTFILES/_automac/dynamic_wallpaper"
dynamic_wallpaper_ts="$dynamic_wallpaper_dir/dynamic_wallpaper.ts"
dynamic_wallpaper_sh="$dynamic_wallpaper_dir/dynamic_wallpaper.sh"
randomize_images_ts="$dynamic_wallpaper_dir/randomize_images.ts"

# Make the scripts executable
chmod +x "$dynamic_wallpaper_ts"
chmod +x "$dynamic_wallpaper_sh"
chmod +x "$randomize_images_ts"

# Execute the scripts using zsh
zsh -c "bun $dynamic_wallpaper_sh"
