from django.contrib import admin
from .models import Departement, Poste, Employe


@admin.register(Departement)
class DepartementAdmin(admin.ModelAdmin):
    list_display = ('id_departement', 'nom_departement', 'description')
    search_fields = ('nom_departement',)


@admin.register(Poste)
class PosteAdmin(admin.ModelAdmin):
    list_display = ('id_poste', 'nom_poste', 'description')
    search_fields = ('nom_poste',)


@admin.register(Employe)
class EmployeAdmin(admin.ModelAdmin):
    list_display = (
        'id_employe',
        'matricule',
        'nom',
        'prenom',
        'sexe',
        'telephone',
        'email',
        'date_embauche',
        'id_departement',
        'id_poste',
    )

    search_fields = ('matricule', 'nom', 'prenom', 'email')

    list_filter = ('sexe', 'id_departement', 'id_poste')