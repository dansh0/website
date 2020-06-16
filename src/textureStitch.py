from PIL import Image
import os

positions = [
	(732, 724),
	(732, 1408),
	
	
	(35,719),
	(1429, 1401),
	(1401, 731),
	
	(49, 1408),
]

colors = ['green', 'blue', 'orange', 'red', 'white', 'yellow', 'black']

currPath = os.path.abspath(os.path.dirname(__file__))
texturePath = os.path.join(currPath, "resources", "textures")

inserts = {}

for color in colors:
	imPath = os.path.join(texturePath, "textures_" + color + ".png")
	inserts[color] = Image.open(imPath)


xNegColor = [inserts["green"], inserts["black"], inserts["black"]]
xPosColor = [inserts["black"], inserts["black"], inserts["blue"]]
yNegColor = [inserts["orange"], inserts["black"], inserts["black"]]
yPosColor = [inserts["black"], inserts["black"], inserts["red"]]
zNegColor = [inserts["white"], inserts["black"], inserts["black"]]
zPosColor = [inserts["black"], inserts["black"], inserts["yellow"]]

for i in range(27):
	zIndex = i%3
	yIndex = int(i/3) % 3
	xIndex = int(i/9)
	matArray = [
		xPosColor[xIndex],
		xNegColor[xIndex],
		yPosColor[yIndex],
		yNegColor[yIndex],
		zPosColor[zIndex],
		zNegColor[zIndex]
	]

	im = Image.new('RGB', (2048, 2048), color=(0, 0, 0))
	for j in range(6):
		im.paste(matArray[j], positions[j])
	
	im.save(os.path.join(texturePath, "UVMap_" + f'{i:02}' + ".png"))
