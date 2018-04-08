import os
import glob
from PIL import Image

for filename in glob.iglob('tmp/*.png'):
    print filename
    img = Image.open(filename)
    img = img.rotate(-90, expand=True)
    img.save(filename)