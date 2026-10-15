from django.urls import path

from .views import (
    accueil,
    departements,
    postes,
    employes
)


urlpatterns = [

    path(
        "",
        accueil,
        name="accueil"
    ),

    path(
        "departements/",
        departements,
        name="departements"
    ),

    path(
        "departements/<int:id>/",
        departements,
        name="departement_detail"
    ),

    path(
        "postes/",
        postes,
        name="postes"
    ),

    path(
        "postes/<int:id>/",
        postes,
        name="poste_detail"
    ),

    path(
        "employes/",
        employes,
        name="employes"
    ),

    path(
        "employes/<int:id>/",
        employes,
        name="employe_detail"
    ),
]