from django.contrib import admin
from .models import User, Character, Quest, Item, Inventory, JournalEntry


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'coins', 'current_streak', 'total_coins_earned']
    search_fields = ['username', 'email']
    list_filter = ['current_streak']


@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'level', 'xp', 'character_class']
    search_fields = ['name', 'user__username']
    list_filter = ['level', 'character_class']


@admin.register(Quest)
class QuestAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'difficulty', 'xp_reward', 'coin_reward', 'completed', 'created_at']
    search_fields = ['title', 'user__username']
    list_filter = ['difficulty', 'completed', 'created_at']


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'item_type', 'price', 'emoji']
    search_fields = ['name']
    list_filter = ['item_type']


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ['user', 'item', 'equipped', 'purchased_at']
    search_fields = ['user__username', 'item__name']
    list_filter = ['equipped', 'item__item_type']


@admin.register(JournalEntry)
class JournalEntryAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at']
    search_fields = ['user__username', 'content']
    list_filter = ['created_at']

