from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, CharacterViewSet, QuestViewSet,
    ItemViewSet, InventoryViewSet, JournalEntryViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'characters', CharacterViewSet, basename='character')
router.register(r'quests', QuestViewSet, basename='quest')
router.register(r'items', ItemViewSet, basename='item')
router.register(r'inventory', InventoryViewSet, basename='inventory')
router.register(r'journal', JournalEntryViewSet, basename='journal')

urlpatterns = [
    path('', include(router.urls)),
]
