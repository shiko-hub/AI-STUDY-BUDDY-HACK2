import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import MoodSelector, { StudyMood } from "@/components/MoodSelector";
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Brain,
  CheckCircle,
  X,
  Shuffle,
} from "lucide-react";

const Flashcards = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());
  const [studyMood, setStudyMood] = useState<StudyMood>('focus');

  const flashcards = [
    {
      id: 1,
      question: "What is the formula for calculating compound interest?",
      answer: "A = P(1 + r/n)^(nt), where A is the amount, P is principal, r is annual interest rate, n is number of times interest compounds per year, and t is time in years.",
      category: "Mathematics",
      difficulty: "Medium",
    },
    {
      id: 2,
      question: "Define photosynthesis",
      answer: "Photosynthesis is the process by which plants and other organisms use sunlight, water and carbon dioxide to create oxygen and energy in the form of sugar.",
      category: "Biology",
      difficulty: "Easy",
    },
    {
      id: 3,
      question: "What are the main components of a computer system?",
      answer: "Hardware (CPU, memory, storage, input/output devices) and Software (operating system, applications, drivers).",
      category: "Computer Science",
      difficulty: "Easy",
    },
    {
      id: 4,
      question: "Explain Newton's First Law of Motion",
      answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.",
      category: "Physics",
      difficulty: "Medium",
    },
  ];

  const currentCard = flashcards[currentCardIndex];
  const progress = ((studiedCards.size) / flashcards.length) * 100;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const markAsStudied = () => {
    setStudiedCards(prev => new Set([...prev, currentCard.id]));
    handleNext();
  };

  const shuffleCards = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentCardIndex(randomIndex);
    setIsFlipped(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMoodGradient = (mood: StudyMood) => {
    switch (mood) {
      case 'focus': return 'bg-gradient-focus';
      case 'relax': return 'bg-gradient-relax';
      case 'sprint': return 'bg-gradient-sprint';
      default: return 'bg-gradient-primary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Study Flashcards
          </h1>
          <p className="text-xl text-muted-foreground">
            Review key concepts with interactive flashcards
          </p>
        </div>

        {/* Mood Selection */}
        <MoodSelector selectedMood={studyMood} onMoodChange={setStudyMood} />

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Badge className="bg-primary text-primary-foreground">
                Card {currentCardIndex + 1} of {flashcards.length}
              </Badge>
              <Badge variant="outline" className={getDifficultyColor(currentCard.difficulty)}>
                {currentCard.difficulty}
              </Badge>
              <Badge variant="secondary">
                {currentCard.category}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Progress:</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
          </div>
          <Progress value={progress} className="h-2 bg-muted" />
        </div>

        {/* Flashcard Container */}
        <div className="relative mb-8">
          <div 
            className="mx-auto max-w-2xl cursor-pointer"
            onClick={handleFlip}
          >
            <Card className={`h-80 shadow-elegant border-primary/20 transition-smooth transform hover:scale-105 ${isFlipped ? 'rotate-y-180' : ''}`}>
              <CardContent className="flex items-center justify-center h-full p-8 relative">
                <div className="text-center">
                  {!isFlipped ? (
                    <>
                      <div className={`w-16 h-16 ${getMoodGradient(studyMood)} rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow`}>
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        Question
                      </h3>
                      <p className="text-lg text-foreground leading-relaxed">
                        {currentCard.question}
                      </p>
                      <p className="text-sm text-muted-foreground mt-6">
                        Click to reveal answer
                      </p>
                    </>
                  ) : (
                    <>
                      <div className={`w-16 h-16 ${getMoodGradient(studyMood)} rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow`}>
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        Answer
                      </h3>
                      <p className="text-lg text-foreground leading-relaxed">
                        {currentCard.answer}
                      </p>
                      <p className="text-sm text-muted-foreground mt-6">
                        Click to see question again
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              onClick={handleFlip}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Flip Card
            </Button>
            <Button
              onClick={handleNext}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={markAsStudied}
            className="bg-gradient-primary hover:opacity-90 text-white shadow-elegant"
            size="lg"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Studied
          </Button>
          <Button
            onClick={shuffleCards}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </Button>
        </div>

        {/* Study Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-2">
                {studiedCards.size}
              </div>
              <div className="text-sm text-muted-foreground">Cards Studied</div>
            </CardContent>
          </Card>
          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-2">
                {flashcards.length - studiedCards.size}
              </div>
              <div className="text-sm text-muted-foreground">Cards Remaining</div>
            </CardContent>
          </Card>
          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-2">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;