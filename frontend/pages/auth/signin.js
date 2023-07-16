import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {data:session} = useSession()
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn('django', {
      username,
      password,
      callbackUrl:`${window.location.origin}`,
      redirect: false,
    });

    if (result.error) {
      setError(result.error);
    }
    if(result?.url) router.push(result?.url)
  };
  console.log("session sign up", session)

  return (
    <div>
      <h2>Sign In</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
