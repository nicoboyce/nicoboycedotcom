#!/usr/bin/env python3
# Update mug legs to cycle through: legs-r, legs-2, legs-l, legs-4

with open('demo.md', 'r') as f:
    content = f.read()

# Replace the single mug-legs line with all 4 variations
old_legs = '      <img src="/public/svg/mug-legs-l.svg" class="mug-legs">'
new_legs = '''      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">'''

content = content.replace(old_legs, new_legs)

with open('demo.md', 'w') as f:
    f.write(content)

print("Updated all frames with 4 leg variations!")
