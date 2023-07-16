


    




from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

# Create your views here.
# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    User = get_user_model()

    queryset = User.objects.all()
    serializer_class = UserSerializer




    





from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        if user.avatar:
            avatar = request.build_absolute_uri(user.avatar.url)
        else:
           


            avatar=None 

        if user.role == '1':
            role = 'admin'
        elif user.role == '2':
            role = 'staff'
        else:
            role = 'client'

                
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'role':role,
            'avatar': avatar
        })
    

class UserViewSet1(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):
        User = get_user_model()

        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        User = get_user_model()

        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
   


