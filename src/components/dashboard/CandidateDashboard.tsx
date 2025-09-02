'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Target, Award, Zap, Star, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { GradientText } from '../ui/GradientText';
import { ProjectCard } from '../projects/ProjectCard';
import { api, Project, Submission } from '../../lib/api';

export const CandidateDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    const loadData = async () => {
      const [projectsData, submissionsData] = await Promise.all([
        api.getProjects(),
        api.getSubmissions()
      ]);
      setProjects(projectsData);
      setSubmissions(submissionsData);
    };
    loadData();
  }, []);

  const handleStartProject = (projectId: number) => {
    alert(`Starting project ${projectId}. In a real app, this would navigate to the coding environment.`);
  };

  const averageScore = submissions.length > 0 
    ? Math.round(submissions.reduce((acc, sub) => acc + sub.score, 0) / submissions.length)
    : 0;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome to <GradientText>Echelon</GradientText>
        </h1>
        <p className="text-xl text-gray-600">Elite coding challenges for exceptional developers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Trophy}
          label="Average Score"
          value={`${averageScore}/100`}
          change="+5.2% this month"
          trend="up"
        />
        <StatCard
          icon={Target}
          label="Challenges Completed"
          value={submissions.length}
          change="+2 this week"
          trend="up"
        />
        <StatCard
          icon={Award}
          label="Current Rank"
          value="Top 15%"
          change="↑ 3 positions"
          trend="up"
        />
        <StatCard
          icon={Zap}
          label="Streak"
          value="12 days"
          change="Personal best!"
          trend="up"
        />
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'projects' 
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg' 
              : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
          }`}
        >
          Available Challenges
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'submissions' 
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg' 
              : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
          }`}
        >
          My Submissions
        </button>
      </div>

      {activeTab === 'projects' && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onStart={handleStartProject}
              userType="candidate"
            />
          ))}
        </div>
      )}

      {activeTab === 'submissions' && (
        <div className="space-y-6">
          {submissions.map((submission) => (
            <Card key={submission.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{submission.projectTitle}</h3>
                  <p className="text-gray-600 mb-4">Submitted on {new Date(submission.submittedAt).toLocaleDateString()}</p>
                  <p className="text-gray-700 italic">"{submission.feedback}"</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end mb-2">
                    <Star className="w-6 h-6 text-yellow-500 mr-2" />
                    <span className="text-3xl font-bold text-gray-900">{submission.score}</span>
                    <span className="text-gray-600 ml-1">/100</span>
                  </div>
                  <div className="flex items-center justify-end text-sm text-gray-600 mb-2">
                    <Trophy className="w-4 h-4 mr-1 text-violet-500" />
                    <span className="font-semibold">{submission.rank}</span>
                  </div>
                  <div className="flex items-center justify-end text-green-600">
                    <CheckCircle className="w-5 h-5 mr-1" />
                    <span className="capitalize font-semibold">{submission.status}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
