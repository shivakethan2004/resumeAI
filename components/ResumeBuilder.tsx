// ResumeBuilder.tsx
import React, { useState, useEffect } from 'react';
import AuthScreen from './AuthScreen';
import AppHeader from './AppHeader';
import Notification from './Notification';
import ActionBar from './ActionBar';
import SectionNavigation from './SectionNavigation';
import HeaderForm from './HeaderForm';
import SkillsForm from './SkillsForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import ProjectsForm from './ProjectsForm';
import CertificationsForm from './CertificationsForm';
import ResumePreview from './ResumePreview';
import { 
  User, 
  Resume, 
  ResumeData, 
  AuthMode, 
  ActiveTab, 
  ActiveSection, 
  Template, 
  NotificationType 
} from '@/types/types';

// Mock authentication service
const mockAuth = {
  login: async (email: string, password: string): Promise<User> => {
    return { id: '1', email, credits: 50 };
  },
  signup: async (email: string, password: string): Promise<User> => {
    return { id: '1', email, credits: 50 };
  },
  logout: () => {}
};

const initialResumeData: ResumeData = {
  header: { name: '', email: '', phone: '', linkedin: '', github: '' },
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certifications: []
};

export default function ResumeBuilder() {
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [credits, setCredits] = useState(50);
  
  const [activeTab, setActiveTab] = useState<ActiveTab>('builder');
  const [activeSection, setActiveSection] = useState<ActiveSection>('header');
  const [template, setTemplate] = useState<Template>('modern');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<{ type: NotificationType; message: string } | null>(null);

  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  useEffect(() => {
    if (user) {
      loadResumes();
    }
  }, [user]);

  const loadResumes = () => {
    const mockResume: Resume = {
      resumeId: 'resume1',
      userId: user?.id || '',
      credits: 50,
      resumeData: resumeData,
      htmlTemplate: '',
      lastUpdated: new Date().toISOString()
    };
    setResumes([mockResume]);
    setCurrentResumeId('resume1');
  };

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAuth = async () => {
    try {
      if (authMode === 'login') {
        const loggedInUser = await mockAuth.login(email, password);
        setUser(loggedInUser);
        setCredits(loggedInUser.credits);
        showNotification('success', 'Logged in successfully!');
      } else {
        const newUser = await mockAuth.signup(email, password);
        setUser(newUser);
        setCredits(newUser.credits);
        showNotification('success', 'Account created successfully!');
      }
    } catch (error) {
      showNotification('error', 'Authentication failed');
    }
  };

  const handleLogout = () => {
    mockAuth.logout();
    setUser(null);
    setResumes([]);
    setCurrentResumeId(null);
    showNotification('info', 'Logged out successfully');
  };

  const handleAIGenerate = async () => {
    if (credits < 5) {
      showNotification('error', 'Insufficient credits! You need 5 credits for AI operations.');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      const aiEnhanced = { ...resumeData };
      
      if (activeSection === 'summary' && !resumeData.summary) {
        aiEnhanced.summary = 'Results-driven professional with expertise in software development and AI integration. Proven track record of delivering scalable solutions that drive business value. Strong technical skills combined with effective communication and leadership abilities.';
      }
      
      if (activeSection === 'experience' && resumeData.experience.length > 0) {
        aiEnhanced.experience = resumeData.experience.map(exp => ({
          ...exp,
          achievements: exp.achievements.map(ach => 
            ach.match(/\d/) ? ach : `Improved ${ach} by 30% through strategic implementation`
          )
        }));
      }

      setResumeData(aiEnhanced);
      setCredits(credits - 5);
      setIsProcessing(false);
      showNotification('success', 'AI enhancement completed! 5 credits used.');
    }, 2000);
  };

  const handleValidate = async () => {
    if (credits < 5) {
      showNotification('error', 'Insufficient credits!');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      const issues: string[] = [];
      
      if (!resumeData.header.name) issues.push('Missing name in header');
      if (!resumeData.summary) issues.push('Missing professional summary');
      if (resumeData.skills.length < 5) issues.push('Add more skills (recommended: 8-12)');
      if (resumeData.experience.length === 0) issues.push('Add work experience');
      
      const hasQuantifiedAchievements = resumeData.experience.some(exp =>
        exp.achievements.some(ach => /\d/.test(ach))
      );
      if (!hasQuantifiedAchievements) issues.push('Quantify achievements with metrics');

      setCredits(credits - 5);
      setIsProcessing(false);
      
      if (issues.length === 0) {
        showNotification('success', '✓ Resume follows best practices! 5 credits used.');
      } else {
        showNotification('error', `Issues found: ${issues.join(', ')}. 5 credits used.`);
      }
    }, 1500);
  };

  const handleSave = () => {
    showNotification('success', 'Resume saved successfully!');
  };

  const handleExport = () => {
    showNotification('info', 'PDF export would use html2pdf.js in production');
  };

  const renderFormContent = () => {
    switch (activeSection) {
      case 'header':
        return <HeaderForm header={resumeData.header} onChange={(header) => setResumeData({ ...resumeData, header })} />;
      case 'summary':
        return (
          <div>
            <textarea
              placeholder="Professional summary (2-3 sentences highlighting your key qualifications)"
              value={resumeData.summary}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-sm text-gray-500 mt-2">💡 Tip: Use AI Enhance to generate a professional summary</p>
          </div>
        );
      case 'skills':
        return <SkillsForm skills={resumeData.skills} onChange={(skills) => setResumeData({ ...resumeData, skills })} />;
      case 'experience':
        return <ExperienceForm experience={resumeData.experience} onChange={(experience) => setResumeData({ ...resumeData, experience })} />;
      case 'education':
        return <EducationForm education={resumeData.education} onChange={(education) => setResumeData({ ...resumeData, education })} />;
      case 'projects':
        return <ProjectsForm projects={resumeData.projects} onChange={(projects) => setResumeData({ ...resumeData, projects })} />;
      case 'certifications':
        return <CertificationsForm certifications={resumeData.certifications} onChange={(certifications) => setResumeData({ ...resumeData, certifications })} />;
      default:
        return null;
    }
  };

  // Auth Screen
  if (!user) {
    return (
      <AuthScreen
        authMode={authMode}
        setAuthMode={setAuthMode}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onAuth={handleAuth}
      />
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <AppHeader user={user} credits={credits} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <ActionBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isProcessing={isProcessing}
          onAIGenerate={handleAIGenerate}
          onValidate={handleValidate}
          onSave={handleSave}
          onExport={handleExport}
        />

        {activeTab === 'builder' ? (
          <div className="grid grid-cols-12 gap-6">
            <SectionNavigation
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />

            <div className="col-span-9 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize">{activeSection}</h2>
              {renderFormContent()}
            </div>
          </div>
        ) : (
          <ResumePreview
            resumeData={resumeData}
            template={template}
            setTemplate={setTemplate}
          />
        )}
      </div>
    </div>
  );
}