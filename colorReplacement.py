# https://pillow.readthedocs.io/en/stable/index.html
# pip install pillow

from PIL import Image

print("please enter image name")
input = input()
image = Image.open(input + ".jpg")
image.show()
image_data = image.load()
width, height = image.size
for i in range(width):
    for j in range(height):
        r, g, b = image_data[i, j]
        image_data[i, j] = 0, g, b

image.save("changed.jpg")
newImage = Image.open("changed.jpg")
newImage.show()