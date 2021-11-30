# October
_An artistic project written in JavaScript & Processing 3.5.4_

_A collaboration between [KDArslan](https://github.com/KDArslan) and [GiorginoSerbuciano](https://github.com/GiorginoSerbuciano)._

_Licensed under the GNU General Public License v3. 
Copyright 2021._

_______

## 1. Note of liability & Privacy notice

`This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.`

We do not collect any information from you. For privacy concerns, please consult the websites of the libraries used by this software:
* [p5.js](https://p5js.org)
* [ml5.js](https://ml5js.org)
* [Processing](https://processing.org)

`WE TAKE NO RESPONSIBILITY FOR ANY LOSS OF DATA.`

## 2. Summary

'October' is an art project that makes use of machine learning. It consists in a simple interface (p5.js & html component) and a neural network for image classification (ml5.js component) trained on an algorithmically-generated dataset (Processing component). The interface allows user input in the form of a mouse drawing. This is passed to the neural network, which classifies the user's input as belonging to one of two categories. The final output, altered by the neural network's classification, is a response to the user's input. 

## 3. Getting started

In order to run this web application, you will need:
- An up-to-date web-browser;
- An internet connection;
- A running local server, see [https://github.com/processing/p5.js/wiki/Local-server#vs-code-live-server](https://github.com/processing/p5.js/wiki/Local-server#vs-code-live-server);

The interactive portion of the software corresponds with `sketch.html`. The scripts loaded in this file are contained in `sketch.js` and `controls.js`. Running this file on your local server will load the interface and a pre-trained NN model. Making full use of this portion requires no knowledge of p5.js.

For creating your own data set using our code, you will need [Processing](https://processing.org/download) (3.5.4 or greater) installed on your machine. Once installed, you can run `dataset.pde` to generate your data set. Make sure to format your file names as follows: `label_001.png`. `label` should belong to the categories that you are training the NN for; this will be read when loading for training. This process presupposes familiarity with Processing, p5.js and ml5.js.

We have provided you with two versions of our model. To create your own model, run `train.html` on your local server. The corresponding script is `training.js`. If you have placed images inside the directory `dataset/data`, these will be loaded automatically. To run the training, either press "t" on your keyboard or type `startTraining()` in the console. Please keep in mind that training a model with large amounts of high-resolution images may be very resource-intensive and/or take a long time. 

## 4. Interface / visual component (p5.js & html)

The interface consists in a black screen (the drawing surface) and a few overlay elements (the drawing area, the instructions, the title). The drawing surface is used for both input and output. The output is presented after and on the basis of the input. This output may be stored to disk in the form of an image file.

Corresponding files: `sketch.js`, `sketch.html`, `controls.js`

## 5. ML component (ml5.js)

The machine-learning component consists of a neural network configured for the classification of images size `[70, 70, 4]` (4 color channels). This is an `ml5.neuralNetwork()` object. Training is currently configured to run for 50 epochs with a set size of 200. The model is trained in `train.html`. Once training is over, the resulting model files are saved to disk. If these files are placed in the folder `model/`, they will automatically be loaded in `sketch.html`. 

Corresponding files: `training.js`, `train.html`, all of directory `model/`

## 6. Data component (Processing)

The data component consists of a Processing script. This script generates a set number of drawings and saves them to disk every frame. Running this script will write files to disk under `dataset/data/`. Please beware that this process may be resource-intensive and/or take a long time and that no over-write protection is implemented.

Corresponding files: all of directory `dataset/`

## 7. Folder structure
```
.
├── controls.js
├── dataset
│   ├── data
│   └── dataset.pde
├── LICENSE
├── model
│   ├── entire_bias
│   │   ├── model.json
│   │   ├── model_meta.json
│   │   └── model.weights.bin
│   ├── lobed_bias
│   │   ├── model.json
│   │   ├── model_meta.json
│   │   └── model.weights.bin
│   ├── model.json
│   ├── model_meta.json
│   └── model.weights.bin
├── README.md
├── sketch.html
├── sketch.js
├── train.html
└── training.js
```
## 8. Contact

[KDArslan](https://github.com/KDArslan)

[GiorginoSerbuciano](https://github.com/GiorginoSerbuciano)

[Visit the repository on GitHub](https://github.com/GiorginoSerbuciano/october)
