import type React from "react"
import type { ResumeData } from "@/types/resume"
import type { ColorScheme } from "@/types/color-schemes"

interface CleanMinimalTemplateProps {
  data: ResumeData
  colorScheme: ColorScheme
}

export const CleanMinimalTemplate: React.FC<CleanMinimalTemplateProps> = ({ data, colorScheme }) => {
  return (
    <div className={`${colorScheme.background} p-8 max-w-[800px] mx-auto font-serif`} id="resume-preview">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wider mb-2">
          {data.personalInfo.fullName || "FIRST LAST"}
        </h1>
        <p className="text-sm text-gray-600 mb-2">
          {data.personalInfo.location} | P: {data.personalInfo.phone} | {data.personalInfo.email}
        </p>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-400 pb-1">EDUCATION</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{edu.school}</h3>
                <p className="text-gray-700">{edu.degree}</p>
                {edu.fieldOfStudy && <p className="text-gray-600 text-sm">{edu.fieldOfStudy}</p>}
                {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
              </div>
              <p className="text-gray-600 text-sm">{edu.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-400 pb-1">WORK EXPERIENCE</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">{exp.company}</h3>
                <p className="text-gray-700 italic">{exp.title}</p>
              </div>
              <p className="text-gray-600 text-sm">{exp.duration}</p>
            </div>
            {exp.description && <p className="text-gray-700 text-sm mb-2">{exp.description}</p>}
            {exp.bullets && exp.bullets.length > 0 && (
              <ul className="list-disc pl-5 space-y-1">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-gray-700 text-sm">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Projects */}
      {data.projects && data.projects.some((project) => project.name || project.description) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-400 pb-1">
            VOLUNTEERING & UNIVERSITY PROJECTS
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              {(project.name || project.description) && (
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    {project.link && (
                      <a href={project.link} className="text-gray-600 text-sm hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-gray-600 text-sm font-medium mb-1">{project.technologies}</p>
                  )}
                  {project.description && <p className="text-gray-700 text-sm">{project.description}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-400 pb-1">ADDITIONAL</h2>
          <div>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Technical Skills:</span> {data.skills.join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
