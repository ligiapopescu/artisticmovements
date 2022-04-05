from rest_framework import viewsets
from rest_framework import response
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404

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
from rest_framework import authentication, permissions

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        isValid = serializer.is_valid()
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
        if request.user.is_authenticated:
            title = request.POST.get('title', 'Default')
            artistId = request.POST.get('artistId', 'Default')
            artist = Artist.objects.get(id=artistId)
            artwork = Artwork.objects.create(title=title, artist=artist, uploaded_by_user=1, artwork_image=image)
            art_movement_array = []
            for prediction in predictions:
                art_movement_array.append(ArtMovement.objects.get(name=prediction["className"]))
            
            artwork.art_movement.set(art_movement_array)
            artwork.save()
        
        return Response(predictions, status=status.HTTP_201_CREATED)


class ArtistView(viewsets.ModelViewSet):
    serializer_class = ArtistSerializer
    queryset = Artist.objects.all()
class GetLoggedUserInformation(APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        response = {}
        response["username"] = request.user.username
        response["artists"] = []
        if request.user.is_authenticated:
            userArtists = Artist.objects.filter(user=request.user)
            response["artists"] = ArtistSerializer(userArtists, many=True).data
        return Response(response)
    
class UserArtistDetail(APIView):
    def get(self, request, format=None):
        response = {}
        response["artists"] = []
        userArtists = Artist.objects.exclude(user__isnull=True)
        response["artists"] = ArtistSerializer(userArtists, many=True).data
        return Response(response)

    def put(self, request, pk, format=None):
        if request.user.is_authenticated:
            artist = self.get_object(pk)
            serializer = ArtistSerializer(artist, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        if request.user.is_authenticated:
            artistName = request.POST.get('artistName', 'Default')
            Artist.objects.create(full_name=artistName, user=request.user)
        return Response(data=None,status=status.HTTP_201_CREATED)

    def delete(self, request, pk, format=None):
        if request.user.is_authenticated:
            artist = self.get_object(pk)
            artist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ArtworkReview(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self, request, pk, format=None):
        artwork = Artwork.objects.get(id=pk)
        if request.user in artwork.appreciated_by.all():
            artwork.appreciated_by.remove(request.user)
        else:
            artwork.appreciated_by.add(request.user)
        artwork.save()
        return Response(status=status.HTTP_200_OK)

            

