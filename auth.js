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
    const loginBtn    = document.getElementById('google-login-btn');
    const userMenu    = document.getElementById('user-menu');
    const userAvatar  = document.getElementById('user-avatar');
    const userName    = document.getElementById('user-name');
    const nameInput   = document.getElementById('name');
    const emailInput  = document.getElementById('email');
    const formLocked  = document.getElementById('form-login-wall');
    const formContent = document.getElementById('form-content');

    if (user) {
        if (loginBtn)   loginBtn.style.display  = 'none';
        if (userMenu)   userMenu.style.display  = 'flex';
        if (userAvatar) userAvatar.src          = user.photoURL || '';
        if (userName)   userName.textContent    = user.displayName?.split(' ')[0] || 'Gamer';

        if (formLocked)  formLocked.style.display  = 'none';
        if (formContent) formContent.style.display = 'flex';
        if (nameInput)   nameInput.value           = user.displayName || '';
        if (emailInput) {
            emailInput.value    = user.email || '';
            emailInput.readOnly = true;
        }
    } else {
        if (loginBtn)   loginBtn.style.display  = 'flex';
        if (userMenu)   userMenu.style.display  = 'none';

        if (formLocked)  formLocked.style.display  = 'flex';
        if (formContent) formContent.style.display = 'none';
    }
}