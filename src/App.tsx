import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AchievementsPage from './pages/AchievementsPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="achievements" element={<AchievementsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
