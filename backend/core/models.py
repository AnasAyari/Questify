from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """Extended user model for Questify"""
    coins = models.IntegerField(default=100)
    current_streak = models.IntegerField(default=0)
    total_coins_earned = models.IntegerField(default=100)
    last_activity_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.username


class Character(models.Model):
    """User's character with stats and progression"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='character')
    name = models.CharField(max_length=100, default='Adventurer')
    level = models.IntegerField(default=1)
    xp = models.IntegerField(default=0)
    character_class = models.CharField(max_length=50, default='Novice')
    
    # Stats
    strength = models.IntegerField(default=10)
    intelligence = models.IntegerField(default=10)
    charisma = models.IntegerField(default=10)
    discipline = models.IntegerField(default=10)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} (Level {self.level})"


class Quest(models.Model):
    """Daily tasks/quests that users can complete"""
    DIFFICULTY_CHOICES = [
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quests')
    title = models.CharField(max_length=200)
    description = models.TextField()
    xp_reward = models.IntegerField(default=50)
    coin_reward = models.IntegerField(default=20)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='Medium')
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.difficulty})"


class Item(models.Model):
    """Shop items (cosmetic upgrades)"""
    ITEM_TYPES = [
        ('outfit', 'Outfit'),
        ('pet', 'Pet'),
        ('background', 'Background'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField()
    item_type = models.CharField(max_length=20, choices=ITEM_TYPES)
    price = models.IntegerField()
    emoji = models.CharField(max_length=10, default='🎁')
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.item_type})"


class Inventory(models.Model):
    """User's purchased items"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inventory')
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    equipped = models.BooleanField(default=False)
    purchased_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'item']
        verbose_name_plural = 'Inventories'

    def __str__(self):
        return f"{self.user.username} - {self.item.name}"


class JournalEntry(models.Model):
    """User's journal entries"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='journal_entries')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Journal Entries'

    def __str__(self):
        return f"{self.user.username} - {self.created_at.strftime('%Y-%m-%d')}"

