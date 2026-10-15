import { useState } from "react";

const ADMIN_USERNAME = "MAHOLY";
const ADMIN_PASSWORD = "harimalala";
const SESSION_KEY = "gestion_employe_admin_session";

export default function Auth({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  function seConnecter(e) {
    e.preventDefault();
    setErreur("");

    if (!username || !password) {
      setErreur(
        "Veuillez saisir votre nom d'utilisateur et votre mot de passe."
      );
      return;
    }

    if (
      username.trim() !== ADMIN_USERNAME ||
      password !== ADMIN_PASSWORD
    ) {
      setErreur("Nom d'utilisateur ou mot de passe incorrect.");
      return;
    }

    setChargement(true);

    const administrateur = {
      username: ADMIN_USERNAME,
      role: "admin"
    };

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(administrateur)
    );

    onLogin(administrateur);

    setChargement(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#f4f7fb",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "36px",
          boxShadow: "0 15px 45px rgba(15, 23, 42, 0.10)",
          border: "1px solid #e5e7eb"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "58px",
              height: "58px",
              margin: "0 auto 16px",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#1d4ed8",
              color: "#ffffff"
            }}
          >
            <svg
              width="31"
              height="31"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="7" width="18" height="14" rx="2" />
              <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M3 12h18M10 12v2h4v-2" />
            </svg>
          </div>

          <h1
            style={{
              margin: 0,
              color: "#111827",
              fontSize: "25px",
              fontWeight: "800"
            }}
          >
            GESTION EMPLOYÉ
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#6b7280",
              fontSize: "14px"
            }}
          >
            Connexion administrateur
          </p>
        </div>

        {erreur && (
          <div
            role="alert"
            style={{
              marginBottom: "18px",
              padding: "12px 14px",
              borderRadius: "9px",
              background: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
              fontSize: "13px",
              lineHeight: 1.4
            }}
          >
            {erreur}
          </div>
        )}

        <form onSubmit={seConnecter}>
          <label
            htmlFor="username"
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "700"
            }}
          >
            Identifiant
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Identifiant"
            autoComplete="username"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px 14px",
              marginBottom: "18px",
              border: "1px solid #d1d5db",
              borderRadius: "9px",
              outline: "none",
              fontSize: "14px"
            }}
          />

          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "700"
            }}
          >
            Mot de passe
          </label>

          <div style={{ position: "relative", marginBottom: "22px" }}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              autoComplete="current-password"
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 48px 13px 14px",
                border: "1px solid #d1d5db",
                borderRadius: "9px",
                outline: "none",
                fontSize: "14px"
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
              title={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280"
              }}
            >
              {showPassword ? (
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 3l18 18" />
                  <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                  <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.2 0 8.7 4.5 9.7 6.2a1.5 1.5 0 0 1 0 1.6 15.7 15.7 0 0 1-3.1 3.5" />
                  <path d="M6.2 6.2a16.1 16.1 0 0 0-3.9 5 1.5 1.5 0 0 0 0 1.6C3.3 14.5 6.8 19 12 19a10 10 0 0 0 3-.5" />
                </svg>
              ) : (
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={chargement}
            style={{
              width: "100%",
              border: "none",
              borderRadius: "9px",
              padding: "13px 16px",
              background: chargement ? "#93c5fd" : "#1d4ed8",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "700",
              cursor: chargement ? "not-allowed" : "pointer"
            }}
          >
            {chargement ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div
          style={{
            marginTop: "22px",
            paddingTop: "18px",
            borderTop: "1px solid #eef0f3",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "12px"
          }}
        >
          Accès réservé à l'administrateur.
        </div>
      </div>
    </div>
  );
}