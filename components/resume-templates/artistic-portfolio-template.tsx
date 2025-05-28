import type React from "react"
import type { ResumeData } from "@/types/resume"
import type { ColorScheme } from "@/types/color-schemes"
import Image from "next/image"

interface ArtisticPortfolioTemplateProps {
  data: ResumeData
  colorScheme: ColorScheme
}

export const ArtisticPortfolioTemplate: React.FC<ArtisticPortfolioTemplateProps> = ({ data, colorScheme }) => {
  return (
    <div className="bg-gray-100 max-w-[800px] mx-auto font-sans" id="resume-preview">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-8 relative overflow-hidden">
        {/* Profile Photo */}
        {data.personalInfo.profilePhoto && (
          <div className="absolute left-8 top-8 w-48 h-64 bg-white p-2 transform rotate-3 shadow-lg">
            <Image
              src={data.personalInfo.profilePhoto || "/placeholder.svg"}
              alt="Profile"
              width={192}
              height={256}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Name and Title */}
        <div className="ml-64 pt-8">
          <div className="bg-yellow-300 inline-block px-6 py-2 transform -rotate-1 shadow-md mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{data.personalInfo.fullName || "YOUR NAME HERE"}</h1>
          </div>
          <p className="text-lg text-gray-800 font-medium">{data.personalInfo.title || "CREATIVE PROFESSIONAL"}</p>
        </div>

        {/* Resume Badge */}
        <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs font-bold text-gray-600 border border-gray-400">
          RESUME
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-0 min-h-[600px]">
        {/* Left Sidebar */}
        <div className="bg-gray-800 text-white p-6">
          {/* Profile Section */}
          <div className="mb-8">
            <h3 className="text-yellow-400 font-bold mb-4">PROFILE</h3>
            <p className="text-sm leading-relaxed">
              {data.personalInfo.summary ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h3 className="text-yellow-400 font-bold mb-4">ADDRESS</h3>
            <p className="text-sm">{data.personalInfo.location}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-yellow-400 font-bold mb-4">PHONE</h3>
            <p className="text-sm">{data.personalInfo.phone}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-yellow-400 font-bold mb-4">EMAIL</h3>
            <p className="text-sm break-all">{data.personalInfo.email}</p>
          </div>

          {data.personalInfo.linkedin && (
            <div className="mb-8">
              <h3 className="text-yellow-400 font-bold mb-4">WEBSITE</h3>
              <p className="text-sm break-all">{data.personalInfo.linkedin}</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-8 bg-white">
          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">EXPERIENCE</h2>

            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6 relative">
                <div className="flex items-start">
                  <div className="bg-yellow-400 text-gray-900 px-2 py-1 text-xs font-bold mr-4 mt-1">
                    {exp.duration.split(" ")[0] || "2019"}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{exp.title}</h3>
                    <p className="text-gray-600 mb-2">{exp.company}</p>
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
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">EDUCATION</h2>

            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 flex items-start">
                <div className="bg-yellow-400 text-gray-900 px-2 py-1 text-xs font-bold mr-4 mt-1">
                  {edu.year.split("-")[0] || "2019"}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Skills & Expertise */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">
                SKILLS & EXPERTISE
              </h2>

              <div className="grid grid-cols-4 gap-4">
                {data.skills.slice(0, 4).map((skill, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-gray-900">{skill.substring(0, 2).toUpperCase()}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
