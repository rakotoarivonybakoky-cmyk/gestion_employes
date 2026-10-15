import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Departement, Poste, Employe


# =========================================================
# ACCUEIL
# =========================================================

def accueil(request):
    return JsonResponse({
        "message": "Bienvenue dans l'application Gestion des Employés",
        "statut": "Backend Django opérationnel"
    })


# =========================================================
# DEPARTEMENTS
# =========================================================

@csrf_exempt
def departements(request, id=None):

    # -------------------------
    # GET : liste
    # -------------------------
    if request.method == "GET":

        liste = Departement.objects.all().order_by("id_departement")

        resultat = []

        for departement in liste:
            resultat.append({
                "id_departement": departement.id_departement,
                "nom_departement": departement.nom_departement,
                "description": departement.description
            })

        return JsonResponse(resultat, safe=False)


    # -------------------------
    # POST : ajout
    # -------------------------
    if request.method == "POST":

        try:
            data = json.loads(request.body)

            nom = data.get("nom_departement", "").strip()
            description = data.get("description", "").strip()

            if not nom:
                return JsonResponse(
                    {"erreur": "Le nom du département est obligatoire."},
                    status=400
                )

            departement = Departement.objects.create(
                nom_departement=nom,
                description=description
            )

            return JsonResponse({
                "message": "Département ajouté avec succès.",
                "id_departement": departement.id_departement
            }, status=201)

        except Exception as e:
            return JsonResponse({
                "erreur": str(e)
            }, status=400)


    # -------------------------
    # PUT : modification
    # -------------------------
    if request.method == "PUT":

        if id is None:
            return JsonResponse(
                {"erreur": "ID du département manquant."},
                status=400
            )

        try:
            departement = Departement.objects.get(
                id_departement=id
            )

            data = json.loads(request.body)

            nom = data.get("nom_departement", "").strip()
            description = data.get("description", "").strip()

            if not nom:
                return JsonResponse(
                    {"erreur": "Le nom du département est obligatoire."},
                    status=400
                )

            departement.nom_departement = nom
            departement.description = description
            departement.save()

            return JsonResponse({
                "message": "Département modifié avec succès."
            })

        except Departement.DoesNotExist:
            return JsonResponse(
                {"erreur": "Département introuvable."},
                status=404
            )

        except Exception as e:
            return JsonResponse({
                "erreur": str(e)
            }, status=400)


    # -------------------------
    # DELETE : suppression
    # -------------------------
    if request.method == "DELETE":

        if id is None:
            return JsonResponse(
                {"erreur": "ID du département manquant."},
                status=400
            )

        try:
            departement = Departement.objects.get(
                id_departement=id
            )

            departement.delete()

            return JsonResponse({
                "message": "Département supprimé avec succès."
            })

        except Departement.DoesNotExist:
            return JsonResponse(
                {"erreur": "Département introuvable."},
                status=404
            )


    return JsonResponse(
        {"erreur": "Méthode HTTP non autorisée."},
        status=405
    )


# =========================================================
# POSTES
# =========================================================

