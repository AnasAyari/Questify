from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import datetime

from .models import User, Character, Quest, Item, Inventory, JournalEntry
from .serializers import (
    UserSerializer, CharacterSerializer, QuestSerializer, 
    ItemSerializer, InventorySerializer, JournalEntrySerializer
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user's profile"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class CharacterViewSet(viewsets.ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Character.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def gain_xp(self, request, pk=None):
        """Add XP to character and handle level ups"""
        character = self.get_object()
        xp_amount = request.data.get('xp', 0)
        
        character.xp += xp_amount
        
        # Check for level up (100 XP per level)
        new_level = (character.xp // 100) + 1
        if new_level > character.level:
            character.level = new_level
            # Increase stats on level up
            character.strength += 2
            character.intelligence += 2
            character.charisma += 1
            character.discipline += 3
        
        character.save()
        serializer = self.get_serializer(character)
        return Response(serializer.data)


class QuestViewSet(viewsets.ModelViewSet):
    queryset = Quest.objects.all()
    serializer_class = QuestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Quest.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Complete a quest and award XP and coins"""
        quest = self.get_object()
        
        if quest.completed:
            return Response(
                {'error': 'Quest already completed'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        quest.completed = True
        quest.completed_at = timezone.now()
        quest.save()
        
        # Award XP to character
        character = request.user.character
        character.xp += quest.xp_reward
        
        # Check for level up
        new_level = (character.xp // 100) + 1
        if new_level > character.level:
            character.level = new_level
            character.strength += 2
            character.intelligence += 2
            character.charisma += 1
            character.discipline += 3
        
        character.save()
        
        # Award coins to user
        user = request.user
        user.coins += quest.coin_reward
        user.total_coins_earned += quest.coin_reward
        user.save()
        
        serializer = self.get_serializer(quest)
        return Response(serializer.data)


class ItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def purchase(self, request, pk=None):
        """Purchase an item from the shop"""
        item = self.get_object()
        user = request.user
        
        # Check if user has enough coins
        if user.coins < item.price:
            return Response(
                {'error': 'Not enough coins'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if already owned
        if Inventory.objects.filter(user=user, item=item).exists():
            return Response(
                {'error': 'Item already owned'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Deduct coins and add to inventory
        user.coins -= item.price
        user.save()
        
        inventory_item = Inventory.objects.create(user=user, item=item)
        serializer = InventorySerializer(inventory_item)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Inventory.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def equip(self, request, pk=None):
        """Equip an item"""
        inventory_item = self.get_object()
        
        # Unequip other items of same type
        Inventory.objects.filter(
            user=request.user,
            item__item_type=inventory_item.item.item_type,
            equipped=True
        ).update(equipped=False)
        
        inventory_item.equipped = True
        inventory_item.save()
        
        serializer = self.get_serializer(inventory_item)
        return Response(serializer.data)


class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JournalEntry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

