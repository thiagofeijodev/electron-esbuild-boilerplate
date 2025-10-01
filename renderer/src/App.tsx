import React, { useEffect } from 'react';
import './App.css';

export default function App() {
  useEffect(() => {
    if (!window?.electron) return;

    console.log('window.electron', window.electron);
    console.log('window.versions', window.versions);

    window.electron.ipcRenderer.sendMessage('savecontent', "Hello from the renderer");
    window.electron.ipcRenderer.on('ipc-client', () => {
      console.log('menu-open');
    });
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="app-title">
            <span className="icon">🎨</span>
            Electron - Boilerplate UI
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">
              📖 Documentation
            </button>
            <button className="btn btn-primary">
              🚀 Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="app-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to the Electron Boilerplate
            </h1>
            <p className="hero-subtitle">
              A modern, cross-platform desktop application built with Electron, React, and Bun
            </p>
            <div className="hero-badges">
              <span className="badge">⚡ Bun</span>
              <span className="badge">⚛️ React 19</span>
              <span className="badge">🖥️ Electron</span>
              <span className="badge">📱 Cross-Platform</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">What This Boilerplate Provides</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast Development</h3>
              <p>Powered by Bun for ultra-fast package management and build times. Development server starts in milliseconds.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Modern React UI</h3>
              <p>Built with React 19 and TypeScript for a robust, type-safe development experience with modern hooks and patterns.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🖥️</div>
              <h3>Cross-Platform Desktop</h3>
              <p>Electron-based desktop application that works seamlessly on macOS, Windows, and Linux with native performance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Production Ready</h3>
              <p>Complete build pipeline with electron-builder for creating distributable packages and installers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Modular Architecture</h3>
              <p>Clean separation between main process and renderer with independent package.json files for better dependency management.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛠️</div>
              <h3>Developer Experience</h3>
              <p>Hot reload, TypeScript support, and comprehensive development scripts for a smooth coding experience.</p>
            </div>
          </div>
        </section>

        {/* Project Structure Section */}
        <section className="structure-section">
          <h2 className="section-title">Project Structure</h2>
          <div className="structure-content">
            <div className="structure-tree">
              <div className="tree-item">
                <span className="tree-icon">📁</span>
                <span className="tree-name">electron-esbuild-boilerplate/</span>
                <div className="tree-children">
                  <div className="tree-item">
                    <span className="tree-icon">📁</span>
                    <span className="tree-name">main/</span>
                    <span className="tree-desc">Electron main process</span>
                  </div>
                  <div className="tree-item">
                    <span className="tree-icon">📁</span>
                    <span className="tree-name">renderer/</span>
                    <span className="tree-desc">React UI components</span>
                  </div>
                  <div className="tree-item">
                    <span className="tree-icon">📁</span>
                    <span className="tree-name">release/</span>
                    <span className="tree-desc">Build outputs & packages</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="structure-info">
              <h3>Architecture Overview</h3>
              <p>This boilerplate follows Electron's multi-process architecture with clear separation of concerns:</p>
              <ul>
                <li><strong>Main Process:</strong> Handles app lifecycle, native APIs, and window management</li>
                <li><strong>Renderer Process:</strong> Your React application that users interact with</li>
                <li><strong>Preload Script:</strong> Secure bridge between main and renderer processes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="getting-started-section">
          <h2 className="section-title">Quick Start Guide</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Install Dependencies</h3>
                <div className="code-block">
                  <code>bun install</code>
                </div>
                <p>This will install dependencies for both main and renderer processes.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Start Development</h3>
                <div className="code-block">
                  <code>bun run start</code>
                </div>
                <p>Launches both Electron main process and React development server.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Build for Production</h3>
                <div className="code-block">
                  <code>bun run build</code>
                </div>
                <p>Creates distributable packages for all supported platforms.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="tech-stack-section">
          <h2 className="section-title">Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-logo">⚡</div>
              <h3>Bun</h3>
              <p>Fast JavaScript runtime and package manager</p>
            </div>
            <div className="tech-item">
              <div className="tech-logo">⚛️</div>
              <h3>React 19</h3>
              <p>Modern UI library with latest features</p>
            </div>
            <div className="tech-item">
              <div className="tech-logo">🖥️</div>
              <h3>Electron</h3>
              <p>Cross-platform desktop app framework</p>
            </div>
            <div className="tech-item">
              <div className="tech-logo">📘</div>
              <h3>TypeScript</h3>
              <p>Type-safe JavaScript development</p>
            </div>
            <div className="tech-item">
              <div className="tech-logo">🔨</div>
              <h3>esbuild</h3>
              <p>Ultra-fast JavaScript bundler</p>
            </div>
            <div className="tech-item">
              <div className="tech-logo">📦</div>
              <h3>electron-builder</h3>
              <p>Application packaging and distribution</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-content">
            <p>Built with ❤️ by <strong>Thiago Feijó</strong></p>
            <p className="footer-note">
              This is the UI component of the Electron boilerplate. 
              The actual icon editing functionality would be implemented in the main application.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}