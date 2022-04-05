from django.contrib import admin

from .models import Artist, Artwork, ArtMovement

class ArtworkInline(admin.TabularInline):
    model = Artwork

# Register the Admin classes for Artist
@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('id','full_name', 'user')
    fields = ['full_name', 'user']
    inlines = [ArtworkInline]

# Register the Admin classes for ArtMovement
@admin.register(ArtMovement)
class ArtMovementAdmin(admin.ModelAdmin):
    pass
    
# Register the Admin classes for Artwork
@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'display_art_movements', 'uploaded_by_user', 'id')
    list_filter = ('uploaded_by_user', 'art_movement', 'artist', 'appreciated_by')
 