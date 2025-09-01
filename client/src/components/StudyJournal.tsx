import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Heart, TrendingUp, Calendar } from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  reflection: string;
  motivation: string;
}

const StudyJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentReflection, setCurrentReflection] = useState("");
  const [todaysEntry, setTodaysEntry] = useState<JournalEntry | null>(null);

  const motivationalMessages = [
    "Every small step counts towards your bigger goals! 🌟",
    "Your dedication to learning is inspiring. Keep going! 💪",
    "Progress isn't always visible, but it's always happening. ✨",
    "You're building knowledge that will serve you for life! 📚",
    "Consistency beats perfection. You're doing great! 🎯",
  ];

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem('studyJournal');
    if (stored) {
      const parsedEntries = JSON.parse(stored);
      setEntries(parsedEntries);
      const todayEntry = parsedEntries.find((entry: JournalEntry) => entry.date === today);
      setTodaysEntry(todayEntry || null);
    }
  }, []);

  const saveEntry = async () => {
    if (!currentReflection.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    
    try {
      // Get AI motivation message
      const response = await fetch('http://localhost:8000/api/ai/motivation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          preferred_tone: "encouraging"
        })
      });

      if (!response.ok) {
        console.warn('AI motivation service unavailable, using fallback');
        throw new Error('AI service unavailable');
      }

      const result = await response.json();
      let motivation = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      
      if (result.success && result.data.motivation_message) {
        motivation = result.data.motivation_message;
      }

      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: today,
        mood: "productive",
        reflection: currentReflection,
        motivation: motivation,
      };

      const updatedEntries = entries.filter(entry => entry.date !== today);
      updatedEntries.unshift(newEntry);
      
      setEntries(updatedEntries);
      setTodaysEntry(newEntry);
      localStorage.setItem('studyJournal', JSON.stringify(updatedEntries));
      setCurrentReflection("");
    } catch (error) {
      // Fallback to random motivational message if AI fails
      const motivation = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: today,
        mood: "productive",
        reflection: currentReflection,
        motivation: motivation,
      };

      const updatedEntries = entries.filter(entry => entry.date !== today);
      updatedEntries.unshift(newEntry);
      
      setEntries(updatedEntries);
      setTodaysEntry(newEntry);
      localStorage.setItem('studyJournal', JSON.stringify(updatedEntries));
      setCurrentReflection("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
          Study Journal
        </h2>
        <p className="text-muted-foreground">
          Reflect on your learning journey and get personalized motivation
        </p>
      </div>

      {/* Today's Entry */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif">
            <BookOpen className="w-5 h-5 text-primary" />
            Today's Reflection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!todaysEntry ? (
            <>
              <Textarea
                placeholder="How did your study session go today? What did you learn? What challenges did you face?"
                value={currentReflection}
                onChange={(e) => setCurrentReflection(e.target.value)}
                className="min-h-24"
              />
              <Button 
                onClick={saveEntry}
                disabled={!currentReflection.trim()}
                className="bg-gradient-primary hover:opacity-90 text-white"
              >
                Save Reflection
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-accent rounded-lg p-4">
                <p className="text-accent-foreground">{todaysEntry.reflection}</p>
              </div>
              <div className="bg-gradient-primary rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-white" />
                  <span className="text-white font-medium">AI Motivation</span>
                </div>
                <p className="text-white">{todaysEntry.motivation}</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setTodaysEntry(null);
                  setCurrentReflection(todaysEntry.reflection);
                }}
              >
                Edit Today's Entry
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Entries */}
      {entries.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Reflections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{entry.date}</Badge>
                    <Badge className="bg-green-100 text-green-800">
                      {entry.mood}
                    </Badge>
                  </div>
                  <p className="text-foreground text-sm mb-2">{entry.reflection}</p>
                  <p className="text-muted-foreground text-xs italic">
                    💫 {entry.motivation}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Study Insights */}
      <Card className="shadow-card bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif">
            <TrendingUp className="w-5 h-5 text-primary" />
            Your Progress Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {entries.length}
              </div>
              <div className="text-sm text-muted-foreground">Days Journaled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {entries.length > 0 ? Math.round(entries.reduce((acc, entry) => acc + entry.reflection.length, 0) / entries.length) : 0}
              </div>
              <div className="text-sm text-muted-foreground">Avg. Words per Entry</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {entries.filter(entry => entry.date >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]).length}
              </div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyJournal;