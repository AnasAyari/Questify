from rest_framework import serializers
from .models import User, Character, Quest, Item, Inventory, JournalEntry


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ['id', 'name', 'level', 'xp', 'character_class', 'strength', 
                  'intelligence', 'charisma', 'discipline', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    character = CharacterSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'coins', 'current_streak', 
                  'total_coins_earned', 'character']
        read_only_fields = ['id']


class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ['id', 'title', 'description', 'xp_reward', 'coin_reward', 
                  'difficulty', 'completed', 'completed_at', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'completed_at']


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'item_type', 'price', 'emoji', 'created_at']
        read_only_fields = ['id', 'created_at']


class InventorySerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)
    
    class Meta:
        model = Inventory
        fields = ['id', 'item', 'equipped', 'purchased_at']
        read_only_fields = ['id', 'purchased_at']


class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ['id', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
