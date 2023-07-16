from django.contrib import admin
from django.contrib.auth import get_user_model
# Register your models here.
from rest_framework.authtoken.admin import TokenAdmin
TokenAdmin.raw_id_fields = ['user']


from django.utils.html import format_html
User = get_user_model()
@admin.register(User) 
class Model1Admin(admin.ModelAdmin):

    def image_tag(self, obj):
        if obj.avatar:
            return format_html('<img src="{}" style="width=30px; height:30px; border-radius:50%;" />'.format(obj.avatar.url))
        else:
            return format_html('<img src="/static/avatar.png"  style="width=30px; height:30px; border-radius:50%;" />')



    image_tag.short_description = 'Avatar'

    list_display = ["email", 'last_login', 'role', 'image_tag']
