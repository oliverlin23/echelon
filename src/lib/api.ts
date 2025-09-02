export interface User {
  id: number;
  email: string;
  type: 'company' | 'candidate';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  timeLimit: number;
  difficulty: string;
  tags: string[];
  estimatedScore: number;
  completions: number;
}

export interface Submission {
  id: number;
  projectTitle: string;
  submittedAt: string;
  score: number;
  status: string;
  rank: string;
  feedback: string;
}

// Mock API functions
export const api = {
  async login(email: string, password: string): Promise<User> {
    if (email && password) {
      const user: User = { 
        id: 1, 
        email, 
        type: email.includes('company') ? 'company' : 'candidate' 
      };
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid credentials');
  },
  
  async register(userData: Partial<User>): Promise<User> {
    const user: User = { 
      id: Date.now(), 
      email: userData.email || '',
      type: userData.type || 'candidate'
    };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },
  
  async getProjects(): Promise<Project[]> {
    return [
      {
        id: 1,
        title: 'Build a Microservices Architecture',
        description: 'Design and implement a distributed system with service discovery, API gateway, and inter-service communication.',
        timeLimit: 120,
        difficulty: 'Expert',
        tags: ['Microservices', 'Docker', 'API Gateway'],
        estimatedScore: 95,
        completions: 234
      },
      {
        id: 2,
        title: 'Real-time Trading Dashboard',
        description: 'Create a high-performance trading interface with live data streams, charts, and order execution.',
        timeLimit: 120,
        difficulty: 'Advanced',
        tags: ['React', 'WebSockets', 'D3.js'],
        estimatedScore: 88,
        completions: 412
      },
      {
        id: 3,
        title: 'ML-Powered Recommendation Engine',
        description: 'Build a recommendation system using collaborative filtering and machine learning algorithms.',
        timeLimit: 90,
        difficulty: 'Advanced',
        tags: ['Python', 'ML', 'Algorithms'],
        estimatedScore: 92,
        completions: 156
      }
    ];
  },
  
  async getSubmissions(): Promise<Submission[]> {
    return [
      {
        id: 1,
        projectTitle: 'Real-time Trading Dashboard',
        submittedAt: '2024-01-15',
        score: 94,
        status: 'evaluated',
        rank: '12th percentile',
        feedback: 'Exceptional implementation with clean architecture'
      },
      {
        id: 2,
        projectTitle: 'Build a Microservices Architecture',
        submittedAt: '2024-01-12',
        score: 87,
        status: 'evaluated',
        rank: '25th percentile',
        feedback: 'Good understanding of distributed systems principles'
      }
    ];
  }
};
