import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Leaf, Zap } from "lucide-react";

export type StudyMood = 'focus' | 'relax' | 'sprint';

interface MoodSelectorProps {
  selectedMood: StudyMood;
  onMoodChange: (mood: StudyMood) => void;
}

const MoodSelector = ({ selectedMood, onMoodChange }: MoodSelectorProps) => {
  const moods = [
    {
      id: 'focus' as StudyMood,
      name: 'Focus Mode',
      description: 'Deep concentration with minimal distractions',
      icon: Brain,
      gradient: 'bg-gradient-focus',
      color: 'border-primary',
    },
    {
      id: 'relax' as StudyMood,
      name: 'Relax Mode',
      description: 'Gentle pace with calming interface',
      icon: Leaf,
      gradient: 'bg-gradient-relax',
      color: 'border-green-400',
    },
    {
      id: 'sprint' as StudyMood,
      name: 'Sprint Mode',
      description: 'Quick sessions with energetic feedback',
      icon: Zap,
      gradient: 'bg-gradient-sprint',
      color: 'border-secondary',
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
        Choose Your Study Mood
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.id;
          return (
            <Card
              key={mood.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                isSelected 
                  ? `ring-2 ring-primary shadow-elegant ${mood.color}` 
                  : 'hover:shadow-card'
              }`}
              onClick={() => onMoodChange(mood.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 ${mood.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-serif font-semibold text-foreground mb-2">
                  {mood.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {mood.description}
                </p>
                {isSelected && (
                  <Badge className="bg-primary text-primary-foreground">
                    Selected
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSelector;