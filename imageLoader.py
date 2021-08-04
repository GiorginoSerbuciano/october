import os, json

data_folder = os.listdir('data')

image_list = [name for name in data_folder]

images = {
    'square': [],
    'circle': [],
    'triangle': [],
}

for i in image_list:
    for j in images.keys():
        if i.split('_')[0] == j:
            images[j].append(i)

if __name__ == "__main__":
    with open('imageList.json', 'w+') as fp:
        json.dump(images, fp, sort_keys=True, indent=4)
