import type React from "react"
import type { ResumeData } from "@/types/resume"
import type { ColorScheme } from "@/types/color-schemes"
import Image from "next/image"

interface CreativeDesignerTemplateProps {
  data: ResumeData
  colorScheme: ColorScheme
}

export const CreativeDesignerTemplate: React.FC<CreativeDesignerTemplateProps> = ({ data, colorScheme }) => {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-blue-50 max-w-[800px] mx-auto font-sans" id="resume-preview">
      {/* Header Section with Photo */}
      <div className="relative h-80 bg-gradient-to-r from-teal-400 to-blue-500 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4">
          <div className="grid grid-cols-4 gap-1">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white opacity-30 rounded-full"></div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-300 opacity-20 rounded-full transform translate-x-32 translate-y-32"></div>
        <div className="absolute top-0 right-20 w-32 h-32 bg-teal-600 opacity-30 rounded-full transform -translate-y-16"></div>

        {/* Profile Photo */}
        {data.personalInfo.profilePhoto && (
          <div className="absolute left-8 top-8 w-48 h-64 bg-gray-800 overflow-hidden">
            <Image
              src={data.personalInfo.profilePhoto || "/placeholder.svg"}
              alt="Profile"
              width={192}
              height={256}
              className="object-cover w-full h-full grayscale"
            />
          </div>
        )}

        {/* Name */}
        <div className="absolute top-8 right-8 text-right">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName || "KRISTI ROKER"}</h1>
          <div className="bg-yellow-400 text-gray-900 px-4 py-2 inline-block font-bold text-lg">
            {data.personalInfo.title || "Creative Designer"}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          {/* About Me */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 relative">
              About Me
              <div className="absolute -bottom-1 left-0 w-16 h-1 bg-yellow-400"></div>
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.personalInfo.summary ||
                "I was born and raised in Aurora, and now I'm proud to be raising my young family here. That's why I love helping people find their Aurora dream home."}
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 relative">
              Work Experience
              <div className="absolute -bottom-1 left-0 w-16 h-1 bg-yellow-400"></div>
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-gray-900">{exp.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {exp.company} | {exp.duration}
                </p>
                {exp.description && <p className="text-gray-700 text-sm">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Expertise Skills */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 relative">
              Expertise Skill
              <div className="absolute -bottom-1 left-0 w-16 h-1 bg-yellow-400"></div>
            </h2>
            <div className="space-y-2">
              {data.skills.slice(0, 5).map((skill, index) => (
                <p key={index} className="text-gray-700">
                  {skill}
                </p>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 relative">
              Language
              <div className="absolute -bottom-1 left-0 w-16 h-1 bg-yellow-400"></div>
            </h2>
            <div className="space-y-3">
              {["English", "Spanish", "French"].map((lang, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">{lang}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full" style={{ width: `${90 - index * 10}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-sm text-gray-600 mb-1">{data.personalInfo.email}</p>
            <p className="text-sm text-gray-600 mb-1">{data.personalInfo.phone}</p>
            <p className="text-sm text-gray-600">{data.personalInfo.location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
