import type React from "react"
import type { ResumeData } from "@/types/resume"
import type { ColorScheme } from "@/types/color-schemes"

interface ProfessionalTemplateProps {
  data: ResumeData
  colorScheme: ColorScheme
}

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data, colorScheme }) => {
  return (
    <div className={`${colorScheme.background} p-8 max-w-[800px] mx-auto font-serif`} id="resume-preview">
      {/* Header */}
      <div className="mb-6">
        <div className="text-right">
          <h1 className={`text-3xl font-bold ${colorScheme.primary} uppercase mb-1 tracking-wide`}>
            {data.personalInfo.fullName || "YOUR NAME"}
          </h1>
          <p className={`text-lg ${colorScheme.secondary} mb-2`}>{data.personalInfo.title || "Professional Title"}</p>

          <p className={`text-sm ${colorScheme.textLight}`}>{data.personalInfo.email}</p>
          {data.personalInfo.linkedin && (
            <p className={`text-sm ${colorScheme.textLight}`}>{data.personalInfo.linkedin}</p>
          )}
          <p className={`text-sm ${colorScheme.textLight}`}>
            {data.personalInfo.location} {data.personalInfo.phone && `| ${data.personalInfo.phone}`}
          </p>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <p className={`${colorScheme.text} leading-relaxed text-justify`}>{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      <div className="mb-8">
        <h2 className={`text-xl font-bold ${colorScheme.primary} mb-4 ${colorScheme.border} border-b pb-1`}>
          Work Experience
        </h2>

        {data.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className={`font-bold ${colorScheme.primary}`}>{exp.title}</h3>
                <p className={`italic ${colorScheme.secondary}`}>
                  {exp.company} {exp.location && `| ${exp.location}`}
                </p>
              </div>
              <p className={`${colorScheme.textLight} text-right text-sm`}>{exp.duration}</p>
            </div>

            {exp.description && <p className={`${colorScheme.text} my-2 text-sm leading-relaxed`}>{exp.description}</p>}

            {/* Bullet points */}
            {exp.bullets && exp.bullets.length > 0 && (
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className={`${colorScheme.text} text-sm leading-relaxed`}>
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
        <h2 className={`text-xl font-bold ${colorScheme.primary} mb-4 ${colorScheme.border} border-b pb-1`}>
          Education
        </h2>

        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-bold ${colorScheme.primary}`}>{edu.school}</h3>
                <p className={colorScheme.text}>
                  <span className="font-medium">{edu.degree}</span> {edu.fieldOfStudy && `· ${edu.fieldOfStudy}`}
                </p>
              </div>
              <p className={`${colorScheme.textLight} text-right text-sm`}>{edu.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Skills - Optional section */}
      {data.skills && data.skills.length > 0 && (
        <div className="mt-8">
          <h2 className={`text-xl font-bold ${colorScheme.primary} mb-4 ${colorScheme.border} border-b pb-1`}>
            Skills
          </h2>
          <p className={`${colorScheme.text} text-sm`}>{data.skills.join(", ")}</p>
        </div>
      )}

      {data.projects && data.projects.some((project) => project.name || project.description) && (
        <div className="mt-8">
          <h2 className={`text-xl font-bold ${colorScheme.primary} mb-4 ${colorScheme.border} border-b pb-1`}>
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index}>
                {(project.name || project.description) && (
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-bold ${colorScheme.primary}`}>{project.name}</h3>
                      {project.link && (
                        <a href={project.link} className={`${colorScheme.accent} text-sm hover:underline`}>
                          View Project
                        </a>
                      )}
                    </div>
                    {project.technologies && (
                      <p className={`${colorScheme.secondary} text-sm font-medium mb-1`}>{project.technologies}</p>
                    )}
                    {project.description && (
                      <p className={`${colorScheme.text} text-sm leading-relaxed`}>{project.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
