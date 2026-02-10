import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { LogPage } from './pages/LogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ThemeProvider } from './context/ThemeContext';
import { CommandBar } from './components/CommandBar';
import { BootSequence } from './components/BootSequence';

function AppContent() {
  const [booting, setBooting] = useState(() => {
    return !sessionStorage.getItem('booted');
  });

  const handleBootComplete = () => {
    setBooting(false);
    sessionStorage.setItem('booted', 'true');
  };

  if (booting) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      <CommandBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<LogPage />} />
        <Route path="/log/:id" element={<BlogPostPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
