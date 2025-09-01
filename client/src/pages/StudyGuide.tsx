import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Download,
  FileText,
  Lightbulb,
  Target,
  Clock,
  Share,
  Star,
} from "lucide-react";

const StudyGuide = () => {
  const [activeGuide, setActiveGuide] = useState("mathematics");

  const studyGuides = {
    mathematics: {
      title: "Advanced Calculus",
      category: "Mathematics",
      difficulty: "Hard",
      estimatedTime: "45 minutes",
      rating: 4.8,
      lastUpdated: "2 days ago",
      summary: "Comprehensive guide covering differential and integral calculus, limits, derivatives, and applications in real-world problems.",
      keyTopics: [
        "Limits and Continuity",
        "Derivatives and Applications", 
        "Integration Techniques",
        "Series and Sequences",
        "Multivariable Calculus"
      ],
      objectives: [
        "Understand fundamental calculus concepts",
        "Apply derivatives to solve optimization problems",
        "Master integration techniques",
        "Analyze convergence of series"
      ],
      content: `
# Advanced Calculus Study Guide

## Chapter 1: Limits and Continuity

### Key Concepts
- **Limit Definition**: The limit of a function f(x) as x approaches a is the value that f(x) gets arbitrarily close to as x gets arbitrarily close to a.
- **Continuity**: A function is continuous at a point if the limit equals the function value at that point.

### Important Formulas
- Limit of a sum: lim[f(x) + g(x)] = lim f(x) + lim g(x)
- Limit of a product: lim[f(x) × g(x)] = lim f(x) × lim g(x)

### Practice Problems
1. Find the limit of (x² - 4)/(x - 2) as x approaches 2
2. Determine where f(x) = (x² - 1)/(x + 1) is continuous

## Chapter 2: Derivatives

### Power Rule
If f(x) = xⁿ, then f'(x) = nxⁿ⁻¹

### Chain Rule
If f(x) = g(h(x)), then f'(x) = g'(h(x)) × h'(x)

### Applications
- **Optimization**: Finding maximum and minimum values
- **Related Rates**: Solving problems involving rates of change
- **Curve Sketching**: Using derivatives to analyze function behavior
      `
    },
    biology: {
      title: "Cell Biology Fundamentals",
      category: "Biology", 
      difficulty: "Medium",
      estimatedTime: "30 minutes",
      rating: 4.6,
      lastUpdated: "1 week ago",
      summary: "Essential concepts in cell biology including cell structure, organelles, and cellular processes.",
      keyTopics: [
        "Cell Structure and Function",
        "Organelles and Their Roles",
        "Cell Membrane Transport",
        "Cell Division",
        "Cellular Respiration"
      ],
      objectives: [
        "Identify key cellular components",
        "Understand organelle functions",
        "Explain transport mechanisms",
        "Describe cell division processes"
      ],
      content: `
# Cell Biology Study Guide

## Cell Structure Overview

### Prokaryotic vs Eukaryotic Cells
- **Prokaryotic**: No membrane-bound nucleus (bacteria, archaea)
- **Eukaryotic**: Membrane-bound nucleus (plants, animals, fungi)

### Key Organelles
- **Nucleus**: Control center containing DNA
- **Mitochondria**: Powerhouse of the cell (ATP production)
- **Endoplasmic Reticulum**: Protein and lipid synthesis
- **Golgi Apparatus**: Processing and packaging center

## Cellular Processes

### Cellular Respiration
C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP

### Photosynthesis (Plants)
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂
      `
    }
  };

  const currentGuide = studyGuides[activeGuide as keyof typeof studyGuides];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Study Guides
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive study materials and summaries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Guide Selection */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Available Guides</CardTitle>
                <CardDescription>Select a study guide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(studyGuides).map(([key, guide]) => (
                    <Button
                      key={key}
                      variant={activeGuide === key ? "default" : "outline"}
                      className={`w-full justify-start h-auto p-4 ${
                        activeGuide === key 
                          ? "bg-gradient-primary text-white shadow-elegant" 
                          : ""
                      }`}
                      onClick={() => setActiveGuide(key)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{guide.title}</div>
                        <div className="text-xs opacity-70">{guide.category}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Guide Header */}
            <Card className="shadow-card mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{currentGuide.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{currentGuide.category}</Badge>
                      <Badge variant="outline" className={getDifficultyColor(currentGuide.difficulty)}>
                        {currentGuide.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{currentGuide.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {currentGuide.summary}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="bg-gradient-primary hover:opacity-90 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {currentGuide.estimatedTime}
                  </div>
                  <div>Last updated: {currentGuide.lastUpdated}</div>
                </div>
              </CardHeader>
            </Card>

            {/* Guide Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Study Content</TabsTrigger>
                <TabsTrigger value="objectives">Objectives</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <FileText className="w-5 h-5 text-primary" />
                        Key Topics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentGuide.keyTopics.map((topic, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Target className="w-5 h-5 text-primary" />
                        Learning Objectives
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentGuide.objectives.map((objective, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <Card className="shadow-card">
                  <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none">
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground bg-muted/50 p-6 rounded-lg">
                        {currentGuide.content}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="objectives" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Detailed Learning Objectives
                    </CardTitle>
                    <CardDescription>
                      What you'll accomplish by studying this guide
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentGuide.objectives.map((objective, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-gradient-card rounded-lg border border-border/50">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{objective}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              This objective will be achieved through guided study and practice exercises.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGuide;