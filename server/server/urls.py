"""ArtisticMovementRecognition URL Configuration
"""
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.urls import include
from artisticmovements import views
from rest_framework.authtoken import views as viewsauth

router = routers.DefaultRouter()
router.register(r'artisticmovements', views.ArtMovementView, 'artmovement')
router.register(r'artworks', views.ArtworkView, 'artwork')
router.register(r'artists', views.ArtistView, 'artist')
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user-information/', views.GetLoggedUserInformation.as_view()),
    path('api/user-artist/', views.UserArtistDetail.as_view()),
    path('api/artwork-review/<int:pk>/', views.ArtworkReview.as_view()),
    path('api/', include(router.urls)),
    path('api-token-auth/', viewsauth.obtain_auth_token, name='api-token-auth'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
