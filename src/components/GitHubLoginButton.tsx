
// components/GitHubLoginButton.tsx
import { useEffect } from 'react';

interface GitHubLoginButtonProps {
  onSuccess: (code: string) => void;
}

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

export function GitHubLoginButton({ onSuccess }: GitHubLoginButtonProps) {
  useEffect(() => {
    const url = new URL(window.location);
    const code = url.searchParams.get('code');

    if (code) {
      onSuccess(code);
      // Очистить URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [onSuccess]);

  const handleLogin = () => {
    const redirectUri = `${window.location.origin}/auth/github`;
    const scopes = 'user:email';
    const state = Math.random().toString(36);

    sessionStorage.setItem('oauth_state', state);

    window.location.href = 
      `https://github.com/login/oauth/authorize?` +
      `client_id=${GITHUB_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scopes)}&` +
      `state=${state}`;
  };

  return (
    <button onClick={handleLogin} className="btn btn-github">
      Login with GitHub
    </button>
  );
}
