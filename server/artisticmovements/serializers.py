from rest_framework import serializers
from .models import ArtMovement, Artwork, Artist


class ArtMovementSerializer(serializers.ModelSerializer):
    artwork_list = serializers.ListField(source='get_artworks')
    class Meta:
        model = ArtMovement
        fields = ('id', 'name', 'label', 'artwork_list', 'number_of_artworks')


class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = ('id', 'title', 'artist', 'art_movement',
                  'artwork_image', 'uploaded_by_user')


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ('id', 'full_name')
