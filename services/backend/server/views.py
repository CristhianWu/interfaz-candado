from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404

#required for checking if the user is authenticated
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from django.http import HttpResponse

def home(request):
    return HttpResponse('hello')

@api_view(['POST'])
def login(request):
    #Takes User model and checks for username
    user = get_object_or_404(User, username = request.data["username"])
    
    #validates password
    if not user.check_password(request.data["password"]):
        return Response({"error: invalid password"}, status=status.HTTP_400_BAD_REQUEST)
    
    #creates or checks for token for the user, "created" is used as a boolean
    token, created = Token.objects.get_or_create(user=user)
    
    serializer = UserSerializer(instance=user)
    
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    
    #Creates an intance of serialized data
    serializer = UserSerializer(data=request.data)
    
    #checks if frontend is sending correct data
    if serializer.is_valid():
        serializer.save()
        
        user = User.objects.get(username=serializer.data['username'])
        user.set_password(serializer.data['password'])
        user.save()
        
        #creates token
        token = Token.objects.create(user=user)
        return Response({'token': token.key, "user": serializer.data}, status=status.HTTP_201_CREATED) #"user": serializer.data is just for showing the data
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
#A header with a token must be sent to be validated
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    
    print(request.user)
    
    return Response("You are login with {}".format(request.user.username),status=status.HTTP_200_OK)