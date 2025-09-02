import React from 'react';
import { Clock, Star, Users, ChevronRight, Play } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Project } from '../../lib/api';

interface ProjectCardProps {
  project: Project;
  onStart: (projectId: number) => void;
  userType: 'candidate' | 'company';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onStart, userType }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-orange-600 bg-orange-100';
      case 'expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="p-6" hover>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">{project.title[0]}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(project.difficulty)}`}>
            {project.difficulty}
          </span>
        </div>
        <div className="flex items-center text-yellow-500">
          <Star className="w-5 h-5 mr-1" />
          <span className="font-semibold">{project.estimatedScore}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-violet-100 text-violet-700 text-sm rounded-full font-medium">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>{project.timeLimit} minutes</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          <span>{project.completions} completed</span>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          <span>Learn More</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
        {userType === 'candidate' && (
          <Button onClick={() => onStart(project.id)} className="flex-1">
            <Play className="w-4 h-4 mr-2" />
            Start Challenge
          </Button>
        )}
      </div>
    </Card>
  );
};
