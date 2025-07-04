import FocusTimer from '../components/FocusTimer';

const Home = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🦋 Welcome to StopPapillon! 🦋</h1>
      <FocusTimer initialTime={20} />
    </div>
  );
};

export default Home;
