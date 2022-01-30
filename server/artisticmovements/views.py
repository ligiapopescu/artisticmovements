from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status

# ArtMovementSerializer, ArtworkSerializer, ArtistSerializer
from .serializers import *
from .models import Artwork, Artist, ArtMovement

import numpy as np
from torchvision.transforms.functional import to_tensor
from PIL import Image
import neuralnetwork.ArtisticMovementRecognition as neural_network

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authtoken.models import Token

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        isValid = serializer.is_valid()
        print('isValid', isValid)
        if isValid == True:
            serializer.save()
            user = User.objects.get_or_create(username=serializer.data['username'])[0]
            user.set_password(serializer.data['password'])
            user.save()
            token = Token.objects.get_or_create(user=user)[0]
            responseData = {"token": token.key}
            membergroup = Group.objects.get(name="Member")
            membergroup.user_set.add(user)
            return Response(responseData, status=status.HTTP_201_CREATED)
        else:
            responseData = {"message": "Data is not valid!"}
            return Response(responseData, None)
        

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


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
