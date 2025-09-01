import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  FileText,
  BookOpen,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  Upload,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const featureCards = [
    {
      title: "Generate Quiz",
      description: "Upload your PDFs and create custom quizzes instantly",
      icon: Brain,
      action: () => navigate("/quiz"),
      gradient: "bg-gradient-primary",
      stats: "12 quizzes generated",
    },
    {
      title: "Flashcards",
      description: "Review key concepts with interactive flashcards",
      icon: FileText,
      action: () => navigate("/flashcards"),
      gradient: "bg-gradient-primary",
      stats: "45 cards reviewed",
    },
    {
      title: "Study Guides",
      description: "Access comprehensive study materials and summaries",
      icon: BookOpen,
      action: () => navigate("/study-guide"),
      gradient: "bg-gradient-primary",
      stats: "8 guides created",
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning progress and identify strengths",
      icon: TrendingUp,
      action: () => navigate("/progress"),
      gradient: "bg-gradient-primary",
      stats: "85% average score",
    },
  ];

  const recentActivity = [
    { type: "Quiz", title: "Mathematics Chapter 5", score: "92%", time: "2 hours ago" },
    { type: "Flashcards", title: "Biology Terms", score: "15/20", time: "1 day ago" },
    { type: "Study Guide", title: "History Summary", score: "Complete", time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
            Welcome Back!
          </h1>
          <p className="text-xl text-muted-foreground">
            Continue your learning journey with AI-powered study tools
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Quizzes</p>
                  <p className="text-2xl font-bold text-primary">24</p>
                </div>
                <Brain className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Time</p>
                  <p className="text-2xl font-bold text-primary">12.5h</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold text-primary">87%</p>
                </div>
                <Star className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Streak</p>
                  <p className="text-2xl font-bold text-primary">7 days</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featureCards.map((card, index) => (
            <Card
              key={index}
              className="group cursor-pointer border-border hover:border-primary/50 shadow-card hover:shadow-elegant transition-smooth overflow-hidden"
              onClick={card.action}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-12 h-12 rounded-lg ${card.gradient} flex items-center justify-center shadow-glow`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
                </div>
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <CardDescription className="text-sm">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="text-xs">
                  {card.stats}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your latest study sessions and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border border-border/50"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                        <div>
                          <p className="font-medium text-foreground">
                            {activity.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">
                        {activity.score}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Get started with your next study session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => navigate("/quiz")}
                  className="w-full bg-gradient-primary hover:opacity-90 text-white shadow-elegant"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New PDF
                </Button>
                <Button
                  onClick={() => navigate("/flashcards")}
                  variant="outline"
                  className="w-full"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Review Flashcards
                </Button>
                <Button
                  onClick={() => navigate("/progress")}
                  variant="outline"
                  className="w-full"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;