
echo "Installing automac 💩..."

stow macos

chmod +x ./macos/automac/wallpaper/install.sh
zsh -c "macos/automac/wallpaper/install.sh"

echo "👟 Checking if wallpaper_scheduler and sleepwatcher are running..."

launchctl list | grep wallpaper_scheduler
launchctl list | grep sleepwatcher

echo "🎉 Success"
