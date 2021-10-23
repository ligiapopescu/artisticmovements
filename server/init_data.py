import csv
import os
import django
os.environ["DJANGO_SETTINGS_MODULE"] = 'server.settings'
django.setup()
from artisticmovements.models import Artwork, Artist, ArtMovement
path = os.path.dirname(os.path.abspath(__file__))

csv_source_path = path + '/data/'
img_source_path = path + '/data/artworks/'

def get_image_list(file_path):

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

def import_artworks():
    csv_path = csv_source_path + 'style_train.csv'
    file_list = get_image_list(csv_path)
    for img_row in file_list:
        img_path = img_row["path"]
        art_movement_label = int(img_row["label"])

        img_data = get_image_data_from_string(img_path)
        
        if "title" in img_data and "path" in img_data and "artist" in img_data:
            artwork = Artwork.objects.update_or_create(title=img_data["title"])[0]
            artwork.artwork_image=img_data["path"]
            art_movement = ArtMovement.objects.get(label=art_movement_label)
            artwork.art_movement.set([art_movement])
            artist = Artist.objects.update_or_create(full_name=img_data["artist"])[0]
            artwork.artist = artist
            artwork.save()
        
def get_image_data_from_string(path_string):
    img_data = {}
    img_data['path'] = "artworks/" + path_string
    img_identifier = path_string.split('/')
    
    if len(img_identifier) == 2:
        img_full_name = img_identifier[1]
        img_full_name = img_full_name.split('_')
        if len(img_full_name) == 2:
            img_data['artist'] = " ".join(img_full_name[0].split("-"))
            img_title_without_extension = img_full_name[1].split(".")[0]
            img_data['title'] = " ".join(img_title_without_extension.split("-"))
    
    return img_data            

def import_art_movements():
    class_file = csv_source_path + "style_class.txt"
    with open(class_file, newline='\n') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=' ')

        for row in spamreader:
            label = int(row[0])
            art_movement_name = row[1]
            art_movement_name = art_movement_name.replace("_", " ")
            ArtMovement.objects.update_or_create(name=art_movement_name,label=label)

import_art_movements()
import_artworks()
