from django.db import models
import random
import string

from django.db.models import manager

# Create your models here.
# class Test01(models.Model):
#     name = models.CharField(max_length=20)

#商品表
class Category(models.Model):
    #categoryName = models.CharField(db_column='categoryName',max_length=100,null=False)
    parentId = models.CharField(db_column='parentId',max_length=100,null=False)
    category_id = models.CharField(db_column='category_id',primary_key=True,max_length=100,null=False)
    name = models.CharField(db_column='name',max_length=100,null=False)
    category_v = models.IntegerField(db_column='category_v',default=0)

    class Meta:
        managed = True
        db_table = 'Category'

#角色表
class Roles(models.Model):
    menus = models.TextField(db_column='menus',max_length=200,default='/home')
    role_id = models.CharField(db_column='role_id',primary_key=True,max_length=100,null=False)
    name = models.CharField(db_column='name',max_length=50,null=True)
    create_time = models.CharField(db_column='create_time',max_length=100,null=True)
    role_v = models.CharField(db_column='role_v',max_length=100,default=0)
    auth_time = models.DateTimeField(db_column='auth_time',max_length=100,null=True)
    auth_name = models.CharField(db_column='auth_name',max_length=50,null=True)

    class Meta:
        managed = True
        db_table= 'Roles'

#用户表
class Users(models.Model):
    user_id = models.CharField(db_column='user_id',max_length=100,null=False)
    username = models.CharField(db_column='username',max_length=100,null=False)
    password = models.CharField(db_column='password',max_length=200,null=False)
    phone = models.CharField(db_column='phone',max_length=20,null=True)
    email = models.CharField(db_column='email',max_length=100,null=True)
    role_id = models.CharField(db_column='role_id',max_length=100,null=False)
    create_time = models.DateTimeField(db_column='create_time',max_length=200,null=True)
    user_v = models.CharField(db_column='user_v',max_length=20,default=0)

    class Meta:
        managed = True
        db_table = 'Users'