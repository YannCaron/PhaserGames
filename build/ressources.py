import os
import glob

ASSETS = '../assets/'
OUTPUT_FILE = '../resources.js'

def toRootPath(filename):
	return filename.replace('../', '')

def toCodeName(filename, replace):
	return filename.replace(replace, '').replace('.png', '').replace('/', '-').replace(' ', '-').replace('_', '-')

file = open(OUTPUT_FILE, 'w');

# package
file.write('// package\n');
file.write('var Blockly4kids = Blockly4kids || {};\n');
file.write('\n')

# images
file.write('// game images for actor creation\n');
file.write('Blockly4kids.gameImages = {};\n');
for directory in sorted(glob.iglob(ASSETS + 'img/*')):
	category = toCodeName(directory, ASSETS + 'img/')
	file.write('Blockly4kids.gameImages[\'' + category + '\'] = [\n');

	first = True
	for filename in sorted(glob.iglob(directory + '/*.png')):
		key = toCodeName(filename, ASSETS + 'img/')
		filenameRelative = toRootPath(filename)

		if not first: file.write(',\n')
		first = False

		file.write('\t[{ src: \'')
		file.write(filenameRelative)
		file.write('\', width: 50, height: 50 }, ')
		file.write('\'')
		file.write(key)
		file.write('#')
		file.write(filenameRelative)
		file.write('\'')
		file.write(']')

	file.write('\n];\n')


file.close()

file=open(OUTPUT_FILE,'r')
lines = file.readlines()
#print (''.join(lines))
file.close()