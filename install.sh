echo "Installing automac ..."

# Create symlink to directory ~/ ($HOME) to automac/automac
# ln -s automac $HOME/automac 
# cp -r automac/Library/LaunchAgents $HOME/Library/LaunchAgents

# chmod +x $HOME/automac/wallpaper/install.sh
zsh -c "$HOME/automac/wallpaper/install.sh"

# echo "👟 Checking if wallpaper_scheduler and sleepwatcher are running..."

# launchctl list | grep wallpaper_scheduler
# launchctl list | grep sleepwatcher

# echo "🎉 Success"
