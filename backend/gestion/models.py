from django.db import models


class Departement(models.Model):
    id_departement = models.AutoField(primary_key=True)
    nom_departement = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "departement"

    def __str__(self):
        return self.nom_departement


class Poste(models.Model):
    id_poste = models.AutoField(primary_key=True)
    nom_poste = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "poste"

    def __str__(self):
        return self.nom_poste


class Employe(models.Model):
    id_employe = models.AutoField(primary_key=True)
    matricule = models.CharField(max_length=50, unique=True)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    sexe = models.CharField(max_length=20)
    date_naissance = models.DateField(blank=True, null=True)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(
        max_length=150,
        unique=True,
        blank=True,
        null=True
    )
    adresse = models.CharField(max_length=255, blank=True, null=True)
    date_embauche = models.DateField()

    id_departement = models.ForeignKey(
        Departement,
        on_delete=models.CASCADE,
        db_column="id_departement",
        related_name="employes"
    )

    id_poste = models.ForeignKey(
        Poste,
        on_delete=models.CASCADE,
        db_column="id_poste",
        related_name="employes"
    )

    class Meta:
        db_table = "employe"

    def __str__(self):
        return f"{self.nom} {self.prenom}"