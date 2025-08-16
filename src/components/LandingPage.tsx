import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Input } from '@heroui/react';
import { Icon } from '@iconify/react';

const LandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs with new colors */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent-400/30 to-primary-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-secondary-400/20 to-accent-400/20 rounded-full blur-3xl animate-pulse-glow"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-primary-300/40 to-secondary-300/40 transform rotate-45 animate-bounce-gentle"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-accent-300/40 to-primary-300/40 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Shimmer lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-300/50 to-transparent animate-shimmer"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-300/50 to-transparent animate-shimmer" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center animate-fade-in">
        <Card className="w-full max-w-md p-8 backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl shadow-2xl hover:shadow-primary-500/25 transition-all duration-500 hover:scale-105">
          {/* Enhanced Header */}
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <Icon 
                icon="lucide:brain" 
                className="text-6xl text-gradient-to-r from-primary-400 to-secondary-400 animate-pulse-glow" 
                aria-hidden="true"
              />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary-100 to-secondary-100 bg-clip-text text-transparent">
              FastLearn AI
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Your AI-powered learning companion that adapts to your knowledge and accelerates your growth
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="mb-6">
            <div className="relative group">
              <Input
                type="text"
                placeholder="What do you want to learn today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                startContent={
                  <Icon 
                    icon="lucide:search" 
                    className="text-blue-500 text-xl group-hover:text-primary-300 transition-colors duration-300" 
                    aria-hidden="true"
                  />
                }
                endContent={
                  <Button
                    size="sm"
                    color="primary"
                    variant="shadow"
                    onPress={handleSearch}
                    isDisabled={!searchQuery.trim()}
                    className="min-w-0 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Icon icon="lucide:arrow-right" className="text-sm" />
                  </Button>
                }
              />
            </div>
            
            {/* Enhanced Popular Topics */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {['JavaScript', 'React', 'Python', 'Machine Learning', 'Web Development'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSearchQuery(topic)}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-primary-500/20 to-secondary-500/20 hover:from-primary-500/30 hover:to-secondary-500/30 text-white rounded-full border border-white/30 hover:border-primary-300/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="space-y-3 mb-6">
            <Link to="/assessment" className="block">
              <Button
                size="lg"
                color="primary"
                variant="shadow"
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 shadow-lg hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-105"
                endContent={<Icon icon="lucide:brain" />}
              >
                Start AI Assessment
              </Button>
            </Link>
            
            <Link to="/dashboard" className="block">
              <Button
                size="lg"
                variant="bordered"
                color="primary"
                className="w-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-primary-300 font-semibold py-4 transition-all duration-300 hover:scale-105"
                endContent={<Icon icon="lucide:arrow-right" />}
              >
                View Learning Path
              </Button>
            </Link>
          </div>

          {/* Enhanced Feature Highlights */}
          <div className="space-y-4">
            <p className="text-sm text-white/70 font-medium">
              ✨ Powered by AI • 🎯 Personalized Learning • ⚡ Save Time
            </p>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-lg border border-white/20">
                <Icon icon="lucide:zap" className="text-2xl text-accent-400" />
                <span className="text-white/90 text-sm">Lightning-fast learning with AI</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-secondary-500/10 to-accent-500/10 rounded-lg border border-white/20">
                <Icon icon="lucide:target" className="text-2xl text-primary-400" />
                <span className="text-white/90 text-sm">Targeted knowledge gaps</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-lg border border-white/20">
                <Icon icon="lucide:clock" className="text-2xl text-secondary-400" />
                <span className="text-white/90 text-sm">Optimize your study time</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;