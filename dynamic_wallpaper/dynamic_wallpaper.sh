echo "🏃‍♂️ Running dynamic_wallpaper.sh..."

# Assign the path to the variable
path="$HOME/.dotfiles/_automac/dynamic_wallpaper"

# Run the dynamic_wallpaper.ts script using the bun command
bun "$path/dynamic_wallpaper.ts"
