import type React from "react"
import type { ResumeData } from "@/types/resume"
import type { ColorScheme } from "@/types/color-schemes"
import Image from "next/image"

interface BusinessExecutiveTemplateProps {
  data: ResumeData
  colorScheme: ColorScheme
}

export const BusinessExecutiveTemplate: React.FC<BusinessExecutiveTemplateProps> = ({ data, colorScheme }) => {
  return (
    <div className={`${colorScheme.background} p-8 max-w-[800px] mx-auto font-sans`} id="resume-preview">
      {/* Header */}
      <div className="flex items-start mb-8">
        {/* Profile Photo */}
        {data.personalInfo.profilePhoto && (
          <div className="w-32 h-32 mr-6 flex-shrink-0">
            <Image
              src={data.personalInfo.profilePhoto || "/placeholder.svg"}
              alt="Profile"
              width={128}
              height={128}
              className="object-cover w-full h-full rounded"
            />
          </div>
        )}

        {/* Header Info */}
        <div className="flex-1">
          <h1 className={`text-4xl font-bold ${colorScheme.primary} mb-2`}>
            {data.personalInfo.fullName || "JACK KEROUAC"}
          </h1>
          <p className={`text-xl ${colorScheme.secondary} mb-4`}>{data.personalInfo.title || "PROJECT MANAGER"}</p>

          {/* Profile Summary */}
          {data.personalInfo.summary && (
            <div className="mb-4">
              <h3 className={`font-bold ${colorScheme.primary} mb-2`}>PROFILE</h3>
              <p className={`${colorScheme.text} text-sm leading-relaxed`}>{data.personalInfo.summary}</p>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="ml-6 bg-gray-100 p-4 rounded">
          <h3 className={`font-bold ${colorScheme.primary} mb-3`}>CONTACT</h3>
          <div className="space-y-2 text-sm">
            <p className={colorScheme.text}>{data.personalInfo.phone}</p>
            <p className={colorScheme.text}>{data.personalInfo.email}</p>
            <p className={colorScheme.text}>{data.personalInfo.location}</p>
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="mt-6">
              <h3 className={`font-bold ${colorScheme.primary} mb-3`}>SKILLS</h3>
              <ul className="space-y-1">
                {data.skills.slice(0, 6).map((skill, index) => (
                  <li key={index} className={`${colorScheme.text} text-sm`}>
                    • {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Professional Experience */}
      <div className="mb-8">
        <h2 className={`text-xl font-bold ${colorScheme.primary} mb-4 border-b-2 ${colorScheme.border} pb-2`}>
          PROFESSIONAL EXPERIENCE
        </h2>

        {data.experience.map((exp, index) => (
          <div key={index} className="mb-6 flex">
            {/* Year Column */}
            <div className="w-20 flex-shrink-0 mr-6">
              <div className="bg-gray-200 text-center py-2 px-1 text-xs font-bold transform -rotate-90 origin-center">
                {exp.duration.split(" ")[0] || "20XX"}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="mb-2">
                <h3 className={`font-bold ${colorScheme.primary}`}>{exp.company}</h3>
                <p className={`${colorScheme.secondary} italic`}>{exp.title}</p>
                <p className={`${colorScheme.textLight} text-sm`}>{exp.duration}</p>
              </div>

              {exp.description && <p className={`${colorScheme.text} text-sm mb-2`}>{exp.description}</p>}

              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="space-y-1">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className={`${colorScheme.text} text-sm`}>
                      • {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className={`text-xl font-bold ${colorScheme.primary} mb-4 border-b-2 ${colorScheme.border} pb-2`}>
          EDUCATION
        </h2>

        {data.education.map((edu, index) => (
          <div key={index} className="mb-4 flex">
            <div className="w-20 flex-shrink-0 mr-6">
              <div className="bg-gray-200 text-center py-2 px-1 text-xs font-bold transform -rotate-90 origin-center">
                {edu.year.split("-")[0] || "20XX"}
              </div>
            </div>

            <div className="flex-1">
              <h3 className={`font-bold ${colorScheme.primary}`}>{edu.degree}</h3>
              <p className={`${colorScheme.secondary} italic`}>{edu.school}</p>
              <p className={`${colorScheme.textLight} text-sm`}>{edu.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* References */}
      <div>
        <h2 className={`text-xl font-bold ${colorScheme.primary} mb-4 border-b-2 ${colorScheme.border} pb-2`}>
          REFERENCES
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className={`font-bold ${colorScheme.primary}`}>Project Director | St Mary's</p>
            <p className={`${colorScheme.text} text-sm`}>John Perkins</p>
            <p className={`${colorScheme.text} text-sm`}>name@email.com</p>
            <p className={`${colorScheme.text} text-sm`}>+1 212 4444 444</p>
          </div>
        </div>
      </div>
    </div>
  )
}
