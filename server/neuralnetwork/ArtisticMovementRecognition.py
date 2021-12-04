from numpy.core.fromnumeric import sort
import torch
import torch.nn as nn
import torch.utils.data as data
from torch.utils.data import Dataset, DataLoader
import torch.optim as optim
from torchvision.transforms.functional import to_tensor
import torchvision.models as models

import numpy as np
import csv

from PIL import Image
import random
import os

import sys
sys.path.insert(0, './neuralnetwork')

absolute_path = os.path.dirname(os.path.abspath(__file__))

#csv_source_path = absolute_path + '/traindata/wikiart_csv/'
#img_source_path = absolute_path + '/traindata/wikiart/'
csv_source_path = 'C:/Projects/wikiart_csv/'
img_source_path = 'C:/Projects/wikiart/'


def get_list_from_file(file_path):

    images = []

    with open(file_path, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',')

        for row in spamreader:
            image = {
                "label": row[1],
                "path": row[0],
                "imageData": None
            }

            path = img_source_path + row[0]
            if (os.path.isfile(path)):
                images.append(image)

    return images


def get_file_lists():
    csv_path = csv_source_path + 'style_train.csv'
    file_list = get_list_from_file(csv_path)

    train_test_proportion = .85

    random.shuffle(file_list)

    train_file_list = file_list[:int(train_test_proportion*len(file_list))]
    test_file_list = file_list[int(train_test_proportion*len(file_list)):]

    return train_file_list, test_file_list


def train_fn(epochs: int, train_loader: data.DataLoader, test_loader: data.DataLoader,
             net: nn.Module, loss_fn: nn.Module, optimizer: optim.Optimizer):

  # Iteram prin numarul de epoci
    for e in range(epochs):
        print('Epoca {}/{}'.format(e, epochs - 1))
        print('-' * 10)
        # Iteram prin fiecare exemplu din dataset
        net = net.train()
        for idx, (images, labels) in enumerate(train_loader):
            # Aplicam reteaua neurala pe imaginile de intrare
            out = net(images)
            # Aplicam functia cost pe iesirea retelei neurale si pe adnotarile imaginilor
            loss = loss_fn(out, labels)
            # Aplicam algoritmul de back-propagation
            loss.backward()
            # Facem pasul de optimizare, pentru a aplica gradientii pe parametrii retelei
            optimizer.step()
            # Apelam functia zero_grad() pentru a uita gradientii de la iteratie curenta
            optimizer.zero_grad()

        print("Loss-ul la finalul epocii {} are valoarea {}".format(e, loss.item()))

        # Caluculul acuratetii
        count = 0
        correct = 0

        net = net.eval()


        for test_images, test_labels in test_loader:
            predicted_labels = net(test_images)
            predicted_labels = np.array(predicted_labels.detach().numpy())

            count += len(test_images)
            for index in range(len(test_images)):
                sortedIndexes = np.argsort(predicted_labels[index])[::-1]
                if test_labels[index].numpy() in sortedIndexes[:3]:
                    correct += 1

        print("Acuratetea la finalul epocii {} este {:.2f}".format(
            e, (correct / count)*100))

    torch.save(net, "server/neuralnetwork/torch_model_3")
    return net


class StyleRecognitionDataset(Dataset):
    def __init__(self, file_list, width=128, height=128, transform=None):
        self.file_list = file_list
        self.transform = transform
        self.img_size = (width, height)

    def __len__(self):
        return len(self.file_list)

    def __getitem__(self, index):
        img_data = self.file_list[index]
        img_path = img_data["path"]
        img_label = int(img_data["label"])
        img = Image.open(img_source_path + img_path)
        img = img.resize(self.img_size)
        img = np.array(img)
        return to_tensor(img), img_label


def get_data_loaders():
    train_samples, test_samples = get_file_lists()
    style_recognition_train = StyleRecognitionDataset(train_samples, 32, 32)
    style_recognition_test = StyleRecognitionDataset(test_samples, 32, 32)

    train_loader = DataLoader(style_recognition_train,
                              batch_size=16, shuffle=True, drop_last=True)
    test_loader = DataLoader(style_recognition_test,
                             batch_size=16, shuffle=False, drop_last=True)
    return train_loader, test_loader


def train_model(epochs):
    train_loader, test_loader = get_data_loaders()
    activation = nn.Tanh()

    net = models.resnet18(pretrained=True)
    num_ftrs = net.fc.in_features
    net.fc = nn.Linear(num_ftrs, 27)

    optimizer = optim.SGD(net.parameters(), lr=1e-2)
    optimizer.zero_grad()
    loss_fn = nn.CrossEntropyLoss()
    network = train_fn(epochs, train_loader, test_loader,
                       net, loss_fn, optimizer)


def get_top_n_predictions(tensorImage, n):
    prediction = get_predictions(tensorImage)
    artisticMovementDictionary = get_artistic_movements_dict()
    topPredictions = []
    prediction = np.array(prediction.detach().numpy())[0]
    sortedIndexes = np.argsort(prediction)[::-1]

    for classNumber in sortedIndexes[:n]:
        classData = {}
        classData['classPercent'] = prediction[classNumber]
        className = artisticMovementDictionary[classNumber]
        className = className.replace("_", " ")
        classData['className'] = className

        topPredictions.append(classData)

    return topPredictions


def get_predictions(tensorImage):
    processed_images = []
    processed_images.append(tensorImage)
    model_input = torch.unsqueeze(tensorImage, 0)
    model = torch.load('neuralnetwork/torch_model_2')
    prediction = model(model_input)
    return prediction


def get_artistic_movements_dict():
    class_file = csv_source_path + "style_class.txt"

    artisticMovementDictionary = {}
    with open(class_file, newline='\n') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=' ')

        for row in spamreader:
            idx = int(row[0])
            val = row[1]
            artisticMovementDictionary[idx] = val
    return artisticMovementDictionary
