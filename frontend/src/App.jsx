import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import "./App.css";

const API_URL = "https://maholy.pythonanywhere.com";
const ITEMS_PER_PAGE = 5;

function Icon({ name, size = 20 }) {
  const icons = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    building: (
      <>
        <path d="M3 21h18" />
        <path d="M6 21V3h12v18" />
        <path d="M9 7h2" />
        <path d="M13 7h2" />
        <path d="M9 11h2" />
        <path d="M13 11h2" />
        <path d="M9 15h2" />
        <path d="M13 15h2" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
        <path d="M10 12v2h4v-2" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 15H6L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
      </>
    ),
    save: (
      <>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
        <path d="M17 21v-8H7v8" />
        <path d="M7 3v5h8" />
      </>
    ),
    close: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    usersSmall: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    refresh: (
      <>
        <path d="M20 11a8.1 8.1 0 0 0-15.5-2" />
        <path d="M4 4v5h5" />
        <path d="M4 13a8.1 8.1 0 0 0 15.5 2" />
        <path d="M20 20v-5h-5" />
      </>
    )
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

function DateFields({
  value,
  onChange,
  name,
  label,
  startYear = 1950
}) {
  const taonaAnkehitriny = new Date().getFullYear();

  const [jour, setJour] = useState(value ? value.split("-")[2] : "");
  const [mois, setMois] = useState(value ? value.split("-")[1] : "");
  const [annee, setAnnee] = useState(value ? value.split("-")[0] : "");

  useEffect(() => {
    if (value) {
      const parties = value.split("-");
      setAnnee(parties[0] || "");
      setMois(parties[1] || "");
      setJour(parties[2] || "");
    } else {
      setJour("");
      setMois("");
      setAnnee("");
    }
  }, [value]);

  const moisOptions = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ];

  const annees = Array.from(
    { length: taonaAnkehitriny - startYear + 1 },
    (_, index) => String(taonaAnkehitriny - index)
  );

  const nombreJours =
    annee && mois
      ? new Date(Number(annee), Number(mois), 0).getDate()
      : 31;

  function mettreAJourDate(nouveauJour, nouveauMois, nouvelleAnnee) {
    if (nouveauJour && nouveauMois && nouvelleAnnee) {
      const jourNumerique = Number(nouveauJour);
      const moisNumerique = Number(nouveauMois);
      const anneeNumerique = Number(nouvelleAnnee);

      const dateVerifiee = new Date(
        anneeNumerique,
        moisNumerique - 1,
        jourNumerique
      );

      if (
        dateVerifiee.getFullYear() === anneeNumerique &&
        dateVerifiee.getMonth() === moisNumerique - 1 &&
        dateVerifiee.getDate() === jourNumerique
      ) {
        onChange({
          target: {
            name,
            value: `${nouvelleAnnee}-${nouveauMois.padStart(2, "0")}-${nouveauJour.padStart(2, "0")}`
          }
        });
        return;
      }
    }

    onChange({ target: { name, value: "" } });
  }

  function changerJour(e) {
    const nouveauJour = e.target.value;
    setJour(nouveauJour);
    mettreAJourDate(nouveauJour, mois, annee);
  }

  function changerMois(e) {
    const nouveauMois = e.target.value;
    setMois(nouveauMois);

    const limiteJours = new Date(
      Number(annee || taonaAnkehitriny),
      Number(nouveauMois),
      0
    ).getDate();

    const jourCorrige =
      jour && Number(jour) > limiteJours ? "" : jour;

    setJour(jourCorrige);
    mettreAJourDate(jourCorrige, nouveauMois, annee);
  }

  function changerAnnee(e) {
    const nouvelleAnnee = e.target.value;
    setAnnee(nouvelleAnnee);

    const limiteJours = new Date(
      Number(nouvelleAnnee),
      Number(mois),
      0
    ).getDate();

    const jourCorrige =
      jour && mois && Number(jour) > limiteJours ? "" : jour;

    setJour(jourCorrige);
    mettreAJourDate(jourCorrige, mois, nouvelleAnnee);
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="date-fields">
        <select
          value={jour}
          onChange={changerJour}
          aria-label={`${label} : jour`}
          required
        >
          <option value="">Jour</option>
          {Array.from({ length: nombreJours }, (_, index) => {
            const numero = String(index + 1).padStart(2, "0");
            return (
              <option key={numero} value={numero}>
                {numero}
              </option>
            );
          })}
        </select>

        <select
          value={mois}
          onChange={changerMois}
          aria-label={`${label} : mois`}
          required
        >
          <option value="">Mois</option>
          {moisOptions.map((nomMois, index) => (
            <option
              key={nomMois}
              value={String(index + 1).padStart(2, "0")}
            >
              {nomMois}
            </option>
          ))}
        </select>

        <select
          value={annee}
          onChange={changerAnnee}
          aria-label={`${label} : année`}
          required
        >
          <option value="">Année</option>
          {annees.map((anneeOption) => (
            <option key={anneeOption} value={anneeOption}>
              {anneeOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Pagination({
  totalItems,
  currentPage,
  setCurrentPage
}) {
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / ITEMS_PER_PAGE)
  );

  if (totalItems === 0) {
    return null;
  }

  function changerPage(page) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Affichage de <strong>{start}</strong> à{" "}
        <strong>{end}</strong> sur <strong>{totalItems}</strong>
      </div>

      <div className="pagination-buttons">
        <button
          className="pagination-arrow"
          disabled={currentPage === 1}
          onClick={() => changerPage(currentPage - 1)}
        >
          <Icon name="chevronLeft" size={17} />
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            className={`pagination-number ${
              currentPage === page ? "active" : ""
            }`}
            onClick={() => changerPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-arrow"
          disabled={currentPage === totalPages}
          onClick={() => changerPage(currentPage + 1)}
        >
          <Icon name="chevronRight" size={17} />
        </button>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("dashboard");
  const [menuOuvert, setMenuOuvert] = useState(false);
  function naviguerVers(nouvellePage) {
  setPage(nouvellePage);
  setMenuOuvert(false);
}

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const session = localStorage.getItem("gestion_employe_admin_session");
      return session ? JSON.parse(session) : null;
    } catch {
      localStorage.removeItem("gestion_employe_admin_session");
      return null;
    }
  });

  const [employes, setEmployes] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [postes, setPostes] = useState([]);

  const [rechercheEmploye, setRechercheEmploye] = useState("");
  const [rechercheDepartement, setRechercheDepartement] = useState("");
  const [recherchePoste, setRecherchePoste] = useState("");

  const [pageEmploye, setPageEmploye] = useState(1);
  const [pageDepartement, setPageDepartement] = useState(1);
  const [pagePoste, setPagePoste] = useState(1);

  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  const [editEmploye, setEditEmploye] = useState(null);
  const [editDepartement, setEditDepartement] = useState(null);
  const [editPoste, setEditPoste] = useState(null);

  const [formEmploye, setFormEmploye] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    sexe: "",
    date_naissance: "",
    telephone: "",
    email: "",
    adresse: "",
    date_embauche: "",
    id_departement: "",
    id_poste: ""
  });

  const [formDepartement, setFormDepartement] = useState({
    nom_departement: "",
    description: ""
  });

  const [formPoste, setFormPoste] = useState({
    nom_poste: "",
    description: ""
  });

  function handleLogin(user) {
    setCurrentUser(user);
  }

  function handleLogout() {
    localStorage.removeItem("gestion_employe_admin_session");
    setCurrentUser(null);
    setPage("dashboard");
  }

  useEffect(() => {
    if (currentUser) {
      chargerToutesLesDonnees();
    }
  }, [currentUser]);

  async function chargerToutesLesDonnees() {
    try {
      const [emp, dep, pos] = await Promise.all([
        fetch(`${API_URL}/employes/`),
        fetch(`${API_URL}/departements/`),
        fetch(`${API_URL}/postes/`)
      ]);

      if (!emp.ok || !dep.ok || !pos.ok) {
        throw new Error();
      }

      const empData = await emp.json();
      const depData = await dep.json();
      const posData = await pos.json();

      setEmployes(empData);
      setDepartements(depData);
      setPostes(posData);
    } catch {
      afficherErreur(
        "Impossible de récupérer les données. Vérifiez que Django est démarré."
      );
    }
  }

  function afficherMessage(texte) {
    setMessage(texte);
    setErreur("");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  function afficherErreur(texte) {
    setErreur(texte);
    setMessage("");

    setTimeout(() => {
      setErreur("");
    }, 5000);
  }

  function dateLocaleISO(date) {
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, "0");
    const jour = String(date.getDate()).padStart(2, "0");
    return `${annee}-${mois}-${jour}`;
  }

  function obtenirDateLimiteAge(dateBase, age) {
    const date = new Date(`${dateBase}T00:00:00`);
    date.setFullYear(date.getFullYear() + age);
    return dateLocaleISO(date);
  }

  function changerDateNaissance(e) {
    const valeur = e.target.value;
    setFormEmploye((ancien) => ({
      ...ancien,
      date_naissance: valeur
    }));
    setErreur("");
  }

  function changerDateEmbauche(e) {
    const valeur = e.target.value;
    setFormEmploye((ancien) => ({
      ...ancien,
      date_embauche: valeur
    }));
    setErreur("");
  }

  function changerEmploye(e) {
    const { name, value } = e.target;
    let valeurCorrigee = value;

    if (name === "nom" || name === "prenom") {
      valeurCorrigee = value.replace(
        /[^A-Za-zÀ-ÖØ-öø-ÿĀ-ž'’ -]/g,
        ""
      );
      valeurCorrigee =
        name === "nom"
          ? valeurCorrigee.toLocaleUpperCase("fr-FR")
          : valeurCorrigee.toLocaleLowerCase("fr-FR");
    }

    if (name === "telephone") {
      valeurCorrigee = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormEmploye((ancien) => ({
      ...ancien,
      [name]: valeurCorrigee
    }));
  }

  function nouveauEmploye() {
    setEditEmploye(null);

    setFormEmploye({
      matricule: "",
      nom: "",
      prenom: "",
      sexe: "",
      date_naissance: "",
      telephone: "",
      email: "",
      adresse: "",
      date_embauche: "",
      id_departement: "",
      id_poste: ""
    });
  }

  function modifierEmploye(employe) {
    setEditEmploye(employe);

    setFormEmploye({
      matricule: employe.matricule || "",
      nom: employe.nom || "",
      prenom: employe.prenom || "",
      sexe: employe.sexe || "",
      date_naissance: employe.date_naissance || "",
      telephone: employe.telephone || "",
      email: employe.email || "",
      adresse: employe.adresse || "",
      date_embauche: employe.date_embauche || "",
      id_departement: employe.id_departement || "",
      id_poste: employe.id_poste || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  async function enregistrerEmploye(e) {
    e.preventDefault();

    if (
      !formEmploye.matricule ||
      !formEmploye.nom ||
      !formEmploye.prenom ||
      !formEmploye.sexe ||
      !formEmploye.date_naissance ||
      !formEmploye.date_embauche ||
      !formEmploye.telephone ||
      !formEmploye.id_departement ||
      !formEmploye.id_poste
    ) {
      afficherErreur(
        "Veuillez remplir tous les champs obligatoires, y compris les dates."
      );
      return;
    }

    if (
      /[^A-Za-zÀ-ÖØ-öø-ÿĀ-ž'’ -]/.test(formEmploye.nom) ||
      /[^A-Za-zÀ-ÖØ-öø-ÿĀ-ž'’ -]/.test(formEmploye.prenom)
    ) {
      afficherErreur(
        "Le nom et le prénom doivent contenir uniquement des lettres."
      );
      return;
    }

    if (!/^\d{10}$/.test(formEmploye.telephone || "")) {
      afficherErreur(
        "Le numéro de téléphone doit contenir exactement 10 chiffres."
      );
      return;
    }

    const aujourdHui = new Date();
    aujourdHui.setHours(0, 0, 0, 0);

    const dateNaissance = new Date(
      `${formEmploye.date_naissance}T00:00:00`
    );
    const dateEmbauche = new Date(
      `${formEmploye.date_embauche}T00:00:00`
    );

    if (
      Number.isNaN(dateNaissance.getTime()) ||
      Number.isNaN(dateEmbauche.getTime())
    ) {
      afficherErreur("Veuillez saisir des dates valides.");
      return;
    }

    const dateLimite18Ans = new Date(
      aujourdHui.getFullYear() - 18,
      aujourdHui.getMonth(),
      aujourdHui.getDate()
    );

    if (dateNaissance > aujourdHui) {
      afficherErreur(
        "La date de naissance ne peut pas être dans le futur."
      );
      return;
    }

    if (dateNaissance > dateLimite18Ans) {
      afficherErreur("L'employé doit avoir au moins 18 ans.");
      return;
    }

    if (dateEmbauche > aujourdHui) {
      afficherErreur(
        "La date d'embauche ne peut pas être dans le futur."
      );
      return;
    }

    if (dateEmbauche < dateNaissance) {
      afficherErreur(
        "La date d'embauche ne peut pas être antérieure à la date de naissance."
      );
      return;
    }

    const dateLimite18AnsEmbauche = new Date(
      dateEmbauche.getFullYear() - 18,
      dateEmbauche.getMonth(),
      dateEmbauche.getDate()
    );

    if (dateNaissance > dateLimite18AnsEmbauche) {
      afficherErreur(
        "L'employé devait avoir au moins 18 ans à la date d'embauche."
      );
      return;
    }

    try {
      const url = editEmploye
        ? `${API_URL}/employes/${editEmploye.id_employe}/`
        : `${API_URL}/employes/`;

      const response = await fetch(url, {
        method: editEmploye ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formEmploye)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.erreur || "Erreur lors de l'enregistrement."
        );
      }

      await chargerToutesLesDonnees();

      afficherMessage(
        editEmploye
          ? "Employé modifié avec succès."
          : "Employé ajouté avec succès."
      );

      nouveauEmploye();
    } catch (error) {
      afficherErreur(error.message);
    }
  }

  async function supprimerEmploye(id) {
    if (
      !window.confirm(
        "Voulez-vous vraiment supprimer cet employé ?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/employes/${id}/`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.erreur || "Erreur de suppression.");
      }

      await chargerToutesLesDonnees();
      afficherMessage("Employé supprimé avec succès.");
    } catch (error) {
      afficherErreur(error.message);
    }
  }

  function changerDepartement(e) {
    setFormDepartement({
      ...formDepartement,
      [e.target.name]: e.target.value
    });
  }

  function nouveauDepartement() {
    setEditDepartement(null);
    setFormDepartement({
      nom_departement: "",
      description: ""
    });
  }

  function modifierDepartement(departement) {
    setEditDepartement(departement);

    setFormDepartement({
      nom_departement: departement.nom_departement || "",
      description: departement.description || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  async function enregistrerDepartement(e) {
    e.preventDefault();

    if (!formDepartement.nom_departement) {
      afficherErreur("Le nom du département est obligatoire.");
      return;
    }

    try {
      const url = editDepartement
        ? `${API_URL}/departements/${editDepartement.id_departement}/`
        : `${API_URL}/departements/`;

      const response = await fetch(url, {
        method: editDepartement ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formDepartement)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.erreur || "Erreur lors de l'enregistrement."
        );
      }

      await chargerToutesLesDonnees();

      afficherMessage(
        editDepartement
          ? "Département modifié avec succès."
          : "Département ajouté avec succès."
      );

      nouveauDepartement();
    } catch (error) {
      afficherErreur(error.message);
    }
  }

  async function supprimerDepartement(id) {
    if (
      !window.confirm(
        "Voulez-vous vraiment supprimer ce département ?\n\nLes employés liés peuvent également être supprimés."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/departements/${id}/`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erreur || "Erreur de suppression.");
      }

      await chargerToutesLesDonnees();
      afficherMessage("Département supprimé avec succès.");
    } catch (error) {
      afficherErreur(error.message);
    }
  }

  function changerPoste(e) {
    setFormPoste({
      ...formPoste,
      [e.target.name]: e.target.value
    });
  }

  function nouveauPoste() {
    setEditPoste(null);
    setFormPoste({
      nom_poste: "",
      description: ""
    });
  }

  function modifierPoste(poste) {
    setEditPoste(poste);

    setFormPoste({
      nom_poste: poste.nom_poste || "",
      description: poste.description || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  async function enregistrerPoste(e) {
    e.preventDefault();

    if (!formPoste.nom_poste) {
      afficherErreur("Le nom du poste est obligatoire.");
      return;
    }

    try {
      const url = editPoste
        ? `${API_URL}/postes/${editPoste.id_poste}/`
        : `${API_URL}/postes/`;

      const response = await fetch(url, {
        method: editPoste ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formPoste)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.erreur || "Erreur lors de l'enregistrement."
        );
      }

      await chargerToutesLesDonnees();

      afficherMessage(
        editPoste
          ? "Poste modifié avec succès."
          : "Poste ajouté avec succès."
      );

      nouveauPoste();
    } catch (error) {
      afficherErreur(error.message);
    }
  }

  async function supprimerPoste(id) {
    if (
      !window.confirm(
        "Voulez-vous vraiment supprimer ce poste ?\n\nLes employés liés peuvent également être supprimés."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/postes/${id}/`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erreur || "Erreur de suppression.");
      }

      await chargerToutesLesDonnees();
      afficherMessage("Poste supprimé avec succès.");
    } catch (error) {
      afficherErreur(error.message);
    }
  }

  const employesFiltres = employes.filter((employe) => {
    const recherche = rechercheEmploye.toLowerCase();

    return (
      employe.matricule?.toLowerCase().includes(recherche) ||
      employe.nom?.toLowerCase().includes(recherche) ||
      employe.prenom?.toLowerCase().includes(recherche) ||
      employe.email?.toLowerCase().includes(recherche) ||
      employe.telephone?.toLowerCase().includes(recherche)
    );
  });

  const departementsFiltres = departements.filter((departement) => {
    const recherche = rechercheDepartement.toLowerCase();

    return (
      departement.nom_departement?.toLowerCase().includes(recherche) ||
      departement.description?.toLowerCase().includes(recherche)
    );
  });

  const postesFiltres = postes.filter((poste) => {
    const recherche = recherchePoste.toLowerCase();

    return (
      poste.nom_poste?.toLowerCase().includes(recherche) ||
      poste.description?.toLowerCase().includes(recherche)
    );
  });

  const employesPage = employesFiltres.slice(
    (pageEmploye - 1) * ITEMS_PER_PAGE,
    pageEmploye * ITEMS_PER_PAGE
  );

  const departementsPage = departementsFiltres.slice(
    (pageDepartement - 1) * ITEMS_PER_PAGE,
    pageDepartement * ITEMS_PER_PAGE
  );

  const postesPage = postesFiltres.slice(
    (pagePoste - 1) * ITEMS_PER_PAGE,
    pagePoste * ITEMS_PER_PAGE
  );

  function changerRechercheEmploye(e) {
    setRechercheEmploye(e.target.value);
    setPageEmploye(1);
  }

  function changerRechercheDepartement(e) {
    setRechercheDepartement(e.target.value);
    setPageDepartement(1);
  }

  function changerRecherchePoste(e) {
    setRecherchePoste(e.target.value);
    setPagePoste(1);
  }

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="application">
      <aside className={`sidebar ${menuOuvert ? "sidebar-open" : ""}`}>
        <div
          className="brand"
          style={{
            padding: "0 22px",
            display: "flex",
            alignItems: "center"
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "800",
              lineHeight: "1.15",
              letterSpacing: "-0.3px"
            }}
          >
            GESTION
            <span
              style={{
                display: "block",
                color: "#93c5fd",
                fontSize: "14px",
                marginTop: "3px",
                letterSpacing: "0.5px"
              }}
            >
              EMPLOYÉ
            </span>
          </div>
        </div>

        <div className="sidebar-section-title">MENU PRINCIPAL</div>

        
<nav className="menu">
  <button
    type="button"
    className={`menu-item ${page === "dashboard" ? "active" : ""}`}
    onClick={() => naviguerVers("dashboard")}
  >
    <Icon name="dashboard" size={19} />
    <span>Tableau de bord</span>
  </button>

  <button
    type="button"
    className={`menu-item ${page === "employes" ? "active" : ""}`}
    onClick={() => naviguerVers("employes")}
  >
    <Icon name="users" size={19} />
    <span>Employés</span>
  </button>

  <button
    type="button"
    className={`menu-item ${page === "departements" ? "active" : ""}`}
    onClick={() => naviguerVers("departements")}
  >
    <Icon name="building" size={19} />
    <span>Départements</span>
  </button>

  <button
    type="button"
    className={`menu-item ${page === "postes" ? "active" : ""}`}
    onClick={() => naviguerVers("postes")}
  >
    <Icon name="briefcase" size={19} />
    <span>Postes</span>
  </button>

  <button
    type="button"
    className={`menu-item ${page === "about" ? "active" : ""}`}
    onClick={() => naviguerVers("about")}
  >
    <Icon name="building" size={19} />
    <span>À propos</span>
  </button>
</nav>


        <div className="sidebar-bottom">
          <div className="sidebar-user-icon">
            <Icon name="usersSmall" size={17} />
          </div>

          <div>
            <strong>{currentUser?.email || "Administrateur"}</strong>
            <small>Administrateur</small>
          </div>
        </div>
      </aside>
      {menuOuvert && (
  <button
    type="button"
    className="sidebar-overlay"
    aria-label="Fermer le menu"
    onClick={() => setMenuOuvert(false)}
  />
)}

      <main className="main-content">
        <header className="topbar">
           <button
    type="button"
    className="hamburger-button"
    aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
    aria-expanded={menuOuvert}
    onClick={() => setMenuOuvert((ouvert) => !ouvert)}
  >
    {menuOuvert ? (
      <Icon name="close" size={24} />
    ) : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
    )}
  </button>

          <div>
            <div className="breadcrumb">
              Gestion des employés
              <span>/</span>
              {page === "dashboard"
                ? "Tableau de bord"
                : page === "employes"
                  ? "Employés"
                  : page === "departements"
                    ? "Départements"
                    : page === "postes"
                      ? "Postes"
                      : "À propos"}
            </div>

            <h1>
              {page === "dashboard"
                ? "Tableau de bord"
                : page === "employes"
                  ? "Gestion des employés"
                  : page === "departements"
                    ? "Gestion des départements"
                    : page === "postes"
                      ? "Gestion des postes"
                      : "À propos du projet"}
            </h1>

            <p>Administration du personnel</p>
          </div>

          <div className="topbar-right">
            <div className="online-status">
              <span></span>
              Système opérationnel
            </div>

            <div className="profile">
              <div className="profile-avatar">
                {currentUser?.email?.charAt(0).toUpperCase() || "A"}
              </div>

              <div>
                <strong>{currentUser?.email || "Administrateur"}</strong>
                <small>Administrateur</small>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                border: "1px solid #fecaca",
                background: "#ffffff",
                color: "#dc2626",
                padding: "9px 14px",
                borderRadius: "9px",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fef2f2";
                e.currentTarget.style.borderColor = "#fca5a5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.borderColor = "#fecaca";
              }}
            >
              Déconnexion
            </button>
          </div>
        </header>

        <section className="content">
          {message && (
            <div className="message success">
              <Icon name="check" size={18} />
              <span>{message}</span>
            </div>
          )}

          {erreur && (
            <div className="message error">
              <span>!</span>
              <span>{erreur}</span>
            </div>
          )}

          {page === "dashboard" && (
            <div>
              <div className="welcome-card">
                <div>
                  <span className="welcome-label">BIENVENUE</span>
                  <h2>Tableau de bord</h2>
                  <p>
                    Gérez facilement les employés, les départements et les
                    postes de votre entreprise.
                  </p>
                </div>

                <div className="welcome-icon">
                  <Icon name="dashboard" size={44} />
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon blue">
                    <Icon name="users" size={25} />
                  </div>

                  <div className="stat-info">
                    <span>TOTAL EMPLOYÉS</span>
                    <strong>{employes.length}</strong>
                    <small>Personnel enregistré</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon purple">
                    <Icon name="building" size={25} />
                  </div>

                  <div className="stat-info">
                    <span>DÉPARTEMENTS</span>
                    <strong>{departements.length}</strong>
                    <small>Départements actifs</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon orange">
                    <Icon name="briefcase" size={25} />
                  </div>

                  <div className="stat-info">
                    <span>POSTES</span>
                    <strong>{postes.length}</strong>
                    <small>Postes disponibles</small>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="dashboard-panel">
                  <div className="panel-header">
                    <div>
                      <h3>Accès rapide</h3>
                      <p>Accéder rapidement aux fonctionnalités</p>
                    </div>
                  </div>

                  <div className="quick-actions">
                    <button
                      onClick={() => {
                        setPage("employes");
                        nouveauEmploye();
                      }}
                    >
                      <div className="quick-icon blue">
                        <Icon name="plus" size={20} />
                      </div>

                      <div>
                        <strong>Ajouter un employé</strong>
                        <span>Enregistrer un nouveau salarié</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setPage("departements");
                        nouveauDepartement();
                      }}
                    >
                      <div className="quick-icon purple">
                        <Icon name="building" size={20} />
                      </div>

                      <div>
                        <strong>Gérer les départements</strong>
                        <span>Organiser les services</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setPage("postes");
                        nouveauPoste();
                      }}
                    >
                      <div className="quick-icon orange">
                        <Icon name="briefcase" size={20} />
                      </div>

                      <div>
                        <strong>Gérer les postes</strong>
                        <span>Administrer les fonctions</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="dashboard-panel">
                  <div className="panel-header">
                    <div>
                      <h3>Résumé</h3>
                      <p>État actuel des données</p>
                    </div>
                  </div>

                  <div className="summary-list">
                    <div>
                      <span>
                        <Icon name="users" size={17} />
                        Employés
                      </span>
                      <strong>{employes.length}</strong>
                    </div>

                    <div>
                      <span>
                        <Icon name="building" size={17} />
                        Départements
                      </span>
                      <strong>{departements.length}</strong>
                    </div>

                    <div>
                      <span>
                        <Icon name="briefcase" size={17} />
                        Postes
                      </span>
                      <strong>{postes.length}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {page === "employes" && (
            <div>
              <div className="page-title-row">
                <div>
                  <div className="section-label">PERSONNEL</div>
                  <h2>Employés</h2>
                  <p>Gérez les informations du personnel</p>
                </div>

                <button
                  className="primary-button"
                  onClick={nouveauEmploye}
                >
                  <Icon name="plus" size={18} />
                  Nouvel employé
                </button>
              </div>

              <div className="form-card">
                <div className="form-card-header">
                  <div className="form-card-title-icon blue">
                    <Icon name="users" size={21} />
                  </div>

                  <div>
                    <h3>
                      {editEmploye
                        ? "Modifier l'employé"
                        : "Ajouter un employé"}
                    </h3>
                    <p>Les champs avec * sont obligatoires</p>
                  </div>
                </div>

                <form onSubmit={enregistrerEmploye}>
                  <div className="form-section-title">
                    Informations personnelles
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Matricule *</label>
                      <input
                        name="matricule"
                        value={formEmploye.matricule}
                        onChange={changerEmploye}
                        placeholder="EMP001"
                      />
                    </div>

                    <div className="form-group">
                      <label>Nom *</label>
                      <input
                        name="nom"
                        value={formEmploye.nom}
                        onChange={changerEmploye}
                        placeholder="Nom"
                        required
                        autoComplete="family-name"
                      />
                    </div>

                    <div className="form-group">
                      <label>Prénom *</label>
                      <input
                        name="prenom"
                        value={formEmploye.prenom}
                        onChange={changerEmploye}
                        placeholder="Prénom"
                        required
                        autoComplete="given-name"
                      />
                    </div>

                    <div className="form-group">
                      <label>Sexe *</label>
                      <select
                        name="sexe"
                        value={formEmploye.sexe}
                        onChange={changerEmploye}
                        required
                      >
                        <option value="">Sélectionner</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                      </select>
                    </div>

                    <DateFields
                      label="Date de naissance *"
                      name="date_naissance"
                      value={formEmploye.date_naissance}
                      onChange={changerDateNaissance}
                      startYear={1900}
                    />

                    <div className="form-group">
                      <label>Téléphone *</label>
                      <div className="input-icon">
                        <Icon name="phone" size={17} />
                        <input
                          type="tel"
                          name="telephone"
                          value={formEmploye.telephone}
                          onChange={changerEmploye}
                          placeholder="0340000000"
                          inputMode="numeric"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          title="Le numéro de téléphone doit contenir exactement 10 chiffres."
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <div className="input-icon">
                        <Icon name="mail" size={17} />
                        <input
                          type="email"
                          name="email"
                          value={formEmploye.email}
                          onChange={changerEmploye}
                          placeholder="email@entreprise.com"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Adresse</label>
                      <div className="input-icon">
                        <Icon name="location" size={17} />
                        <input
                          name="adresse"
                          value={formEmploye.adresse}
                          onChange={changerEmploye}
                          placeholder="Adresse"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section-title">
                    Informations professionnelles
                  </div>

                  <div className="form-grid">
                    <DateFields
                      label="Date d'embauche *"
                      name="date_embauche"
                      value={formEmploye.date_embauche}
                      onChange={changerDateEmbauche}
                      startYear={1950}
                    />

                    <div className="form-group">
                      <label>Département *</label>
                      <select
                        name="id_departement"
                        value={formEmploye.id_departement}
                        onChange={changerEmploye}
                        required
                      >
                        <option value="">
                          Sélectionner un département
                        </option>

                        {departements.map((departement) => (
                          <option
                            key={departement.id_departement}
                            value={departement.id_departement}
                          >
                            {departement.nom_departement}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Poste *</label>
                      <select
                        name="id_poste"
                        value={formEmploye.id_poste}
                        onChange={changerEmploye}
                        required
                      >
                        <option value="">Sélectionner un poste</option>

                        {postes.map((poste) => (
                          <option
                            key={poste.id_poste}
                            value={poste.id_poste}
                          >
                            {poste.nom_poste}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="primary-button"
                    >
                      <Icon name="save" size={17} />
                      {editEmploye
                        ? "Enregistrer les modifications"
                        : "Ajouter l'employé"}
                    </button>

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={nouveauEmploye}
                    >
                      <Icon name="close" size={17} />
                      Annuler
                    </button>
                  </div>
                </form>
              </div>

              <div className="table-card">
                <div className="table-top">
                  <div>
                    <h3>Liste des employés</h3>
                    <p>
                      {employesFiltres.length} employé(s) enregistré(s)
                    </p>
                  </div>

                  <div className="search-box">
                    <Icon name="search" size={18} />
                    <input
                      value={rechercheEmploye}
                      onChange={changerRechercheEmploye}
                      placeholder="Rechercher..."
                    />
                  </div>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>MATRICULE</th>
                        <th>EMPLOYÉ</th>
                        <th>SEXE</th>
                        <th>TÉLÉPHONE</th>
                        <th>DÉPARTEMENT</th>
                        <th>POSTE</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>

                    <tbody>
                      {employesPage.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="empty-table">
                            Aucun employé trouvé.
                          </td>
                        </tr>
                      ) : (
                        employesPage.map((employe) => (
                          <tr key={employe.id_employe}>
                            <td>
                              <span className="id-badge">
                                #{employe.id_employe}
                              </span>
                            </td>

                            <td>
                              <strong>{employe.matricule}</strong>
                            </td>

                            <td>
                              <div className="employee-cell">
                                <div className="employee-avatar">
                                  {employe.nom?.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                  <strong>
                                    {employe.nom} {employe.prenom}
                                  </strong>
                                  <small>
                                    {employe.email || "Aucun email"}
                                  </small>
                                </div>
                              </div>
                            </td>

                            <td>
                              <span className="badge">{employe.sexe}</span>
                            </td>

                            <td>{employe.telephone || "-"}</td>

                            <td>
                              <span className="department-tag">
                                {employe.nom_departement || "-"}
                              </span>
                            </td>

                            <td>{employe.nom_poste || "-"}</td>

                            <td>
                              <div className="table-actions">
                                <button
                                  className="icon-button edit"
                                  title="Modifier"
                                  onClick={() => modifierEmploye(employe)}
                                >
                                  <Icon name="edit" size={16} />
                                </button>

                                <button
                                  className="icon-button delete"
                                  title="Supprimer"
                                  onClick={() =>
                                    supprimerEmploye(employe.id_employe)
                                  }
                                >
                                  <Icon name="trash" size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  totalItems={employesFiltres.length}
                  currentPage={pageEmploye}
                  setCurrentPage={setPageEmploye}
                />
              </div>
            </div>
          )}

          {page === "departements" && (
            <div>
              <div className="page-title-row">
                <div>
                  <div className="section-label">ORGANISATION</div>
                  <h2>Départements</h2>
                  <p>
                    Organisez les différents services de l'entreprise
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={nouveauDepartement}
                >
                  <Icon name="plus" size={18} />
                  Nouveau département
                </button>
              </div>

              <div className="form-card compact">
                <div className="form-card-header">
                  <div className="form-card-title-icon purple">
                    <Icon name="building" size={21} />
                  </div>

                  <div>
                    <h3>
                      {editDepartement
                        ? "Modifier le département"
                        : "Ajouter un département"}
                    </h3>
                    <p>Informations du département</p>
                  </div>
                </div>

                <form onSubmit={enregistrerDepartement}>
                  <div className="form-grid two">
                    <div className="form-group">
                      <label>Nom du département *</label>
                      <input
                        name="nom_departement"
                        value={formDepartement.nom_departement}
                        onChange={changerDepartement}
                        placeholder="Ex : Informatique"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <input
                        name="description"
                        value={formDepartement.description}
                        onChange={changerDepartement}
                        placeholder="Description du département"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="primary-button">
                      <Icon name="save" size={17} />
                      {editDepartement ? "Enregistrer" : "Ajouter"}
                    </button>

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={nouveauDepartement}
                    >
                      <Icon name="close" size={17} />
                      Annuler
                    </button>
                  </div>
                </form>
              </div>

              <div className="table-card">
                <div className="table-top">
                  <div>
                    <h3>Liste des départements</h3>
                    <p>{departementsFiltres.length} département(s)</p>
                  </div>

                  <div className="search-box">
                    <Icon name="search" size={18} />
                    <input
                      value={rechercheDepartement}
                      onChange={changerRechercheDepartement}
                      placeholder="Rechercher..."
                    />
                  </div>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>DÉPARTEMENT</th>
                        <th>DESCRIPTION</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>

                    <tbody>
                      {departementsPage.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="empty-table">
                            Aucun département trouvé.
                          </td>
                        </tr>
                      ) : (
                        departementsPage.map((departement) => (
                          <tr key={departement.id_departement}>
                            <td>
                              <span className="id-badge">
                                #{departement.id_departement}
                              </span>
                            </td>

                            <td>
                              <div className="name-cell">
                                <div className="mini-icon purple">
                                  <Icon name="building" size={17} />
                                </div>
                                <strong>
                                  {departement.nom_departement}
                                </strong>
                              </div>
                            </td>

                            <td>{departement.description || "-"}</td>

                            <td>
                              <div className="table-actions">
                                <button
                                  className="icon-button edit"
                                  title="Modifier"
                                  onClick={() =>
                                    modifierDepartement(departement)
                                  }
                                >
                                  <Icon name="edit" size={16} />
                                </button>

                                <button
                                  className="icon-button delete"
                                  title="Supprimer"
                                  onClick={() =>
                                    supprimerDepartement(
                                      departement.id_departement
                                    )
                                  }
                                >
                                  <Icon name="trash" size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  totalItems={departementsFiltres.length}
                  currentPage={pageDepartement}
                  setCurrentPage={setPageDepartement}
                />
              </div>
            </div>
          )}

          {page === "postes" && (
            <div>
              <div className="page-title-row">
                <div>
                  <div className="section-label">ORGANISATION</div>
                  <h2>Postes</h2>
                  <p>
                    Gérez les fonctions disponibles dans l'entreprise
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={nouveauPoste}
                >
                  <Icon name="plus" size={18} />
                  Nouveau poste
                </button>
              </div>

              <div className="form-card compact">
                <div className="form-card-header">
                  <div className="form-card-title-icon orange">
                    <Icon name="briefcase" size={21} />
                  </div>

                  <div>
                    <h3>
                      {editPoste ? "Modifier le poste" : "Ajouter un poste"}
                    </h3>
                    <p>Informations du poste</p>
                  </div>
                </div>

                <form onSubmit={enregistrerPoste}>
                  <div className="form-grid two">
                    <div className="form-group">
                      <label>Nom du poste *</label>
                      <input
                        name="nom_poste"
                        value={formPoste.nom_poste}
                        onChange={changerPoste}
                        placeholder="Ex : Développeur Web"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <input
                        name="description"
                        value={formPoste.description}
                        onChange={changerPoste}
                        placeholder="Description du poste"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="primary-button">
                      <Icon name="save" size={17} />
                      {editPoste ? "Enregistrer" : "Ajouter"}
                    </button>

                    <button
                      type="button"
                      className="secondary-button"
                      onClick={nouveauPoste}
                    >
                      <Icon name="close" size={17} />
                      Annuler
                    </button>
                  </div>
                </form>
              </div>

              <div className="table-card">
                <div className="table-top">
                  <div>
                    <h3>Liste des postes</h3>
                    <p>{postesFiltres.length} poste(s)</p>
                  </div>

                  <div className="search-box">
                    <Icon name="search" size={18} />
                    <input
                      value={recherchePoste}
                      onChange={changerRecherchePoste}
                      placeholder="Rechercher..."
                    />
                  </div>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>POSTE</th>
                        <th>DESCRIPTION</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>

                    <tbody>
                      {postesPage.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="empty-table">
                            Aucun poste trouvé.
                          </td>
                        </tr>
                      ) : (
                        postesPage.map((poste) => (
                          <tr key={poste.id_poste}>
                            <td>
                              <span className="id-badge">
                                #{poste.id_poste}
                              </span>
                            </td>

                            <td>
                              <div className="name-cell">
                                <div className="mini-icon orange">
                                  <Icon name="briefcase" size={17} />
                                </div>
                                <strong>{poste.nom_poste}</strong>
                              </div>
                            </td>

                            <td>{poste.description || "-"}</td>

                            <td>
                              <div className="table-actions">
                                <button
                                  className="icon-button edit"
                                  title="Modifier"
                                  onClick={() => modifierPoste(poste)}
                                >
                                  <Icon name="edit" size={16} />
                                </button>

                                <button
                                  className="icon-button delete"
                                  title="Supprimer"
                                  onClick={() =>
                                    supprimerPoste(poste.id_poste)
                                  }
                                >
                                  <Icon name="trash" size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  totalItems={postesFiltres.length}
                  currentPage={pagePoste}
                  setCurrentPage={setPagePoste}
                />
              </div>
            </div>
          )}

          {page === "about" && (
            <div className="about-page" style={{ paddingBottom: 28 }}>
              <div
                className="page-title-row"
                style={{ marginBottom: 18 }}
              >
                <div>
                  <div className="section-label">PRÉSENTATION</div>
                  <h2>Modèle physique de données (MPD)</h2>
                  <p>
                    Gestion des employés — tables, clés et relations de la
                    base de données.
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 14,
                  padding: 18,
                  boxShadow: "0 4px 14px rgba(15,23,42,0.04)"
                }}
              >
                <div style={{ overflowX: "auto", paddingBottom: 8 }}>
                  <div
                    style={{
                      position: "relative",
                      width: 1050,
                      minHeight: 565,
                      margin: "0 auto"
                    }}
                  >
                    <svg
                      aria-label="Relations entre les tables"
                      viewBox="0 0 1050 565"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                        overflow: "visible",
                        pointerEvents: "none"
                      }}
                    >
                      <line
                        x1="270"
                        y1="220"
                        x2="365"
                        y2="220"
                        stroke="#334155"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="685"
                        y1="220"
                        x2="780"
                        y2="220"
                        stroke="#334155"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="270" cy="220" r="3.5" fill="#334155" />
                      <circle cx="365" cy="220" r="3.5" fill="#334155" />
                      <circle cx="685" cy="220" r="3.5" fill="#334155" />
                      <circle cx="780" cy="220" r="3.5" fill="#334155" />
                    </svg>

                    <div
                      style={{
                        position: "absolute",
                        left: 285,
                        top: 192,
                        zIndex: 3,
                        padding: "3px 7px",
                        borderRadius: 5,
                        background: "#fff",
                        color: "#334155",
                        fontSize: 13,
                        fontWeight: 700
                      }}
                    >
                      1
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        left: 340,
                        top: 192,
                        zIndex: 3,
                        padding: "3px 7px",
                        borderRadius: 5,
                        background: "#fff",
                        color: "#334155",
                        fontSize: 13,
                        fontWeight: 700
                      }}
                    >
                      N
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        left: 700,
                        top: 192,
                        zIndex: 3,
                        padding: "3px 7px",
                        borderRadius: 5,
                        background: "#fff",
                        color: "#334155",
                        fontSize: 13,
                        fontWeight: 700
                      }}
                    >
                      N
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        left: 755,
                        top: 192,
                        zIndex: 3,
                        padding: "3px 7px",
                        borderRadius: 5,
                        background: "#fff",
                        color: "#334155",
                        fontSize: 13,
                        fontWeight: 700
                      }}
                    >
                      1
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        left: 20,
                        top: 120,
                        width: 250,
                        zIndex: 2,
                        border: "1px solid #cbd5e1",
                        borderRadius: 9,
                        background: "#fff",
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(15,23,42,.06)"
                      }}
                    >
                      <div
                        style={{
                          background: "#1d4ed8",
                          color: "#fff",
                          padding: "13px 15px",
                          fontWeight: 800,
                          letterSpacing: ".5px",
                          textAlign: "center"
                        }}
                      >
                        DEPARTEMENT
                      </div>

                      {[["PK", "id_departement"], ["", "nom_departement"], ["", "description"]].map(
                        ([key, field]) => (
                          <div
                            key={field}
                            style={{
                              display: "flex",
                              gap: 10,
                              padding: "11px 13px",
                              borderTop: "1px solid #e5e7eb",
                              fontSize: 13
                            }}
                          >
                            <span
                              style={{
                                minWidth: 25,
                                color: key === "PK" ? "#1d4ed8" : "#64748b",
                                fontWeight: 800
                              }}
                            >
                              {key}
                            </span>
                            <span style={{ color: "#1f2937" }}>{field}</span>
                          </div>
                        )
                      )}
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        left: 365,
                        top: 35,
                        width: 320,
                        zIndex: 2,
                        border: "1px solid #cbd5e1",
                        borderRadius: 9,
                        background: "#fff",
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(15,23,42,.06)"
                      }}
                    >
                      <div
                        style={{
                          background: "#0f766e",
                          color: "#fff",
                          padding: "13px 15px",
                          fontWeight: 800,
                          letterSpacing: ".5px",
                          textAlign: "center"
                        }}
                      >
                        EMPLOYE
                      </div>

                      {[
                        ["PK", "id_employe"],
                        ["", "matricule"],
                        ["", "nom"],
                        ["", "prenom"],
                        ["", "sexe"],
                        ["", "date_naissance"],
                        ["", "telephone"],
                        ["", "email"],
                        ["", "adresse"],
                        ["", "date_embauche"],
                        ["FK", "id_departement"],
                        ["FK", "id_poste"]
                      ].map(([key, field]) => (
                        <div
                          key={field}
                          style={{
                            display: "flex",
                            gap: 10,
                            padding: "7px 13px",
                            borderTop: "1px solid #e5e7eb",
                            fontSize: 12.5
                          }}
                        >
                          <span
                            style={{
                              minWidth: 25,
                              color:
                                key === "PK"
                                  ? "#0f766e"
                                  : key === "FK"
                                    ? "#b45309"
                                    : "#64748b",
                              fontWeight: 800
                            }}
                          >
                            {key}
                          </span>
                          <span style={{ color: "#1f2937" }}>{field}</span>
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        left: 780,
                        top: 120,
                        width: 250,
                        zIndex: 2,
                        border: "1px solid #cbd5e1",
                        borderRadius: 9,
                        background: "#fff",
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(15,23,42,.06)"
                      }}
                    >
                      <div
                        style={{
                          background: "#c2410c",
                          color: "#fff",
                          padding: "13px 15px",
                          fontWeight: 800,
                          letterSpacing: ".5px",
                          textAlign: "center"
                        }}
                      >
                        POSTE
                      </div>

                      {[["PK", "id_poste"], ["", "nom_poste"], ["", "description"]].map(
                        ([key, field]) => (
                          <div
                            key={field}
                            style={{
                              display: "flex",
                              gap: 10,
                              padding: "11px 13px",
                              borderTop: "1px solid #e5e7eb",
                              fontSize: 13
                            }}
                          >
                            <span
                              style={{
                                minWidth: 25,
                                color: key === "PK" ? "#c2410c" : "#64748b",
                                fontWeight: 800
                              }}
                            >
                              {key}
                            </span>
                            <span style={{ color: "#1f2937" }}>{field}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 18,
                    marginTop: 12,
                    padding: "12px 14px",
                    background: "#f8fafc",
                    borderRadius: 8,
                    color: "#475569",
                    fontSize: 13
                  }}
                >
                  <span>
                    <strong style={{ color: "#1d4ed8" }}>PK</strong> : clé
                    primaire
                  </span>
                  <span>
                    <strong style={{ color: "#b45309" }}>FK</strong> : clé
                    étrangère
                  </span>
                  <span>
                    <strong>1 — N</strong> : un département ou poste peut
                    concerner plusieurs employés
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 16,
                    padding: 14,
                    border: "1px solid #dbeafe",
                    background: "#eff6ff",
                    borderRadius: 8,
                    color: "#1e3a8a",
                    fontSize: 13,
                    lineHeight: 1.7
                  }}
                >
                  <strong>Relations :</strong>
                  <br />
                  DEPARTEMENT (1) — EMPLOYE (N) : la clé étrangère{" "}
                  <code>id_departement</code> se trouve dans la table EMPLOYE.
                  <br />
                  POSTE (1) — EMPLOYE (N) : la clé étrangère{" "}
                  <code>id_poste</code> se trouve dans la table EMPLOYE.
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;