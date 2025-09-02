'use client';

import React, { useState } from 'react';
import { Users, Target, Building, Trophy, Star, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { StatCard } from '../ui/StatCard';
import { GradientText } from '../ui/GradientText';
import { Button } from '../ui/Button';

interface Candidate {
  id: number;
  name: string;
  email: string;
  score: number;
  projects: number;
  skills: string[];
  rank: string;
  experience: string;
  location: string;
}

export const CompanyDashboard: React.FC = () => {
  const [candidates] = useState<Candidate[]>([
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      score: 96,
      projects: 5,
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      rank: 'Top 5%',
      experience: '5 years',
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      email: 'marcus.r@email.com',
      score: 92,
      projects: 4,
      skills: ['Vue.js', 'PostgreSQL', 'Go', 'Docker'],
      rank: 'Top 8%',
      experience: '4 years',
      location: 'Austin, TX'
    },
    {
      id: 3,
      name: 'Aisha Patel',
      email: 'aisha.patel@email.com',
      score: 89,
      projects: 6,
      skills: ['Angular', 'Java', 'Kubernetes', 'MongoDB'],
      rank: 'Top 12%',
      experience: '6 years',
      location: 'Seattle, WA'
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Company Dashboard
        </h1>
        <p className="text-xl text-gray-600">Discover and recruit elite engineering talent</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          label="Active Candidates"
          value="1,247"
          change="+23% this month"
          trend="up"
        />
        <StatCard
          icon={Target}
          label="Matches Found"
          value="34"
          change="+8 this week"
          trend="up"
        />
        <StatCard
          icon={Building}
          label="Interviews Scheduled"
          value="12"
          change="5 pending"
        />
        <StatCard
          icon={Trophy}
          label="Hires Made"
          value="7"
          change="+2 this month"
          trend="up"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          <GradientText>Top Recommended Candidates</GradientText>
        </h2>
        <div className="space-y-6">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className="p-6" hover>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                      <p className="text-gray-600">{candidate.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500 font-medium">Experience</p>
                      <p className="text-gray-900 font-semibold">{candidate.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Location</p>
                      <p className="text-gray-900 font-semibold">{candidate.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Projects</p>
                      <p className="text-gray-900 font-semibold">{candidate.projects} completed</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-violet-100 text-violet-700 text-sm rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-right ml-6">
                  <div className="flex items-center justify-end mb-2">
                    <Star className="w-6 h-6 text-yellow-500 mr-2" />
                    <span className="text-3xl font-bold text-gray-900">{candidate.score}</span>
                    <span className="text-gray-600 ml-1">/100</span>
                  </div>
                  <div className="flex items-center justify-end text-sm font-semibold text-violet-600 mb-4">
                    <Trophy className="w-4 h-4 mr-1" />
                    <span>{candidate.rank}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button size="sm">
                      Contact
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
