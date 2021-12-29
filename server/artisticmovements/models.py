from django.db import models

class ArtMovement(models.Model):
    """Model representing the artistic movement."""
    name = models.CharField(max_length=200, help_text='Enter the art movement', unique=True)
    label = models.IntegerField(unique=True)

    def get_artworks(self):
        """Create a list of artworks"""
        number_of_artworks = 10
        artworks = list(Artwork.objects.filter(art_movement__in=[self.label]).values()[:number_of_artworks])
        return artworks

    get_artworks.short_description = 'Artworks'

    def number_of_artworks(self):
        """Count artworks"""
        artworks = len(Artwork.objects.filter(art_movement__in=[self.label]))
        return artworks

    def __str__(self):
        """String for representing the Model object."""
        return self.name
        
from django.urls import reverse # Used to generate URLs by reversing the URL patterns

class Artwork(models.Model):
    """Model representing an artwork."""
    title = models.CharField(max_length=200, null=True, blank=True, unique=False)
    artist = models.ForeignKey('Artist', on_delete=models.SET_NULL, null=True, blank=True)
    art_movement = models.ManyToManyField(ArtMovement, help_text='Select an art movement for this artwork', blank=True)
    artwork_image = models.ImageField(upload_to='artworks/', null=True, blank=True)
    uploaded_by_user = models.BooleanField(null=True, blank=True)

    def __str__(self):
        """String for representing the Model object."""
        return self.title

    def get_absolute_url(self):
        """Returns the url to access a detail record for this artwork."""
        return reverse('artwork-detail', args=[str(self.id)])
        
    def display_art_movements(self):
        """Create a string for the art Movement. This is required to display art movement in Admin."""
        return ', '.join(art_movement.name for art_movement in self.art_movement.all()[:3])

    display_art_movements.short_description = 'Art Movement'

    class Meta:
        ordering = ['artist', 'title']
        
class Artist(models.Model):
    """Model representing an artist."""
    full_name = models.CharField(max_length=200)

    class Meta:
        ordering = ['full_name']

    def get_absolute_url(self):
        """Returns the url to access a particular author instance."""
        return reverse('artist-detail', args=[str(self.id)])

    def display_artworks(self):
        artworks = Artwork.objects.filter(artist = self)
        return artworks

    def __str__(self):
        """String for representing the Model object."""
        return self.full_name