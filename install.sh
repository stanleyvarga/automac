echo "Installing automac ..."

chmod +x dynamic_wallpaper/install.sh
zsh -c "dynamic_wallpaper/install.sh"

echo "👟 Checking if wallpaper_scheduler and sleepwatcher are running..."

launchctl list | grep wallpaper_scheduler
launchctl list | grep sleepwatcher
