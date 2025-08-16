import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Progress, RadioGroup, Radio, Spinner, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  aiGenerated: boolean;
}

interface AnalysisResult {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  timeSpent: number;
  accuracyByCategory: Record<string, number>;
  difficultyBreakdown: Record<string, number>;
}

const AssessmentScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // AI-generated questions based on different categories
  const generateAIQuestions = async (category: string = 'general') => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiQuestions: Question[] = [
      {
        id: 1,
        question: `What is the primary advantage of using ${category === 'programming' ? 'React hooks' : category === 'ai' ? 'machine learning algorithms' : 'modern web technologies'}?`,
        options: [
          category === 'programming' ? 'Better performance optimization' : category === 'ai' ? 'Improved data processing' : 'Enhanced user experience',
          category === 'programming' ? 'Simplified state management' : category === 'ai' ? 'Faster training times' : 'Better security',
          category === 'programming' ? 'Enhanced debugging capabilities' : category === 'ai' ? 'Reduced computational costs' : 'Improved accessibility',
          category === 'programming' ? 'Cross-platform compatibility' : category === 'ai' ? 'Better generalization' : 'Faster loading times'
        ],
        correctAnswer: 1,
        explanation: `This question explores the core benefits of ${category === 'programming' ? 'React hooks for state management' : category === 'ai' ? 'machine learning algorithms for data processing' : 'modern web technologies for user experience'}.`,
        difficulty: 'medium',
        category: category,
        aiGenerated: true
      },
      {
        id: 2,
        question: `How does ${category === 'programming' ? 'component re-rendering' : category === 'ai' ? 'neural network training' : 'responsive design'} work in modern applications?`,
        options: [
          category === 'programming' ? 'Through virtual DOM diffing' : category === 'ai' ? 'Via backpropagation algorithms' : 'Using CSS media queries',
          category === 'programming' ? 'By state change detection' : category === 'ai' ? 'Through gradient descent' : 'With JavaScript event listeners',
          category === 'programming' ? 'Via lifecycle methods' : category === 'ai' ? 'Using activation functions' : 'Through viewport calculations',
          category === 'programming' ? 'By prop comparison' : category === 'ai' ? 'Via loss function optimization' : 'With breakpoint systems'
        ],
        correctAnswer: 0,
        explanation: `This question tests understanding of ${category === 'programming' ? 'React\'s virtual DOM and rendering optimization' : category === 'ai' ? 'neural network training fundamentals' : 'responsive design principles'}.`,
        difficulty: 'hard',
        category: category,
        aiGenerated: true
      },
      {
        id: 3,
        question: `What is the best practice for ${category === 'programming' ? 'handling asynchronous operations' : category === 'ai' ? 'data preprocessing' : 'performance optimization'}?`,
        options: [
          category === 'programming' ? 'Using async/await patterns' : category === 'ai' ? 'Normalizing input data' : 'Implementing lazy loading',
          category === 'programming' ? 'Callback functions' : category === 'ai' ? 'Feature scaling' : 'Code splitting',
          category === 'programming' ? 'Promise chains' : category === 'ai' ? 'Data augmentation' : 'Image compression',
          category === 'programming' ? 'Event listeners' : category === 'ai' ? 'Outlier removal' : 'Caching strategies'
        ],
        correctAnswer: 0,
        explanation: `This question evaluates knowledge of ${category === 'programming' ? 'modern async programming patterns' : category === 'ai' ? 'data preprocessing best practices' : 'performance optimization techniques'}.`,
        difficulty: 'medium',
        category: category,
        aiGenerated: true
      },
      {
        id: 4,
        question: `Which approach is most effective for ${category === 'programming' ? 'testing React components' : category === 'ai' ? 'model validation' : 'user experience design'}?`,
        options: [
          category === 'programming' ? 'Unit testing with Jest' : category === 'ai' ? 'Cross-validation techniques' : 'User research and testing',
          category === 'programming' ? 'Integration testing' : category === 'ai' ? 'Holdout validation' : 'A/B testing',
          category === 'programming' ? 'End-to-end testing' : category === 'ai' ? 'Bootstrap validation' : 'Usability studies',
          category === 'programming' ? 'Manual testing' : category === 'ai' ? 'Single validation set' : 'Design reviews'
        ],
        correctAnswer: 0,
        explanation: `This question assesses understanding of ${category === 'programming' ? 'comprehensive testing strategies' : category === 'ai' ? 'robust validation methods' : 'user-centered design approaches'}.`,
        difficulty: 'easy',
        category: category,
        aiGenerated: true
      },
      {
        id: 5,
        question: `What is the key principle behind ${category === 'programming' ? 'functional programming' : category === 'ai' ? 'deep learning' : 'progressive enhancement'}?`,
        options: [
          category === 'programming' ? 'Immutability and pure functions' : category === 'ai' ? 'Neural network depth' : 'Graceful degradation',
          category === 'programming' ? 'Object-oriented design' : category === 'ai' ? 'Supervised learning' : 'Mobile-first approach',
          category === 'programming' ? 'Procedural programming' : category === 'ai' ? 'Unsupervised learning' : 'Responsive design',
          category === 'programming' ? 'Event-driven architecture' : category === 'ai' ? 'Reinforcement learning' : 'Accessibility first'
        ],
        correctAnswer: 0,
        explanation: `This question explores the fundamental concepts of ${category === 'programming' ? 'functional programming principles' : category === 'ai' ? 'deep learning architectures' : 'progressive enhancement strategies'}.`,
        difficulty: 'hard',
        category: category,
        aiGenerated: true
      },
      {
        id: 6,
        question: `How do you optimize ${category === 'programming' ? 'bundle size' : category === 'ai' ? 'model inference' : 'page load times'}?`,
        options: [
          category === 'programming' ? 'Tree shaking and code splitting' : category === 'ai' ? 'Model quantization' : 'Image optimization and CDN',
          category === 'programming' ? 'Minification and compression' : category === 'ai' ? 'Batch processing' : 'Lazy loading and caching',
          category === 'programming' ? 'Dead code elimination' : category === 'ai' ? 'Model pruning' : 'Server-side rendering',
          category === 'programming' ? 'Bundle analysis' : category === 'ai' ? 'Hardware acceleration' : 'Critical path optimization'
        ],
        correctAnswer: 0,
        explanation: `This question tests knowledge of ${category === 'programming' ? 'modern bundling optimization techniques' : category === 'ai' ? 'model performance optimization' : 'web performance best practices'}.`,
        difficulty: 'medium',
        category: category,
        aiGenerated: true
      }
    ];
    
    setQuestions(aiQuestions);
    setIsGenerating(false);
  };

  useEffect(() => {
    // Generate initial AI questions
    generateAIQuestions();
  }, []);

  const totalQuestions = questions.length;

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateAnalysis();
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateProgress = () => {
    return ((currentQuestion + 1) / totalQuestions) * 100;
  };

  const getCurrentAnswer = () => {
    return answers[currentQuestion] !== undefined ? answers[currentQuestion].toString() : "";
  };

  const generateAnalysis = () => {
    const endTime = Date.now();
    const timeSpent = Math.round((endTime - startTime) / 1000);
    
    const correctAnswers = answers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;
    
    const overallScore = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Analyze by category
    const categoryAnalysis: Record<string, { correct: number; total: number }> = {};
    const difficultyAnalysis: Record<string, { correct: number; total: number }> = {};
    
    questions.forEach((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      
      // Category analysis
      if (!categoryAnalysis[question.category]) {
        categoryAnalysis[question.category] = { correct: 0, total: 0 };
      }
      categoryAnalysis[question.category].total++;
      if (isCorrect) categoryAnalysis[question.category].correct++;
      
      // Difficulty analysis
      if (!difficultyAnalysis[question.difficulty]) {
        difficultyAnalysis[question.difficulty] = { correct: 0, total: 0 };
      }
      difficultyAnalysis[question.difficulty].total++;
      if (isCorrect) difficultyAnalysis[question.difficulty].correct++;
    });
    
    const accuracyByCategory: Record<string, number> = {};
    Object.keys(categoryAnalysis).forEach(category => {
      accuracyByCategory[category] = Math.round(
        (categoryAnalysis[category].correct / categoryAnalysis[category].total) * 100
      );
    });
    
    const difficultyBreakdown: Record<string, number> = {};
    Object.keys(difficultyAnalysis).forEach(difficulty => {
      difficultyBreakdown[difficulty] = Math.round(
        (difficultyAnalysis[difficulty].correct / difficultyAnalysis[difficulty].total) * 100
      );
    });
    
    // Generate insights
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];
    
    Object.entries(accuracyByCategory).forEach(([category, accuracy]) => {
      if (accuracy >= 80) {
        strengths.push(`Strong performance in ${category} (${accuracy}%)`);
      } else if (accuracy <= 50) {
        weaknesses.push(`Needs improvement in ${category} (${accuracy}%)`);
        recommendations.push(`Focus on ${category} fundamentals and practice more ${category}-related questions`);
      }
    });
    
    Object.entries(difficultyBreakdown).forEach(([difficulty, accuracy]) => {
      if (accuracy <= 50) {
        recommendations.push(`Practice more ${difficulty} level questions to build confidence`);
      }
    });
    
    if (overallScore >= 80) {
      strengths.push("Excellent overall performance!");
      recommendations.push("Consider advancing to more challenging topics");
    } else if (overallScore <= 50) {
      recommendations.push("Review fundamental concepts before moving forward");
      recommendations.push("Take the assessment again after studying");
    }
    
    setAnalysisResult({
      overallScore,
      strengths,
      weaknesses,
      recommendations,
      timeSpent,
      accuracyByCategory,
      difficultyBreakdown
    });
  };

  const regenerateQuestions = (category: string) => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setStartTime(Date.now());
    generateAIQuestions(category);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl shadow-2xl">
          <div className="text-center">
            <Spinner size="lg" color="primary" className="mx-auto mb-6 animate-pulse-glow" />
            <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-primary-100 to-secondary-100 bg-clip-text text-transparent">
              AI is Generating Questions
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Our AI is creating personalized questions based on your learning needs...
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-3 p-3 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-lg border border-white/20">
                <Icon icon="lucide:brain" className="text-xl text-primary-400" />
                <span className="text-white/80">Analyzing knowledge gaps</span>
              </div>
              <div className="flex items-center justify-center space-x-3 p-3 bg-gradient-to-r from-secondary-500/10 to-accent-500/10 rounded-lg border border-white/20">
                <Icon icon="lucide:zap" className="text-xl text-accent-400" />
                <span className="text-white/80">Creating adaptive questions</span>
              </div>
              <div className="flex items-center justify-center space-x-3 p-3 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-lg border border-white/20">
                <Icon icon="lucide:target" className="text-xl text-secondary-400" />
                <span className="text-white/80">Personalizing difficulty levels</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (showResults && analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-4xl p-8 backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl shadow-2xl animate-fade-in">
          <div className="text-center mb-8">
            <Icon 
              icon={analysisResult.overallScore >= 70 ? "lucide:trophy" : "lucide:target"} 
              className={`text-8xl mx-auto mb-6 ${analysisResult.overallScore >= 70 ? 'text-accent-400 animate-pulse-glow' : 'text-primary-400 animate-bounce-gentle'}`} 
              aria-hidden="true"
            />
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-100 to-secondary-100 bg-clip-text text-transparent">
              AI-Powered Assessment Complete!
            </h2>
            <p className="text-2xl text-white/90 mb-6">Your Score: {analysisResult.overallScore}%</p>
            
            <div className="mb-8 p-6 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl border border-white/30">
              <p className="text-white mb-3 text-lg">Correct Answers: {Math.round((analysisResult.overallScore / 100) * totalQuestions)}/{totalQuestions}</p>
              <Progress 
                value={analysisResult.overallScore} 
                color={analysisResult.overallScore >= 70 ? "success" : analysisResult.overallScore >= 50 ? "warning" : "danger"}
                className="w-full"
                size="lg"
              />
              <p className="text-white/80 text-sm mt-3">Time spent: {analysisResult.timeSpent} seconds</p>
            </div>
          </div>

          {/* AI Analysis Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Strengths */}
            {analysisResult.strengths.length > 0 && (
              <Card className="p-6 bg-gradient-to-r from-success-500/20 to-success-600/20 border border-success-400/40 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-success-300 mb-4 flex items-center">
                  <Icon icon="lucide:check-circle" className="mr-2 text-2xl" />
                  Your Strengths
                </h3>
                <ul className="space-y-2">
                  {analysisResult.strengths.map((strength, index) => (
                    <li key={index} className="text-success-200 text-sm flex items-start">
                      <Icon icon="lucide:arrow-right" className="mr-2 mt-1 flex-shrink-0 text-success-400" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Areas for Improvement */}
            {analysisResult.weaknesses.length > 0 && (
              <Card className="p-6 bg-gradient-to-r from-warning-500/20 to-warning-600/20 border border-warning-400/40 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-warning-300 mb-4 flex items-center">
                  <Icon icon="lucide:alert-circle" className="mr-2 text-2xl" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {analysisResult.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-warning-200 text-sm flex items-start">
                      <Icon icon="lucide:arrow-right" className="mr-2 mt-1 flex-shrink-0 text-warning-400" />
                      {weakness}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* AI Recommendations */}
          <Card className="p-6 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-400/40 rounded-xl mb-8 shadow-lg">
            <h3 className="text-xl font-semibold text-primary-200 mb-4 flex items-center">
              <Icon icon="lucide:lightbulb" className="mr-2 text-2xl" />
              AI-Powered Recommendations
            </h3>
            <ul className="space-y-2">
              {analysisResult.recommendations.map((recommendation, index) => (
                <li key={index} className="text-primary-100 text-sm flex items-start">
                  <Icon icon="lucide:arrow-right" className="mr-2 mt-1 flex-shrink-0 text-primary-300" />
                  {recommendation}
                </li>
              ))}
            </ul>
          </Card>

          {/* Performance Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Category Performance */}
            <Card className="p-6 bg-gradient-to-r from-white/20 to-white/30 border border-white/40 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Performance by Category</h3>
              <div className="space-y-3">
                {Object.entries(analysisResult.accuracyByCategory).map(([category, accuracy]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-white capitalize font-medium">{category}</span>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={accuracy} 
                        size="sm" 
                        color={accuracy >= 80 ? "success" : accuracy >= 60 ? "warning" : "danger"}
                        className="w-20"
                      />
                      <span className="text-white/80 text-sm font-medium">{accuracy}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Difficulty Performance */}
            <Card className="p-6 bg-gradient-to-r from-white/20 to-white/30 border border-white/40 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Performance by Difficulty</h3>
              <div className="space-y-3">
                {Object.entries(analysisResult.difficultyBreakdown).map(([difficulty, accuracy]) => (
                  <div key={difficulty} className="flex items-center justify-between">
                    <Chip
                      size="sm"
                      color={difficulty === 'easy' ? 'success' : difficulty === 'medium' ? 'warning' : 'danger'}
                      variant="flat"
                      className="font-medium"
                    >
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </Chip>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={accuracy} 
                        size="sm" 
                        color={accuracy >= 80 ? "success" : accuracy >= 60 ? "warning" : "danger"}
                        className="w-20"
                      />
                      <span className="text-white/80 text-sm font-medium">{accuracy}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Button
              size="lg"
              color="primary"
              variant="shadow"
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 shadow-lg hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300"
              onPress={() => navigate('/dashboard')}
              endContent={<Icon icon="lucide:arrow-right" />}
            >
              View Learning Path
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                size="lg"
                variant="bordered"
                color="primary"
                className="w-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-primary-300 font-semibold py-4 transition-all duration-300 hover:scale-105"
                onPress={() => regenerateQuestions('general')}
                startContent={<Icon icon="lucide:refresh-cw" />}
              >
                Retake Assessment
              </Button>
              
              <Button
                size="lg"
                variant="bordered"
                color="secondary"
                className="w-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-secondary-300 font-semibold py-4 transition-all duration-300 hover:scale-105"
                onPress={() => regenerateQuestions('programming')}
                startContent={<Icon icon="lucide:code" />}
              >
                Programming Focus
              </Button>
              
              <Button
                size="lg"
                variant="bordered"
                color="warning"
                className="w-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-accent-300 font-semibold py-4 transition-all duration-300 hover:scale-105"
                onPress={() => regenerateQuestions('ai')}
                startContent={<Icon icon="lucide:brain" />}
              >
                AI/ML Focus
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return null;
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">AI-Powered Assessment</h2>
            <div className="flex items-center space-x-2 mt-1">
              <Chip size="sm" color="primary" variant="flat" className="bg-gradient-to-r from-primary-500/20 to-primary-600/20 border-primary-400/40">
                {currentQ.category.charAt(0).toUpperCase() + currentQ.category.slice(1)}
              </Chip>
              <Chip 
                size="sm" 
                color={currentQ.difficulty === 'easy' ? 'success' : currentQ.difficulty === 'medium' ? 'warning' : 'danger'} 
                variant="flat"
                className={`${currentQ.difficulty === 'easy' ? 'bg-gradient-to-r from-success-500/20 to-success-600/20 border-success-400/40' : 
                           currentQ.difficulty === 'medium' ? 'bg-gradient-to-r from-warning-500/20 to-warning-600/20 border-warning-400/40' : 
                           'bg-gradient-to-r from-danger-500/20 to-danger-600/20 border-danger-400/40'}`}
              >
                {currentQ.difficulty.charAt(0).toUpperCase() + currentQ.difficulty.slice(1)}
              </Chip>
              {currentQ.aiGenerated && (
                <Chip size="sm" color="secondary" variant="flat" className="bg-gradient-to-r from-secondary-500/20 to-secondary-600/20 border-secondary-400/40">
                  AI Generated
                </Chip>
              )}
            </div>
          </div>
          
          <Progress
            size="sm"
            radius="full"
            classNames={{
              base: "max-w-md",
              track: "drop-shadow-md border border-white/30",
              indicator: "bg-gradient-to-r from-primary-500 to-secondary-500",
              label: "tracking-wider font-medium text-white/80",
              value: "text-white/70",
            }}
            value={calculateProgress()}
            showValueLabel={true}
            label={`${currentQuestion + 1} of ${totalQuestions}`}
          />
        </div>
        
        <div className="flex items-start mb-8">
          <div className="flex-grow">
            <h3 className="text-xl text-white mb-6 leading-relaxed font-medium">
              {currentQ.question}
            </h3>
            
            <RadioGroup
              value={getCurrentAnswer()}
              onValueChange={handleAnswerSelect}
              color="primary"
              size="lg"
            >
              {currentQ.options.map((option, index) => (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 w-full ${
                    answers[currentQuestion] === index
                      ? 'border-blue-600 bg-blue-100 shadow-lg scale-[1.02] ring-2 ring-blue-200'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerSelect(index.toString())}
                >
                  <div className="flex items-center space-x-4">
                    {/* Radio button indicator */}
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      answers[currentQuestion] === index
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-400'
                    }`}>
                      {answers[currentQuestion] === index && (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                    
                    {/* Option text */}
                    <span className={`text-base leading-relaxed ${
                      answers[currentQuestion] === index
                        ? 'text-blue-800 font-semibold'
                        : 'text-gray-700'
                    }`}>
                      {option}
                    </span>
                    
                    {/* Selection indicator */}
                    {answers[currentQuestion] === index && (
                      <div className="ml-auto flex-shrink-0">
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="ml-8 hidden md:block">
            <Icon 
              icon="gravity-ui:robot" 
              className="text-6xl text-white animate-float" 
              aria-hidden="true"
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button
            size="lg"
            variant="light"
            color="primary"
            startContent={<Icon icon="lucide:arrow-left" />}
            onPress={handlePreviousQuestion}
            isDisabled={currentQuestion === 0}
            className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-primary-300 transition-all duration-300"
          >
            Previous
          </Button>
          
          <Button
            size="lg"
            color="primary"
            variant="shadow"
            endContent={<Icon icon="lucide:arrow-right" />}
            onPress={handleNextQuestion}
            isDisabled={answers[currentQuestion] === undefined}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-105"
          >
            {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AssessmentScreen;