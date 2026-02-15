import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { LogPage } from './pages/LogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ThemeProvider } from './context/ThemeContext';
import { CommandBar } from './components/CommandBar';
import { SystemIgnition } from './components/SystemIgnition';

function AppContent() {
  const [isBooting, setIsBooting] = useState(true);

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  return (
    <>
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

      <AnimatePresence mode="wait">
        {isBooting && <SystemIgnition onComplete={handleBootComplete} />}
      </AnimatePresence>
    </>
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
