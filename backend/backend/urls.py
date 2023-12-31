"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from cores.views import UserViewSet, CustomAuthToken, UserViewSet1
from rest_framework.authtoken import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
user_detail = UserViewSet1.as_view({'get': 'retrieve'})
router.register(r'users', UserViewSet, basename='user')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),

    path('api-auth/', include('rest_framework.urls')),
    path('login/', CustomAuthToken.as_view())


    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)