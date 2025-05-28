import type React from "react"
import type { ResumeData } from "@/types/resume"
import type { ColorScheme } from "@/types/color-schemes"
import Image from "next/image"

interface ModernProfessionalTemplateProps {
  data: ResumeData
  colorScheme: ColorScheme
}

export const ModernProfessionalTemplate: React.FC<ModernProfessionalTemplateProps> = ({ data, colorScheme }) => {
  return (
    <div className={`${colorScheme.background} max-w-[800px] mx-auto font-sans`} id="resume-preview">
      <div className="flex min-h-[1000px]">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-800 text-white p-6">
          {/* Profile Photo */}
          {data.personalInfo.profilePhoto && (
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white">
                <Image
                  src={data.personalInfo.profilePhoto || "/placeholder.svg"}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Personal Info */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-blue-300">PERSONAL INFO</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-300">{data.personalInfo.location}</p>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-300">{data.personalInfo.phone}</p>
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-300">{data.personalInfo.email}</p>
              </div>
              {data.personalInfo.linkedin && (
                <div>
                  <p className="font-medium">Website</p>
                  <p className="text-gray-300 break-all">{data.personalInfo.linkedin}</p>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-blue-300">SKILLS</h3>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-sm">
                    <p className="mb-1">{skill}</p>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-4xl font-bold ${colorScheme.primary} uppercase tracking-wide mb-2`}>
              {data.personalInfo.fullName || "YOUR NAME HERE"}
            </h1>
            <p className={`text-xl ${colorScheme.secondary} mb-4`}>{data.personalInfo.title || "Professional Title"}</p>
          </div>

          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-8">
              <h2 className={`text-xl font-bold ${colorScheme.primary} mb-4 border-b-2 border-blue-500 pb-2`}>
                EMPLOYMENT HISTORY
              </h2>
              <p className={`${colorScheme.text} leading-relaxed`}>{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          <div className="mb-8">
            <h2 className={`text-xl font-bold ${colorScheme.primary} mb-4 border-b-2 border-blue-500 pb-2`}>
              EMPLOYMENT HISTORY
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className={`font-bold ${colorScheme.primary} text-lg`}>{exp.title}</h3>
                    <p className={`${colorScheme.secondary} font-medium`}>{exp.company}</p>
                  </div>
                  <p className={`${colorScheme.textLight} text-sm`}>{exp.duration}</p>
                </div>
                {exp.description && <p className={`${colorScheme.text} mb-2`}>{exp.description}</p>}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className={`${colorScheme.text} text-sm`}>
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
            <h2 className={`text-xl font-bold ${colorScheme.primary} mb-4 border-b-2 border-blue-500 pb-2`}>
              EDUCATION
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-bold ${colorScheme.primary}`}>{edu.degree}</h3>
                    <p className={`${colorScheme.secondary}`}>{edu.school}</p>
                  </div>
                  <p className={`${colorScheme.textLight} text-sm`}>{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
