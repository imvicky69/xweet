import os
from PIL import Image, ImageOps, ImageDraw, ImageFilter
import numpy as np

base_dir = r"c:\Users\rajvi\Repo\unkn"
raw_logo_path = os.path.join(base_dir, "public", "logo.png")

img = Image.open(raw_logo_path).convert("RGBA")
width, height = img.size

# Find exact bounding box of the dark logo
gray = img.convert("L")
arr = np.array(gray)
# Background is off-white (around 250-255)
# Anything with brightness < 220 is part of the logo/anti-aliased edges
mask_arr = np.zeros((height, width), dtype=np.uint8)

# Compute smooth alpha based on brightness
# 255 (white bg) -> alpha 0
# < 50 (dark logo) -> alpha 255
# in-between (50-250) -> smooth linear falloff
for y in range(height):
    for x in range(width):
        v = arr[y, x]
        if v >= 245:
            mask_arr[y, x] = 0
        elif v <= 60:
            mask_arr[y, x] = 255
        else:
            # Linear interpolation for anti-aliased edge
            alpha = int(255 * (245 - v) / (245 - 60))
            mask_arr[y, x] = max(0, min(255, alpha))

# Apply alpha mask
r, g, b, _ = img.split()
# Also make sure the dark color matches Carbon #171815 (RGB: 23, 24, 21)
carbon_r = Image.new("L", img.size, 23)
carbon_g = Image.new("L", img.size, 24)
carbon_b = Image.new("L", img.size, 21)
alpha_channel = Image.fromarray(mask_arr, mode="L")

clean_logo = Image.merge("RGBA", (carbon_r, carbon_g, carbon_b, alpha_channel))

# Crop to non-transparent bounding box
bbox = clean_logo.getbbox()
print("Clean logo bbox:", bbox)
cropped_logo = clean_logo.crop(bbox)

# Add comfortable padding
pad = 40
padded_w = cropped_logo.width + pad * 2
padded_h = cropped_logo.height + pad * 2
logo_navbar = Image.new("RGBA", (padded_w, padded_h), (0, 0, 0, 0))
logo_navbar.paste(cropped_logo, (pad, pad), cropped_logo)

# Save navbar logo
navbar_logo_path = os.path.join(base_dir, "public", "logo-navbar.png")
logo_navbar.save(navbar_logo_path, format="PNG")
print("Saved navbar logo to:", navbar_logo_path)

# --- 2. Create Circular Icon for Favicon ---
# Size: 512x512
icon_size = 512
circle_icon = Image.new("RGBA", (icon_size, icon_size), (0, 0, 0, 0))
draw = ImageDraw.Draw(circle_icon)

# Draw Carbon circle (#171815)
draw.ellipse((8, 8, icon_size - 8, icon_size - 8), fill=(23, 24, 21, 255))
# Draw subtle Signal Lime accent ring border
draw.ellipse((8, 8, icon_size - 8, icon_size - 8), outline=(215, 243, 106, 255), width=8)

# Now invert the logo symbol to Paper color (#F0EFE6 = 240, 239, 230)
paper_r = Image.new("L", cropped_logo.size, 240)
paper_g = Image.new("L", cropped_logo.size, 239)
paper_b = Image.new("L", cropped_logo.size, 230)
cropped_alpha = cropped_logo.split()[3]
paper_logo = Image.merge("RGBA", (paper_r, paper_g, paper_b, cropped_alpha))

# Scale symbol to fit well within circle (about 60% of circle)
target_inner_h = int(icon_size * 0.54)
scale_ratio = target_inner_h / paper_logo.height
target_inner_w = int(paper_logo.width * scale_ratio)

scaled_symbol = paper_logo.resize((target_inner_w, target_inner_h), Image.Resampling.LANCZOS)
paste_x = (icon_size - target_inner_w) // 2
paste_y = (icon_size - target_inner_h) // 2

circle_icon.paste(scaled_symbol, (paste_x, paste_y), scaled_symbol)

# Save icons in multiple locations for Next.js App Router
public_icon_path = os.path.join(base_dir, "public", "icon.png")
circle_icon.save(public_icon_path, format="PNG")

app_icon_path = os.path.join(base_dir, "src", "app", "icon.png")
circle_icon.save(app_icon_path, format="PNG")

# Also save ICO format (32x32, 48x48, 64x64, 128x128)
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128)]
public_favicon_path = os.path.join(base_dir, "public", "favicon.ico")
app_favicon_path = os.path.join(base_dir, "src", "app", "favicon.ico")

circle_icon.save(public_favicon_path, format="ICO", sizes=ico_sizes)
circle_icon.save(app_favicon_path, format="ICO", sizes=ico_sizes)
print("Saved favicon and icons successfully!")

# Also generate a Paper/Signal Lime badge variant if needed
badge_size = 512
badge_icon = Image.new("RGBA", (badge_size, badge_size), (0, 0, 0, 0))
b_draw = ImageDraw.Draw(badge_icon)
# Draw Paper circle with Terrain border
b_draw.ellipse((8, 8, badge_size - 8, badge_size - 8), fill=(240, 239, 230, 255))
b_draw.ellipse((8, 8, badge_size - 8, badge_size - 8), outline=(133, 135, 121, 200), width=6)
scaled_carbon = cropped_logo.resize((target_inner_w, target_inner_h), Image.Resampling.LANCZOS)
badge_icon.paste(scaled_carbon, (paste_x, paste_y), scaled_carbon)
badge_icon.save(os.path.join(base_dir, "public", "logo-badge-light.png"), format="PNG")
print("Saved logo-badge-light.png")
