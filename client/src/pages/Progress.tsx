import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Brain,
  Target,
  Clock,
  Award,
  BookOpen,
  BarChart3,
  Calendar,
} from "lucide-react";

const ProgressTracking = () => {
  const overallStats = {
    totalQuizzes: 24,
    averageScore: 87,
    studyStreak: 7,
    totalStudyTime: 45.5,
  };

  const subjectProgress = [
    { subject: "Mathematics", score: 92, completed: 15, total: 20, improvement: "+5%" },
    { subject: "Biology", score: 84, completed: 12, total: 15, improvement: "+8%" },
    { subject: "Physics", score: 78, completed: 8, total: 12, improvement: "+12%" },
    { subject: "Chemistry", score: 89, completed: 10, total: 14, improvement: "+3%" },
    { subject: "Computer Science", score: 95, completed: 18, total: 20, improvement: "+7%" },
  ];

  const recentActivity = [
    { type: "Quiz", subject: "Mathematics", score: 94, date: "Today", time: "2:30 PM" },
    { type: "Flashcards", subject: "Biology", score: 88, date: "Yesterday", time: "5:45 PM" },
    { type: "Study Guide", subject: "Physics", score: 85, date: "2 days ago", time: "3:15 PM" },
    { type: "Quiz", subject: "Chemistry", score: 91, date: "3 days ago", time: "4:20 PM" },
  ];

  const weeklyProgress = [
    { day: "Mon", quizzes: 3, score: 85 },
    { day: "Tue", quizzes: 4, score: 88 },
    { day: "Wed", quizzes: 2, score: 92 },
    { day: "Thu", quizzes: 5, score: 84 },
    { day: "Fri", quizzes: 3, score: 90 },
    { day: "Sat", quizzes: 4, score: 87 },
    { day: "Sun", quizzes: 3, score: 89 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 80) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const maxQuizzes = Math.max(...weeklyProgress.map(d => d.quizzes));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Progress Tracking
          </h1>
          <p className="text-xl text-muted-foreground">
            Monitor your learning progress and identify areas for improvement
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card border-primary/20 hover:shadow-elegant transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Quizzes</p>
                  <p className="text-3xl font-bold text-primary">{overallStats.totalQuizzes}</p>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-primary/20 hover:shadow-elegant transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold text-primary">{overallStats.averageScore}%</p>
                  <p className="text-xs text-green-600 mt-1">+5% from last month</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-primary/20 hover:shadow-elegant transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Streak</p>
                  <p className="text-3xl font-bold text-primary">{overallStats.studyStreak}</p>
                  <p className="text-xs text-muted-foreground mt-1">days</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-primary/20 hover:shadow-elegant transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Time</p>
                  <p className="text-3xl font-bold text-primary">{overallStats.totalStudyTime}h</p>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Progress and Weekly Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Subject Progress */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Subject Progress
              </CardTitle>
              <CardDescription>
                Your performance across different subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjectProgress.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">{subject.subject}</span>
                        <Badge variant="outline" className={getScoreBadgeVariant(subject.score)}>
                          {subject.score}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {subject.completed}/{subject.total}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {subject.improvement}
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={(subject.completed / subject.total) * 100} 
                      className="h-2 bg-muted"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Weekly Activity
              </CardTitle>
              <CardDescription>
                Your quiz activity over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-muted-foreground">
                      {day.day}
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex-1 bg-muted rounded-full h-4 relative overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary rounded-full transition-smooth"
                          style={{ width: `${(day.quizzes / maxQuizzes) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {day.quizzes}
                        </span>
                        <Badge variant="outline" className={getScoreBadgeVariant(day.score)}>
                          {day.score}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest study sessions and quiz results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border border-border/50 hover:shadow-card transition-smooth"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                      {activity.type === "Quiz" ? (
                        <Brain className="w-5 h-5 text-white" />
                      ) : activity.type === "Flashcards" ? (
                        <BookOpen className="w-5 h-5 text-white" />
                      ) : (
                        <Target className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                        <span className="font-medium text-foreground">
                          {activity.subject}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.date} at {activity.time}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${getScoreBadgeVariant(activity.score)} border`}>
                    {activity.score}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracking;