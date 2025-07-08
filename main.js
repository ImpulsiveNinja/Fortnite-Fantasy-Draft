const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const authMessage = document.getElementById('auth-message');

function toggleAppContent(show) {
  document.getElementById('app-content').style.display = show ? 'block' : 'none';
}

async function showUser(user) {
  if (user) {
    authMessage.textContent = `Logged in as ${user.email}`;
    signupBtn.style.display = 'none';
    loginBtn.style.display = 'none';
    emailInput.style.display = 'none';
    passwordInput.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    toggleAppContent(true);
  } else {
    authMessage.textContent = '';
    signupBtn.style.display = 'inline-block';
    loginBtn.style.display = 'inline-block';
    emailInput.style.display = 'inline-block';
    passwordInput.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    toggleAppContent(false);
  }
}

signupBtn.onclick = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const { error } = await supabase.auth.signUp({ email, password });
  authMessage.textContent = error ? error.message : 'Check your email to confirm signup!';
};

loginBtn.onclick = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    authMessage.textContent = error.message;
  } else {
    showUser(data.user);
  }
};

logoutBtn.onclick = async () => {
  await supabase.auth.signOut();
  showUser(null);
};

supabase.auth.getSession().then(({ data: { session } }) => {
  showUser(session?.user ?? null);
});

supabase.auth.onAuthStateChange((event, session) => {
  showUser(session?.user ?? null);
});
