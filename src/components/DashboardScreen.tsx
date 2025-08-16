import React, { useState } from 'react';
import { Card, Progress, Button, Chip, Input } from '@heroui/react';
import { Icon } from '@iconify/react';

interface LearningModule {
  id: string;
  name: string;
  status: 'skipped' | 'to-learn' | 'completed' | 'in-progress';
  progress: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

const DashboardScreen: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const learningPath: LearningModule[] = [
    { 
      id: '1', 
      name: 'JavaScript Basics', 
      status: 'skipped', 
      progress: 100, 
      estimatedTime: '2 hours',
      difficulty: 'beginner'
    },
    { 
      id: '2', 
      name: 'React Fundamentals', 
      status: 'to-learn', 
      progress: 0, 
      estimatedTime: '4 hours',
      difficulty: 'intermediate'
    },
    { 
      id: '3', 
      name: 'Advanced React Patterns', 
      status: 'to-learn', 
      progress: 0, 
      estimatedTime: '6 hours',
      difficulty: 'advanced'
    },
    { 
      id: '4', 
      name: 'State Management', 
      status: 'to-learn', 
      progress: 0, 
      estimatedTime: '5 hours',
      difficulty: 'intermediate'
    },
    { 
      id: '5', 
      name: 'Performance Optimization', 
      status: 'to-learn', 
      progress: 0, 
      estimatedTime: '8 hours',
      difficulty: 'expert'
    },
    { 
      id: '6', 
      name: 'Testing & Deployment', 
      status: 'to-learn', 
      progress: 0, 
      estimatedTime: '3 hours',
      difficulty: 'intermediate'
    }
  ];

  // Filter modules based on difficulty and search query
  const filteredModules = learningPath.filter(module => {
    const matchesDifficulty = selectedDifficulty === 'all' || module.difficulty === selectedDifficulty;
    const matchesSearch = searchQuery === '' || 
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.difficulty.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDifficulty && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'skipped':
        return <Icon icon="lucide:minus-circle" className="text-gray-400" />;
      case 'to-learn':
        return <Icon icon="lucide:circle" className="text-blue-400" />;
      case 'completed':
        return <Icon icon="lucide:check-circle" className="text-green-400" />;
      case 'in-progress':
        return <Icon icon="lucide:play-circle" className="text-yellow-400" />;
      default:
        return <Icon icon="lucide:circle" className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'skipped':
        return 'default';
      case 'to-learn':
        return 'primary';
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'primary';
      case 'advanced':
        return 'warning';
      case 'expert':
        return 'danger';
      default:
        return 'default';
    }
  };

  const totalTimeSaved = learningPath
    .filter(module => module.status === 'skipped')
    .reduce((total, module) => total + parseInt(module.estimatedTime.split(' ')[0]), 0);

  const totalModules = learningPath.length;
  const skippedModules = learningPath.filter(module => module.status === 'skipped').length;
  const timeSavedPercentage = Math.round((skippedModules / totalModules) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-6xl p-8 backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl shadow-2xl animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-primary-100 to-secondary-100 bg-clip-text text-transparent">
              Your Learning Path
            </h2>
            <p className="text-white/90 text-lg">Personalized based on your assessment results</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            {/* Enhanced Search Input */}
            <div className="relative group">
              <Input
                type="text"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-white/20 border-white/40 text-white placeholder-white/70 focus:border-primary-300 transition-all duration-300"
                classNames={{
                  input: "text-white text-lg",
                  inputWrapper: "bg-white/20 border-white/40 hover:bg-white/30 focus-within:bg-white/30 focus-within:border-primary-300 focus-within:shadow-lg focus-within:shadow-primary-500/25 transition-all duration-300",
                }}
                startContent={
                  <Icon 
                    icon="lucide:search" 
                    className="text-white/70 text-lg group-hover:text-primary-300 transition-colors duration-300" 
                    aria-hidden="true"
                  />
                }
                endContent={
                  searchQuery && (
                    <Button
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => setSearchQuery('')}
                      className="min-w-0 px-2 hover:bg-danger-500/20"
                    >
                      <Icon icon="lucide:x" className="text-sm" />
                    </Button>
                  )
                }
              />
            </div>
            