@csrf_exempt
def postes(request, id=None):

    # -------------------------
    # GET
    # -------------------------
    if request.method == "GET":

        liste = Poste.objects.all().order_by("id_poste")

        resultat = []

        for poste in liste:
            resultat.append({
                "id_poste": poste.id_poste,
                "nom_poste": poste.nom_poste,
                "description": poste.description
            })

        return JsonResponse(resultat, safe=False)


    # -------------------------
    # POST
    # -------------------------
    if request.method == "POST":

        try:
            data = json.loads(request.body)

            nom = data.get("nom_poste", "").strip()
            description = data.get("description", "").strip()

            if not nom:
                return JsonResponse(
                    {"erreur": "Le nom du poste est obligatoire."},
                    status=400
                )

            poste = Poste.objects.create(
                nom_poste=nom,
                description=description
            )

            return JsonResponse({
                "message": "Poste ajouté avec succès.",
                "id_poste": poste.id_poste
            }, status=201)

        except Exception as e:
            return JsonResponse({
                "erreur": str(e)
            }, status=400)


    # -------------------------
    # PUT
    # -------------------------
    if request.method == "PUT":

        if id is None:
            return JsonResponse(
                {"erreur": "ID du poste manquant."},
                status=400
            )

        try:
            poste = Poste.objects.get(
                id_poste=id
            )

            data = json.loads(request.body)

            nom = data.get("nom_poste", "").strip()
            description = data.get("description", "").strip()

            if not nom:
                return JsonResponse(
                    {"erreur": "Le nom du poste est obligatoire."},
                    status=400
                )

            poste.nom_poste = nom
            poste.description = description
            poste.save()

            return JsonResponse({
                "message": "Poste modifié avec succès."
            })

        except Poste.DoesNotExist:
            return JsonResponse(
                {"erreur": "Poste introuvable."},
                status=404
            )

        except Exception as e:
            return JsonResponse({
                "erreur": str(e)
            }, status=400)


    # -------------------------
    # DELETE
    # -------------------------
    if request.method == "DELETE":

        if id is None:
            return JsonResponse(
                {"erreur": "ID du poste manquant."},
                status=400
            )

        try:
            poste = Poste.objects.get(
                id_poste=id
            )

            poste.delete()

            return JsonResponse({
                "message": "Poste supprimé avec succès."
            })

        except Poste.DoesNotExist:
            return JsonResponse(
                {"erreur": "Poste introuvable."},
                status=404
            )


    return JsonResponse(
        {"erreur": "Méthode HTTP non autorisée."},
        status=405
    )


# =========================================================
# EMPLOYES
# =========================================================

@csrf_exempt
def employes(request, id=None):

    # =====================================================
    # GET
    # =====================================================

    if request.method == "GET":

        liste = Employe.objects.select_related(
            "id_departement",
            "id_poste"
        ).all().order_by("id_employe")

        resultat = []

        for employe in liste:

            resultat.append({
                "id_employe": employe.id_employe,
                "matricule": employe.matricule,
                "nom": employe.nom,
                "prenom": employe.prenom,
                "sexe": employe.sexe,

                "date_naissance":
                    employe.date_naissance.isoformat()
                    if employe.date_naissance
                    else None,

                "telephone": employe.telephone,
                "email": employe.email,
                "adresse": employe.adresse,

                "date_embauche":
                    employe.date_embauche.isoformat(),

                "id_departement":
                    employe.id_departement_id,

                "id_poste":
                    employe.id_poste_id,

                "nom_departement":
                    employe.id_departement.nom_departement,

                "nom_poste":
                    employe.id_poste.nom_poste
            })

        return JsonResponse(resultat, safe=False)


    # =====================================================
    # POST
    # =====================================================

    if request.method == "POST":

        try:
            data = json.loads(request.body)

            matricule = data.get("matricule", "").strip()
            nom = data.get("nom", "").strip()
            prenom = data.get("prenom", "").strip()
            sexe = data.get("sexe", "").strip()

            date_naissance = data.get(
                "date_naissance"
            ) or None

            telephone = data.get(
                "telephone", ""
            ).strip()

            email = data.get(
                "email"
            ) or None

            adresse = data.get(
                "adresse", ""
            ).strip()

            date_embauche = data.get(
                "date_embauche"
            )

            id_departement = data.get(
                "id_departement"
            )

            id_poste = data.get(
                "id_poste"
            )


            # Vérifications
            if not matricule:
                return JsonResponse(
                    {"erreur": "Le matricule est obligatoire."},
                    status=400
                )

            if not nom:
                return JsonResponse(
                    {"erreur": "Le nom est obligatoire."},
                    status=400
                )

            if not prenom:
                return JsonResponse(
                    {"erreur": "Le prénom est obligatoire."},
                    status=400
                )

            if not sexe:
                return JsonResponse(
                    {"erreur": "Le sexe est obligatoire."},
                    status=400
                )

            if not date_embauche:
                return JsonResponse(
                    {"erreur": "La date d'embauche est obligatoire."},
                    status=400
                )

            if not id_departement:
                return JsonResponse(
                    {"erreur": "Le département est obligatoire."},
                    status=400
                )

            if not id_poste:
                return JsonResponse(
                    {"erreur": "Le poste est obligatoire."},
                    status=400
                )


            departement = Departement.objects.get(
                id_departement=id_departement
            )

            poste = Poste.objects.get(
                id_poste=id_poste
            )


            employe = Employe.objects.create(

                matricule=matricule,

                nom=nom,

                prenom=prenom,

                sexe=sexe,

                date_naissance=date_naissance,

                telephone=telephone,

                email=email,

                adresse=adresse,

                date_embauche=date_embauche,

                id_departement=departement,

                id_poste=poste
            )


            return JsonResponse({

                "message":
                    "Employé ajouté avec succès.",

                "id_employe":
                    employe.id_employe

            }, status=201)


        except Departement.DoesNotExist:

            return JsonResponse({

                "erreur":
                    "Le département sélectionné n'existe pas."

            }, status=400)


        except Poste.DoesNotExist:

            return JsonResponse({

                "erreur":
                    "Le poste sélectionné n'existe pas."

            }, status=400)


        except Exception as e:

            return JsonResponse({

                "erreur":
                    str(e)

            }, status=400)


    # =====================================================
    # PUT
    # =====================================================

    if request.method == "PUT":

        if id is None:
            return JsonResponse(
                {"erreur": "ID de l'employé manquant."},
                status=400
            )

        try:

            employe = Employe.objects.get(
                id_employe=id
            )

            data = json.loads(request.body)

            employe.matricule = data.get(
                "matricule",
                employe.matricule
            ).strip()

            employe.nom = data.get(
                "nom",
                employe.nom
            ).strip()

            employe.prenom = data.get(
                "prenom",
                employe.prenom
            ).strip()

            employe.sexe = data.get(
                "sexe",
                employe.sexe
            ).strip()

            employe.date_naissance = (
                data.get("date_naissance")
                or None
            )

            employe.telephone = data.get(
                "telephone",
                ""
            ).strip()

            employe.email = (
                data.get("email")
                or None
            )

            employe.adresse = data.get(
                "adresse",
                ""
            ).strip()

            if data.get("date_embauche"):
                employe.date_embauche = data.get(
                    "date_embauche"
                )

            if data.get("id_departement"):

                departement = Departement.objects.get(
                    id_departement=data.get(
                        "id_departement"
                    )
                )

                employe.id_departement = departement


            if data.get("id_poste"):

                poste = Poste.objects.get(
                    id_poste=data.get(
                        "id_poste"
                    )
                )

                employe.id_poste = poste


            employe.save()

            return JsonResponse({

                "message":
                    "Employé modifié avec succès."

            })


        except Employe.DoesNotExist:

            return JsonResponse({

                "erreur":
                    "Employé introuvable."

            }, status=404)


        except Departement.DoesNotExist:

            return JsonResponse({

                "erreur":
                    "Département introuvable."

            }, status=400)


        except Poste.DoesNotExist:

            return JsonResponse({

                "erreur":
                    "Poste introuvable."

            }, status=400)


        except Exception as e:

            return JsonResponse({

                "erreur":
                    str(e)

            }, status=400)


    # =====================================================
    # DELETE
    # =====================================================

    if request.method == "DELETE":

        if id is None:
            return JsonResponse(
                {"erreur": "ID de l'employé manquant."},
                status=400
            )

        try:

            employe = Employe.objects.get(
                id_employe=id
            )

            employe.delete()

            return JsonResponse({

                "message":
                    "Employé supprimé avec succès."

            })


        except Employe.DoesNotExist:

            return JsonResponse({

                "erreur":
                    "Employé introuvable."

            }, status=404)


    return JsonResponse(
        {"erreur": "Méthode HTTP non autorisée."},
        status=405
    )