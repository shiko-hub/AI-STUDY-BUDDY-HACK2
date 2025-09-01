import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  Brain,
  Settings,
  Zap,
  CheckCircle,
} from "lucide-react";

const QuizGeneration = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quizType, setQuizType] = useState("multiple_choice");
  const [difficulty, setDifficulty] = useState("medium");
  const [subject, setSubject] = useState("General");
  const [numQuestions, setNumQuestions] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      toast({
        title: "File uploaded successfully!",
        description: `${uploadedFile.name} is ready for quiz generation.`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateQuiz = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a PDF file first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subject', subject);
      formData.append('difficulty', difficulty);
      formData.append('quiz_type', quizType);
      formData.append('num_questions', numQuestions.toString());

      const response = await fetch('http://localhost:8000/api/quizzes/generate-from-pdf', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Quiz generated successfully!",
          description: `Created ${result.data.questions_generated} questions from your PDF.`,
        });
        
        // Navigate to the generated quiz
        navigate(`/quiz/${result.data.quiz_id}`);
      } else {
        throw new Error(result.message || 'Failed to generate quiz');
      }
    } catch (error) {
      console.error('Quiz generation error:', error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Generate Custom Quiz
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your study materials and let AI create personalized quizzes to test your knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Study Material
                </CardTitle>
                <CardDescription>
                  Upload a PDF file containing your study material
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-8 text-center transition-smooth">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    {file ? (
                      <>
                        <CheckCircle className="w-12 h-12 text-primary" />
                        <div>
                          <p className="text-lg font-medium text-foreground">
                            {file.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            File ready for processing
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-foreground">
                            Drop your PDF here or click to browse
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Supports PDF files up to 10MB
                          </p>
                        </div>
                      </>
                    )}
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Quiz Options */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Quiz Configuration
                </CardTitle>
                <CardDescription>
                  Customize your quiz settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Subject */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Subject</Label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject (e.g., Mathematics, Biology)"
                    className="w-full"
                  />
                </div>

                {/* Number of Questions */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Number of Questions</Label>
                  <Select value={numQuestions.toString()} onValueChange={(value) => setNumQuestions(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quiz Type */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Quiz Type</Label>
                  <RadioGroup value={quizType} onValueChange={setQuizType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="multiple_choice" id="multiple_choice" />
                      <Label htmlFor="multiple_choice">Multiple Choice Questions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true_false" id="true_false" />
                      <Label htmlFor="true_false">True/False</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="short_answer" id="short_answer" />
                      <Label htmlFor="short_answer">Short Answers</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Difficulty Level */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generate Button & Preview */}
          <div className="space-y-6">
            <Card className="shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Quiz Generator
                </CardTitle>
                <CardDescription>
                  Ready to create your personalized quiz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleGenerateQuiz}
                  disabled={!file || isGenerating}
                  className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-elegant"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating Quiz...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Quiz
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    AI-powered question generation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Adaptive difficulty levels
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Instant feedback and explanations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizGeneration;