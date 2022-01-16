"""ArtisticMovementRecognition URL Configuration
"""
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.urls import include
from artisticmovements import views

router = routers.DefaultRouter()
router.register(r'artisticmovements', views.ArtMovementView, 'artmovement')
router.register(r'artworks', views.ArtworkView, 'artwork')
router.register(r'artists', views.ArtistView, 'artist')
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

# Use static() to add url mapping to serve static files during development (only)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
