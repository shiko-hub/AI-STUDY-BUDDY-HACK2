import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import {
  Brain,
  FileText,
  BookOpen,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  Zap,
  Target,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI Quiz Generation",
      description: "Upload PDFs and generate custom quizzes instantly with AI-powered question creation",
      action: () => navigate("/quiz"),
    },
    {
      icon: FileText,
      title: "Interactive Flashcards",
      description: "Review key concepts with smart flashcards that adapt to your learning pace",
      action: () => navigate("/flashcards"),
    },
    {
      icon: BookOpen,
      title: "Study Guides",
      description: "Access comprehensive summaries and structured study materials",
      action: () => navigate("/study-guide"),
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning progress and identify areas for improvement",
      action: () => navigate("/progress"),
    },
  ];

  const benefits = [
    "AI-powered question generation from your documents",
    "Personalized learning experience",
    "Track progress across multiple subjects",
    "Interactive study tools and materials",
    "Adaptive difficulty based on performance",
    "Comprehensive analytics and insights",
  ];

  const stats = [
    { label: "Students Helped", value: "10,000+", icon: Users },
    { label: "Quizzes Generated", value: "50,000+", icon: Brain },
    { label: "Success Rate", value: "94%", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              AI Quiz & Study
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Assistant
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your study experience with AI-powered quizzes, flashcards, and personalized learning tools
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-elegant text-lg px-8 py-4"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => navigate("/quiz")}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
              >
                <Zap className="w-5 h-5 mr-2" />
                Try Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Study Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to excel in your studies, powered by artificial intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group cursor-pointer border-border hover:border-primary/50 shadow-card hover:shadow-elegant transition-smooth"
                onClick={feature.action}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-smooth">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="ghost" className="group-hover:text-primary transition-smooth">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-smooth" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Why Choose DocuTutor?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our AI-powered platform revolutionizes the way you study, making learning more efficient and engaging.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button
                  onClick={() => navigate("/dashboard")}
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 text-white shadow-elegant"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Start Learning Now
                </Button>
              </div>
            </div>
            <div className="lg:pl-12">
              <Card className="shadow-elegant border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Ready to Transform Your Study Experience?</CardTitle>
                  <CardDescription className="text-base">
                    Join thousands of students who have improved their learning with our AI-powered tools.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                      <Brain className="w-6 h-6 text-primary" />
                      <div>
                        <div className="font-medium text-foreground">Smart Quiz Generation</div>
                        <div className="text-sm text-muted-foreground">From any PDF document</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      <div>
                        <div className="font-medium text-foreground">Progress Analytics</div>
                        <div className="text-sm text-muted-foreground">Track your improvement</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                      <Award className="w-6 h-6 text-primary" />
                      <div>
                        <div className="font-medium text-foreground">Personalized Learning</div>
                        <div className="text-sm text-muted-foreground">Adaptive to your pace</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Ace Your Next Exam?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get started with DocuTutor today and experience the future of studying.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-elegant text-lg px-8 py-4"
            >
              Access Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => navigate("/quiz")}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
            >
              Generate Your First Quiz
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
