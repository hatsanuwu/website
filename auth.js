import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

// ── Instancia de auth (se inicializa con la app de Firebase) ──────────────────
let auth = null;


export function initAuth(app) {
    auth = getAuth(app);
}

// ── Login con Google ──────────────────────────────────────────────────────────
export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
}

// ── Cerrar sesión ─────────────────────────────────────────────────────────────

export async function logOut() {
    return await signOut(auth);
}

// ── Obtener usuario actual ────────────────────────────────────────────────────

export function getCurrentUser() {
    return auth ? auth.currentUser : null;
}

// ── Observador de estado ──────────────────────────────────────────────────────

export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

// ── Helpers de UI ─────────────────────────────────────────────────────────────

export function updateAuthUI(user) {
    const userMenu    = document.getElementById('user-menu');
    const nameInput   = document.getElementById('name');
    const emailInput  = document.getElementById('email');
    const formLocked  = document.getElementById('form-login-wall');
    const formContent = document.getElementById('form-content');

    if (user) {
        // Header: mostrar botón logout
        if (userMenu) userMenu.style.display = 'flex';

        // Formulario: ocultar muro, mostrar form
        if (formLocked)  formLocked.style.display  = 'none';
        if (formContent) formContent.style.display = 'flex';

        // Rellenar datos del usuario
        if (nameInput)  nameInput.value = user.displayName || '';
        if (emailInput) {
            emailInput.value    = user.email || '';
            emailInput.readOnly = true;
        }
    } else {
        // Header: ocultar botón logout
        if (userMenu) userMenu.style.display = 'none';

        // Formulario: mostrar muro, ocultar form
        if (formLocked)  formLocked.style.display  = 'flex';
        if (formContent) formContent.style.display = 'none';

        // Limpiar campos
        if (nameInput)  nameInput.value = '';
        if (emailInput) { emailInput.value = ''; emailInput.readOnly = false; }
    }
}