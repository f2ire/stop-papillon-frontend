import { useEffect, useState } from 'react';
import { fetchSessions } from '../api/sessions';

interface Session {
  id: number;
  user: number; // if id. Else object user is geven {...}
  start_time: string;
  end_time: string | null;
  was_successful: boolean;
  distractions: number;
}

const Debug = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSessions();
        setSessions(data);
      } catch (err) {
        console.error('fetch error', err);
        setError('Error during fetching');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {sessions.length === 0 && <p>No session found</p>}

      {sessions.length > 0 && (
        <>
          <p>{sessions.length} sessions found</p>
          <ul>
            {sessions.map((s) => (
              <li key={s.id}>
                <p>
                  <strong>🕓 Start:</strong>{' '}
                  {new Date(s.start_time).toLocaleString()}
                </p>
                <p>
                  <strong>🏁 End:</strong>{' '}
                  {s.end_time ? new Date(s.end_time).toLocaleString() : '—'}
                </p>
                <p>
                  <strong>🎯 Result:</strong>{' '}
                  {s.was_successful ? '🎉 Well done!' : '🔁 Try again'}
                </p>
                <p>
                  <strong>🦋 Distractions:</strong> {s.distractions}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Debug;