            {/* Enhanced Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 bg-white/20 border border-white/40 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-white/30 transition-all duration-300 font-medium"
            >
              <option value="all" className="text-gray-800">All Difficulties</option>
              <option value="beginner" className="text-gray-800">Beginner</option>
              <option value="intermediate" className="text-gray-800">Intermediate</option>
              <option value="advanced" className="text-gray-800">Advanced</option>
              <option value="expert" className="text-gray-800">Expert</option>
            </select>
          </div>
        </div>
 
        {/* Enhanced Search Results Summary */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl border border-white/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon icon="lucide:search" className="text-white/80 text-lg" />
                <span className="text-white font-medium">
                  Search results for "{searchQuery}": {filteredModules.length} modules found
                </span>
              </div>
              <Button
                size="sm"
                variant="light"
                color="primary"
                onPress={() => setSearchQuery('')}
                className="hover:bg-primary-500/20"
              >
                Clear Search
              </Button>
            </div>
          </div>
        )}
 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Overview */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-gradient-to-r from-white/20 to-white/30 border border-white/40 h-full rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Learning Modules</h3>
                <span className="text-white/80 text-sm font-medium">
                  {filteredModules.length} of {learningPath.length} modules
                </span>
              </div>
              
              {filteredModules.length === 0 ? (
                <div className="text-center py-12">
                  <Icon icon="lucide:search-x" className="text-6xl text-white/40 mx-auto mb-4" />
                  <p className="text-white/70 text-lg">No modules found</p>
                  <p className="text-white/50 text-sm mt-2">
                    Try adjusting your search or difficulty filter
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredModules.map((module, index) => (
                    <div 
                      key={module.id} 
                      className="p-4 bg-gradient-to-r from-white/10 to-white/15 rounded-xl border border-white/30 hover:bg-white/20 hover:border-primary-300/50 transition-all duration-300 animate-slide-up hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(module.status)}
                          <span className="text-white font-semibold text-lg">{module.name}</span>
                        </div>
                        <Chip
                          size="sm"
                          color={getDifficultyColor(module.difficulty)}
                          variant="flat"
                          className={`${module.difficulty === 'beginner' ? 'bg-gradient-to-r from-success-500/20 to-success-600/20 border-success-400/40' : 
                                     module.difficulty === 'intermediate' ? 'bg-gradient-to-r from-warning-500/20 to-warning-600/20 border-warning-400/40' : 
                                     module.difficulty === 'advanced' ? 'bg-gradient-to-r from-danger-500/20 to-danger-600/20 border-danger-400/40' : 
                                     'bg-gradient-to-r from-neutral-500/20 to-neutral-600/20 border-neutral-400/40'}`}
                        >
                          {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                        </Chip>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-sm font-medium">{module.estimatedTime}</span>
                        <span className="text-white/80 text-sm font-medium">{module.progress}%</span>
                      </div>
                      
                      <Progress
                        size="sm"
                        radius="full"
                        value={module.progress}
                        color={getStatusColor(module.status)}
                        className="w-full"
                      />
                      
                      <div className="mt-3 flex justify-end">
                        <Button
                          size="sm"
                          color={module.status === 'to-learn' ? 'primary' : 'default'}
                          variant={module.status === 'to-learn' ? 'solid' : 'bordered'}
                          isDisabled={module.status === 'skipped'}
                          className={`text-xs font-medium ${module.status === 'to-learn' ? 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600' : 'border-white/30 text-white hover:bg-white/10 hover:border-primary-300'} transition-all duration-300`}
                        >
                          {module.status === 'skipped' ? 'Skipped' : 
                           module.status === 'completed' ? 'Completed' : 
                           module.status === 'in-progress' ? 'Continue' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
          
          {/* Enhanced Stats Sidebar */}
          <div className="space-y-6">
            {/* Time Saved Card */}
            <Card className="p-6 bg-gradient-to-r from-success-500/20 to-success-600/20 border border-success-400/40 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Icon icon="lucide:clock" className="text-2xl text-success-400" />
                <h3 className="text-lg font-semibold text-success-200">Time Saved</h3>
              </div>
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-success-100">{totalTimeSaved}</p>
                <p className="text-success-200 text-sm">hours saved</p>
              </div>
              <Progress 
                value={timeSavedPercentage} 
                color="success" 
                className="w-full"
                size="sm"
              />
            </Card>

            {/* Modules Skipped Card */}
            <Card className="p-6 bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-400/40 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Icon icon="lucide:skip-forward" className="text-2xl text-primary-400" />
                <h3 className="text-lg font-semibold text-primary-200">Modules Skipped</h3>
              </div>
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-primary-100">{skippedModules}</p>
                <p className="text-primary-200 text-sm">modules skipped</p>
              </div>
              <Progress 
                value={(skippedModules / learningPath.length) * 100} 
                color="primary" 
                className="w-full"
                size="sm"
              />
            </Card>

            {/* Next Steps Card */}
            <Card className="p-6 bg-gradient-to-r from-accent-500/20 to-accent-600/20 border border-accent-400/40 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Icon icon="lucide:target" className="text-2xl text-accent-400" />
                <h3 className="text-lg font-semibold text-accent-200">Next Steps</h3>
              </div>
              <p className="text-accent-100 text-sm mb-4">
                Focus on your weakest areas to maximize learning efficiency
              </p>
              <Button
                size="sm"
                color="warning"
                variant="flat"
                className="w-full bg-gradient-to-r from-accent-500/20 to-accent-600/20 border border-accent-400/40 text-accent-200 hover:from-accent-500/30 hover:to-accent-600/30 transition-all duration-300"
              >
                View Recommendations
              </Button>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardScreen;