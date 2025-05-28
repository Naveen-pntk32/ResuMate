import type React from "react"
import type { ResumeData } from "@/types/resume"
import type { ColorScheme } from "@/types/color-schemes"

interface TechSpecialistTemplateProps {
  data: ResumeData
  colorScheme: ColorScheme
}

export const TechSpecialistTemplate: React.FC<TechSpecialistTemplateProps> = ({ data, colorScheme }) => {
  return (
    <div
      className={`${colorScheme.background} p-8 max-w-[800px] mx-auto font-sans border-2 border-black`}
      id="resume-preview"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-black mb-2">{data.personalInfo.fullName || "JANE KNIGHTLEY"}</h1>
        <p className="text-2xl text-orange-500 mb-4">{data.personalInfo.title || "IT Technician"}</p>

        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <span>📧 {data.personalInfo.email}</span>
          <span>📞 {data.personalInfo.phone}</span>
          <span>📍 {data.personalInfo.location}</span>
          {data.personalInfo.linkedin && <span className="text-blue-600">🔗 LinkedIn</span>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2">
          {/* Work Experience */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-1">WORK EXPERIENCE</h2>

            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-bold text-black">{exp.title}</h3>
                <p className="text-orange-500 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {exp.duration} | {exp.location}
                </p>

                {exp.description && <p className="text-gray-800 text-sm mb-2">{exp.description}</p>}

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-gray-800 text-sm">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-1">EDUCATION</h2>

            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-black">{edu.degree}</h3>
                <p className="text-orange-500 font-medium">{edu.school}</p>
                <p className="text-sm text-gray-600">
                  {edu.year} | {edu.fieldOfStudy}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Objective */}
          {data.personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-1">OBJECTIVE</h2>
              <p className="text-gray-800 text-sm leading-relaxed">{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-1">SKILLS</h2>
              <ul className="space-y-2">
                {data.skills.map((skill, index) => (
                  <li key={index} className="text-gray-800 text-sm">
                    • {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.some((project) => project.name || project.description) && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-1">PROJECTS</h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  {(project.name || project.description) && (
                    <div>
                      <h3 className="font-bold text-black text-sm">{project.name}</h3>
                      {project.technologies && <p className="text-orange-500 text-xs mb-1">{project.technologies}</p>}
                      {project.description && <p className="text-gray-800 text-xs">{project.description}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
