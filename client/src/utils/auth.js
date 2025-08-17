// Simple auth utility for demo (replace with real auth in production)
export function isLoggedIn() {
  // For demo, check localStorage for a fake token
  return !!localStorage.getItem('user_token');
}

export function login(token = 'demo_token') {
  localStorage.setItem('user_token', token);
}

export function logout() {
  localStorage.removeItem('user_token');
}
