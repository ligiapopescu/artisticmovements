from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import ArtMovementSerializer, ArtworkSerializer, ArtistSerializer
from .models import Artwork, Artist, ArtMovement

import numpy as np
from torchvision.transforms.functional import to_tensor
from PIL import Image
import neuralnetwork.ArtisticMovementRecognition as neural_network


class ArtMovementView(viewsets.ModelViewSet):
    serializer_class = ArtMovementSerializer
    queryset = ArtMovement.objects.all()


class ArtworkView(viewsets.ModelViewSet):
    serializer_class = ArtworkSerializer
    queryset = Artwork.objects.all()

    def create(self, request):
        image = request.FILES.getlist('artwork_image')[0]
        img = Image.open(image)
        new_size = (32, 32)
        img = img.resize(new_size)
        img = np.array(img)
        img = to_tensor(img)
        predictions = neural_network.get_top_n_predictions(img, 3)
        return Response(predictions, status=status.HTTP_201_CREATED)


class ArtistView(viewsets.ModelViewSet):
    serializer_class = ArtistSerializer
    queryset = Artist.objects.all()
