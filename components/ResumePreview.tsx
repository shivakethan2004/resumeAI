// ResumePreview.tsx
import { ResumeData, Template } from '@/types/types';
import React from 'react';
import { GitBranch, Mail, Phone,  } from 'lucide-react';
import { TEMPLATE_OPTIONS } from '@/types/templates';

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: Template;
  setTemplate: (template: Template) => void;
}

export default function ResumePreview({ resumeData, template, setTemplate }: ResumePreviewProps) {
  const selectedTemplate = TEMPLATE_OPTIONS.find((t) => t.key === template)!;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Template Selector */}
      <div className="mb-6 flex items-center gap-4">
        <span className="font-medium text-gray-700">Template:</span>
        <div className="flex gap-2">
          {TEMPLATE_OPTIONS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTemplate(t.key)}
              className={`px-4 py-2 rounded-lg capitalize transition ${
                template === t.key ? t.labelColor : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Resume Container */}
      <div className={`max-w-5xl mx-auto bg-white shadow-lg flex border-t-4 ${selectedTemplate.borderClass}`}>
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-50 p-6 flex flex-col gap-6">
          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-bold mb-2">Contact</h2>
            <div className="flex flex-col gap-2 text-gray-700 text-sm">
              {resumeData.header.email && (
                <div className="flex items-center gap-2"><Mail size={16} />{resumeData.header.email}</div>
              )}
              {resumeData.header.phone && (
                <div className="flex items-center gap-2"><Phone size={16} />{resumeData.header.phone}</div>
              )}
              {resumeData.header.linkedin && (
                <div className="flex items-center gap-2"><Phone size={16} />{resumeData.header.linkedin}</div>
              )}
              {resumeData.header.github && (
                <div className="flex items-center gap-2"><GitBranch size={16} />{resumeData.header.github}</div>
              )}
            </div>
          </div>

          {/* Skills */}
          {resumeData.skills?.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications?.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-2">Certifications</h2>
              <ul className="text-gray-700 text-sm list-disc ml-5">
                {resumeData.certifications.map((cert, i) => (
                  <li key={i}>{cert.name}{cert.year && ` (${cert.year})`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div className="w-2/3 p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className={`${selectedTemplate.headerClass} mb-1`}>
              {resumeData.header.name || 'Your Name'}
            </h1>
            {resumeData.summary && (
              <p className="text-gray-700">{resumeData.summary}</p>
            )}
          </div>

          {/* Experience */}
          {resumeData.experience?.length > 0 && (
            <div>
              <h2 className={`${selectedTemplate.sectionTitleClass} mb-3`}>Experience</h2>
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800">{exp.title}</h3>
                    <span className="text-sm text-gray-600">{exp.years}</span>
                  </div>
                  <p className="text-gray-700 italic">{exp.company}</p>
                  <ul className="list-disc ml-5 text-gray-700 mt-1">
                    {exp.achievements.map((a, j) => a && <li key={j}>{a}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {resumeData.education?.length > 0 && (
            <div>
              <h2 className={`${selectedTemplate.sectionTitleClass} mb-3`}>Education</h2>
              {resumeData.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <span className="text-sm text-gray-600">{edu.year}</span>
                  </div>
                  <p className="text-gray-700">{edu.school}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {resumeData.projects?.length > 0 && (
            <div>
              <h2 className={`${selectedTemplate.sectionTitleClass} mb-3`}>Projects</h2>
              {resumeData.projects.map((proj, i) => (
                <div key={i} className="mb-2">
                  <h3 className="font-bold text-gray-800">{proj.name}</h3>
                  <p className="text-gray-700">{proj.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
