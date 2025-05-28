"use client"

import React from "react"
import { useState, useEffect, lazy, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
  Briefcase,
  Code,
  FolderOpen,
  Linkedin,
  Filter,
  Eye,
  Download,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Target,
  Users,
  Award,
  Mail,
  Phone,
  Menu,
  X,
} from "lucide-react"
import Image from "next/image"
import { colorSchemes, type ColorScheme } from "@/types/color-schemes"
import { ColorSchemeSelector } from "@/components/color-scheme-selector"
import { ImageUpload } from "@/components/image-upload"

// Lazy load template components for better performance
const ProfessionalTemplate = lazy(() =>
  import("@/components/resume-templates/professional-template").then((m) => ({ default: m.ProfessionalTemplate })),
)
const ModernProfessionalTemplate = lazy(() =>
  import("@/components/resume-templates/modern-professional-template").then((m) => ({
    default: m.ModernProfessionalTemplate,
  })),
)
const CleanMinimalTemplate = lazy(() =>
  import("@/components/resume-templates/clean-minimal-template").then((m) => ({ default: m.CleanMinimalTemplate })),
)
const CreativeDesignerTemplate = lazy(() =>
  import("@/components/resume-templates/creative-designer-template").then((m) => ({
    default: m.CreativeDesignerTemplate,
  })),
)
const BusinessExecutiveTemplate = lazy(() =>
  import("@/components/resume-templates/business-executive-template").then((m) => ({
    default: m.BusinessExecutiveTemplate,
  })),
)
const TechSpecialistTemplate = lazy(() =>
  import("@/components/resume-templates/tech-specialist-template").then((m) => ({ default: m.TechSpecialistTemplate })),
)
const ArtisticPortfolioTemplate = lazy(() =>
  import("@/components/resume-templates/artistic-portfolio-template").then((m) => ({
    default: m.ArtisticPortfolioTemplate,
  })),
)

// Types
interface UserType {
  id: string
  name: string
  email: string
  picture: string
}

interface ResumeData {
  personalInfo: {
    fullName: string
    title?: string
    email: string
    phone: string
    location: string
    summary: string
    linkedin?: string
    profilePhoto?: string
  }
  education: Array<{
    degree: string
    school: string
    year: string
    gpa?: string
    fieldOfStudy?: string
  }>
  experience: Array<{
    title: string
    company: string
    location?: string
    duration: string
    description: string
    bullets?: string[]
  }>
  skills: string[]
  projects: Array<{
    name: string
    description: string
    technologies: string
    link?: string
  }>
}

interface Template {
  id: string
  name: string
  category: string
  image: string
  supportsPhoto: boolean
}

// Template Loading Component
const TemplateLoader = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2 text-gray-600">Loading template...</span>
  </div>
)

// Resume Preview Component with dynamic template rendering
const ResumePreview = ({
  data,
  colorScheme,
  selectedTemplate,
}: {
  data: ResumeData
  colorScheme: ColorScheme
  selectedTemplate: Template
}) => {
  const renderTemplate = () => {
    switch (selectedTemplate.id) {
      case "1":
        return <ModernProfessionalTemplate data={data} colorScheme={colorScheme} />
      case "2":
        return <CleanMinimalTemplate data={data} colorScheme={colorScheme} />
      case "3":
        return <CreativeDesignerTemplate data={data} colorScheme={colorScheme} />
      case "4":
        return <TechSpecialistTemplate data={data} colorScheme={colorScheme} />
      case "5":
        return <BusinessExecutiveTemplate data={data} colorScheme={colorScheme} />
      case "6":
        return <ArtisticPortfolioTemplate data={data} colorScheme={colorScheme} />
      default:
        return <ProfessionalTemplate data={data} colorScheme={colorScheme} />
    }
  }

  return <Suspense fallback={<TemplateLoader />}>{renderTemplate()}</Suspense>
}

// Updated template data with actual images
const templates: Template[] = [
  {
    id: "1",
    name: "Modern Professional",
    category: "Modern",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern-pro-temp.png-XnQhKb0EJBfCi9CerIRrwIFmWLnqiP.jpeg",
    supportsPhoto: true,
  },
  {
    id: "2",
    name: "Clean Minimal",
    category: "Simple",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clean-minimal-temp-iXxOcR9K2qFN7Ch9YQICcOInbEwoJO.png",
    supportsPhoto: false,
  },
  {
    id: "3",
    name: "Creative Designer",
    category: "Creative",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creative-design-temp.jpg-nMbmfVbGq8VJ5sf4vy4wrGNn4MCtez.jpeg",
    supportsPhoto: true,
  },
  {
    id: "4",
    name: "Tech Specialist",
    category: "Modern",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tech-pro-temp-7rYiv53mJUjpBRQ1b3BfFcMP0jbUSh.png",
    supportsPhoto: false,
  },
  {
    id: "5",
    name: "Business Executive",
    category: "Simple",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/business-executive-temp.jpg-4SGjymEUoollwcTBRQBRNpNcyYwTwY.jpeg",
    supportsPhoto: true,
  },
  {
    id: "6",
    name: "Artistic Portfolio",
    category: "Creative",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/artistic-portfolio-temp.jpg-7t2L4LbmlDbAZt3hliFB5zzM6L9VqM.jpeg",
    supportsPhoto: true,
  },
]

// Updated carousel templates with actual images
const carouselTemplates = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern-pro-temp.png-XnQhKb0EJBfCi9CerIRrwIFmWLnqiP.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tech-pro-temp-7rYiv53mJUjpBRQ1b3BfFcMP0jbUSh.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/business-executive-temp.jpg-4SGjymEUoollwcTBRQBRNpNcyYwTwY.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creative-design-temp.jpg-nMbmfVbGq8VJ5sf4vy4wrGNn4MCtez.jpeg",
]

export default function ResumeBuilder() {
  const [user, setUser] = useState<UserType | null>(null)
  const [currentSection, setCurrentSection] = useState("home")
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const [templateFilter, setTemplateFilter] = useState("All")
  const [resumeStep, setResumeStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      linkedin: "",
      profilePhoto: undefined,
    },
    education: [{ degree: "", school: "", year: "", gpa: "", fieldOfStudy: "" }],
    experience: [{ title: "", company: "", location: "", duration: "", description: "", bullets: [] }],
    skills: [],
    projects: [{ name: "", description: "", technologies: "", link: "" }],
  })

  const [selectedColorScheme, setSelectedColorScheme] = useState<ColorScheme>(colorSchemes[0])

  // Carousel auto-play with longer interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselTemplates.length)
    }, 5000) // Increased to 5 seconds
    return () => clearInterval(interval)
  }, [])

  // Google Sign-In (mock implementation)
  const handleGoogleSignIn = () => {
    const mockUser: UserType = {
      id: "1",
      name: "John Doe",
      email: "john.doe@gmail.com",
      picture: "/placeholder.svg?height=40&width=40",
    }
    setUser(mockUser)
  }

  const handleSignOut = () => {
    setUser(null)
  }

  // Contact handlers
  const handleEmailClick = () => {
    window.location.href = "mailto:pnavaneethakrishnan07@gmail.com"
  }

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/naveen-pntk/", "_blank", "noopener,noreferrer")
  }

  // Navigation handlers
  const handleNavigation = (section: string) => {
    setCurrentSection(section)
    setIsMobileMenuOpen(false) // Close mobile menu when navigating
  }

  // Filter templates
  const filteredTemplates =
    templateFilter === "All" ? templates : templates.filter((template) => template.category === templateFilter)

  // Resume form handlers
  const updatePersonalInfo = (field: string, value: string | undefined) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", year: "", gpa: "", fieldOfStudy: "" }],
    }))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu)),
    }))
  }

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: "", company: "", location: "", duration: "", description: "", bullets: [] },
      ],
    }))
  }

  const updateExperience = (index: number, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)),
    }))
  }

  const addSkill = (skill: string) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: "", description: "", technologies: "", link: "" }],
    }))
  }

  const updateProject = (index: number, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) => (i === index ? { ...project, [field]: value } : project)),
    }))
  }

  const addBulletPoint = (expIndex: number) => {
    setResumeData((prev) => {
      const updatedExperience = [...prev.experience]
      const currentBullets = updatedExperience[expIndex].bullets || []
      updatedExperience[expIndex].bullets = [...currentBullets, ""]
      return {
        ...prev,
        experience: updatedExperience,
      }
    })
  }

  const updateBulletPoint = (expIndex: number, bulletIndex: number, value: string) => {
    setResumeData((prev) => {
      const updatedExperience = [...prev.experience]
      if (!updatedExperience[expIndex].bullets) {
        updatedExperience[expIndex].bullets = []
      }
      updatedExperience[expIndex].bullets![bulletIndex] = value
      return {
        ...prev,
        experience: updatedExperience,
      }
    })
  }

  // Optimized PDF generation
  const generatePDF = async () => {
    setIsGenerating(true)

    try {
      const html2canvas = (await import("html2canvas")).default
      const jsPDF = (await import("jspdf")).default

      const element = document.getElementById("resume-preview")
      if (!element) {
        throw new Error("Resume preview element not found")
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      const fileName = `${resumeData.personalInfo.fullName || "Resume"}_Resume.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const resumeSteps = [
    { id: "personal", title: "Personal Info", icon: FileText },
    { id: "education", title: "Education", icon: GraduationCap },
    { id: "experience", title: "Experience", icon: Briefcase },
    { id: "skills", title: "Skills", icon: Code },
    { id: "projects", title: "Projects", icon: FolderOpen },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image src="/png/Resumate-logo-big.png" alt="ResuMate" width={86} height={86} />
              <span className="ml-2 text-xl font-bold font-sans text-blue-600">ResuMate</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => handleNavigation("home")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("templates")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Custom Templates
              </button>
              <button
                onClick={() => handleNavigation("build")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Build Resume
              </button>

              {user ? (
                <div className="flex items-center space-x-3">
                  <Image
                    src={user.picture || "/placeholder.svg"}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button onClick={handleGoogleSignIn} className="bg-blue-600 hover:bg-blue-700">
                  Sign in with Google
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <button
                  onClick={() => handleNavigation("home")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation("templates")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
                >
                  Custom Templates
                </button>
                <button
                  onClick={() => handleNavigation("build")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors"
                >
                  Build Resume
                </button>

                {/* Mobile User Section */}
                <div className="border-t pt-3 mt-3">
                  {user ? (
                    <div className="px-3 py-2">
                      <div className="flex items-center space-x-3 mb-3">
                        <Image
                          src={user.picture || "/placeholder.svg"}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-700">{user.name}</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full">
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="px-3 py-2">
                      <Button onClick={handleGoogleSignIn} className="w-full bg-blue-600 hover:bg-blue-700">
                        Sign in with Google
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Home Section */}
      {currentSection === "home" && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Create professional resumes in minutes.
                </h1>
                <p className="text-xl text-gray-600">
                  Build stunning resumes with our easy-to-use templates and step-by-step guidance. Stand out from the
                  crowd and land your dream job.
                </p>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
                  onClick={() => handleNavigation("build")}
                >
                  Build Your Resume
                </Button>
              </div>

              <div className="relative">
                <div className="relative h-96 w-80 mx-auto overflow-hidden rounded-lg shadow-2xl">
                  {carouselTemplates.map((template, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                        index === currentCarouselIndex ? "translate-x-0" : "translate-x-full"
                      }`}
                    >
                      <Image
                        src={template || "/placeholder.svg"}
                        alt={`Resume template ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-4 space-x-2">
                  {carouselTemplates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCarouselIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentCarouselIndex ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Custom Templates Section */}
      {currentSection === "templates" && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Template</h2>
              <p className="text-xl text-gray-600">
                Select from our collection of professionally designed resume templates
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <Select value={templateFilter} onValueChange={setTemplateFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Templates</SelectItem>
                  <SelectItem value="Modern">Modern</SelectItem>
                  <SelectItem value="Simple">Simple</SelectItem>
                  <SelectItem value="Creative">Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{template.category}</Badge>
                      {template.supportsPhoto && (
                        <Badge variant="outline" className="text-xs">
                          Photo Support
                        </Badge>
                      )}
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedTemplate(template)
                        handleNavigation("build")
                      }}
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Building Guidance Section */}
      {currentSection === "guidance" && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Resume Building Guidance</h2>
              <p className="text-xl text-gray-600">
                Follow our comprehensive step-by-step guide to create a professional resume
              </p>
            </div>

            {/* Overview Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center p-6">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Goal-Oriented</h3>
                <p className="text-gray-600">Create a resume that targets your specific career goals and industry</p>
              </Card>
              <Card className="text-center p-6">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">ATS-Friendly</h3>
                <p className="text-gray-600">Ensure your resume passes through Applicant Tracking Systems</p>
              </Card>
              <Card className="text-center p-6">
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Professional</h3>
                <p className="text-gray-600">Stand out with a polished, professional presentation</p>
              </Card>
            </div>

            {/* Step-by-Step Guide */}
            <div className="space-y-8">
              {/* Step 1: Personal Information */}
              <Card className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <FileText className="h-6 w-6 text-blue-600 mr-2" />
                      <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Start with your basic contact information and professional summary. This is the first impression
                      employers will have of you.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Required Fields:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Full Name</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Professional Email</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Phone Number</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Location (City, State)</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Pro Tips:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Use a professional email address</span>
                          </li>
                          <li className="flex items-start">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Include LinkedIn profile if relevant</span>
                          </li>
                          <li className="flex items-start">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Write a compelling 2-3 line summary</span>
                          </li>
                          <li className="flex items-start">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Add professional photo for creative roles</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 2: Education */}
              <Card className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <GraduationCap className="h-6 w-6 text-green-600 mr-2" />
                      <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      List your educational background, starting with the most recent. Include relevant coursework,
                      honors, and achievements.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Include:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Degree type and major</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Institution name</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Graduation year</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">GPA (if 3.5 or higher)</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Best Practices:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">List most recent education first</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Include relevant certifications</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Mention honors and awards</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Add relevant coursework for entry-level</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 3: Experience */}
              <Card className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <Briefcase className="h-6 w-6 text-purple-600 mr-2" />
                      <h3 className="text-2xl font-bold text-gray-900">Work Experience</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Showcase your professional experience with quantifiable achievements. Focus on results and impact
                      rather than just responsibilities.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">For Each Position:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Job title and company</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Employment dates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Location (optional)</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">3-5 bullet points of achievements</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Writing Tips:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Start with action verbs</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Include numbers and percentages</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Focus on results, not tasks</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Tailor to job requirements</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 4: Skills */}
              <Card className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <Code className="h-6 w-6 text-orange-600 mr-2" />
                      <h3 className="text-2xl font-bold text-gray-900">Skills</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Highlight your technical and soft skills that are relevant to your target position. Be specific
                      and honest about your skill levels.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Skill Categories:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Technical skills</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Software proficiency</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Programming languages</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Industry-specific skills</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Guidelines:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">List 8-12 relevant skills</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Match job posting keywords</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Be honest about proficiency</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Update regularly</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 5: Projects */}
              <Card className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      5
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <FolderOpen className="h-6 w-6 text-red-600 mr-2" />
                      <h3 className="text-2xl font-bold text-gray-900">Projects</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Showcase your practical experience through personal, academic, or professional projects. This
                      section is especially important for new graduates and career changers.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Project Details:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Project name and description</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Technologies used</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Your role and contributions</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-gray-700">Links to live demos or code</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Project Types:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Personal coding projects</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Academic assignments</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Freelance work</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span className="text-gray-700">Open source contributions</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Your Resume?</h3>
                <p className="text-gray-600 mb-6">
                  Now that you understand the process, let's create your professional resume step by step.
                </p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleNavigation("build")}>
                  Start Building Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Build Resume Section */}
      {currentSection === "build" && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Build Your Resume</h2>
              <p className="text-xl text-gray-600">Follow these steps to create your professional resume</p>
              {selectedTemplate && (
                <p className="text-sm text-gray-500 mt-2">
                  Using template: <span className="font-medium">{selectedTemplate.name}</span>
                </p>
              )}
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex space-x-4">
                {resumeSteps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                        index === resumeStep
                          ? "bg-blue-600 text-white"
                          : index < resumeStep
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                      }`}
                      onClick={() => setResumeStep(index)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{step.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {React.createElement(resumeSteps[resumeStep].icon, { className: "h-6 w-6" })}
                    <span>{resumeSteps[resumeStep].title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Personal Info Step */}
                  {resumeStep === 0 && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Profile Photo Upload - Only show if template supports photos */}
                      {selectedTemplate.supportsPhoto && (
                        <div className="md:col-span-2 mb-4">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-green-800">
                                  <strong>Great choice!</strong> The {selectedTemplate.name} template supports profile
                                  photos. Adding a professional headshot will make your resume stand out.
                                </p>
                              </div>
                            </div>
                          </div>
                          <ImageUpload
                            currentImage={resumeData.personalInfo.profilePhoto}
                            onImageChange={(imageUrl) => updatePersonalInfo("profilePhoto", imageUrl)}
                          />
                        </div>
                      )}
                      {selectedTemplate.supportsPhoto && !resumeData.personalInfo.profilePhoto && (
                        <div className="md:col-span-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Add a demo profile photo for testing
                              const demoPhoto = "/placeholder.svg?height=200&width=200&text=Demo+Photo"
                              updatePersonalInfo("profilePhoto", demoPhoto)
                            }}
                            className="mb-4"
                          >
                            Use Demo Photo (for testing)
                          </Button>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="title">Professional Title</Label>
                        <Input
                          id="title"
                          value={resumeData.personalInfo.title || ""}
                          onChange={(e) => updatePersonalInfo("title", e.target.value)}
                          placeholder="Senior Sales Representative"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo("email", e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.personalInfo.location}
                          onChange={(e) => updatePersonalInfo("location", e.target.value)}
                          placeholder="New York, NY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.personalInfo.linkedin || ""}
                          onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea
                          id="summary"
                          value={resumeData.personalInfo.summary}
                          onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                          placeholder="Brief summary of your professional background and goals..."
                          rows={4}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <ColorSchemeSelector
                          selectedScheme={selectedColorScheme}
                          onSchemeChange={setSelectedColorScheme}
                        />
                      </div>
                    </div>
                  )}

                  {/* Education Step */}
                  {resumeStep === 1 && (
                    <div className="space-y-6">
                      {resumeData.education.map((edu, index) => (
                        <Card key={index} className="p-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>Degree</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                placeholder="Bachelor of Science in Computer Science"
                              />
                            </div>
                            <div>
                              <Label>School</Label>
                              <Input
                                value={edu.school}
                                onChange={(e) => updateEducation(index, "school", e.target.value)}
                                placeholder="University of Technology"
                              />
                            </div>
                            <div>
                              <Label>Year</Label>
                              <Input
                                value={edu.year}
                                onChange={(e) => updateEducation(index, "year", e.target.value)}
                                placeholder="2020-2024"
                              />
                            </div>
                            <div>
                              <Label>GPA (Optional)</Label>
                              <Input
                                value={edu.gpa}
                                onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                                placeholder="3.8/4.0"
                              />
                            </div>
                            <div>
                              <Label>Field of Study</Label>
                              <Input
                                value={edu.fieldOfStudy || ""}
                                onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)}
                                placeholder="Marketing"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                      <Button onClick={addEducation} variant="outline" className="w-full">
                        Add Education
                      </Button>
                    </div>
                  )}

                  {/* Experience Step */}
                  {resumeStep === 2 && (
                    <div className="space-y-6">
                      {resumeData.experience.map((exp, index) => (
                        <Card key={index} className="p-4">
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label>Job Title</Label>
                              <Input
                                value={exp.title}
                                onChange={(e) => updateExperience(index, "title", e.target.value)}
                                placeholder="Software Engineer"
                              />
                            </div>
                            <div>
                              <Label>Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(index, "company", e.target.value)}
                                placeholder="Tech Corp"
                              />
                            </div>
                            <div>
                              <Label>Location</Label>
                              <Input
                                value={exp.location || ""}
                                onChange={(e) => updateExperience(index, "location", e.target.value)}
                                placeholder="New York"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Duration</Label>
                              <Input
                                value={exp.duration}
                                onChange={(e) => updateExperience(index, "duration", e.target.value)}
                                placeholder="Jan 2022 - Present"
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(index, "description", e.target.value)}
                              placeholder="Describe your responsibilities and achievements..."
                              rows={3}
                            />
                          </div>
                          <div className="mt-4">
                            <Label>Key Achievements/Responsibilities</Label>
                            {exp.bullets &&
                              exp.bullets.map((bullet, bulletIndex) => (
                                <div key={bulletIndex} className="flex items-center mt-2">
                                  <span className="mr-2">•</span>
                                  <Input
                                    value={bullet}
                                    onChange={(e) => updateBulletPoint(index, bulletIndex, e.target.value)}
                                    placeholder="Managed analysis on key sales pipeline reports"
                                  />
                                </div>
                              ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => addBulletPoint(index)}
                            >
                              Add Bullet Point
                            </Button>
                          </div>
                        </Card>
                      ))}
                      <Button onClick={addExperience} variant="outline" className="w-full">
                        Add Experience
                      </Button>
                    </div>
                  )}

                  {/* Skills Step */}
                  {resumeStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <Label>Add Skills</Label>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Enter a skill and press Enter"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addSkill(e.currentTarget.value)
                                e.currentTarget.value = ""
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeSkill(skill)}
                          >
                            {skill} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects Step */}
                  {resumeStep === 4 && (
                    <div className="space-y-6">
                      {resumeData.projects.map((project, index) => (
                        <Card key={index} className="p-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>Project Name</Label>
                              <Input
                                value={project.name}
                                onChange={(e) => updateProject(index, "name", e.target.value)}
                                placeholder="E-commerce Website"
                              />
                            </div>
                            <div>
                              <Label>Technologies</Label>
                              <Input
                                value={project.technologies}
                                onChange={(e) => updateProject(index, "technologies", e.target.value)}
                                placeholder="React, Node.js, MongoDB"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Description</Label>
                              <Textarea
                                value={project.description}
                                onChange={(e) => updateProject(index, "description", e.target.value)}
                                placeholder="Describe your project..."
                                rows={3}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Link (Optional)</Label>
                              <Input
                                value={project.link}
                                onChange={(e) => updateProject(index, "link", e.target.value)}
                                placeholder="https://github.com/username/project"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                      <Button onClick={addProject} variant="outline" className="w-full">
                        Add Project
                      </Button>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={() => setResumeStep(Math.max(0, resumeStep - 1))}
                      disabled={resumeStep === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    {resumeStep < resumeSteps.length - 1 ? (
                      <Button onClick={() => setResumeStep(Math.min(resumeSteps.length - 1, resumeStep + 1))}>
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <div className="flex space-x-3">
                        {/* Resume Preview Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Resume Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Resume Preview</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <ResumePreview
                                data={resumeData}
                                colorScheme={selectedColorScheme}
                                selectedTemplate={selectedTemplate}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Generate PDF Button */}
                        <Button
                          onClick={generatePDF}
                          disabled={isGenerating}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {isGenerating ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              Generate Resume
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Hidden Resume Preview for PDF Generation */}
      <div className="fixed -left-[9999px] top-0">
        <ResumePreview data={resumeData} colorScheme={selectedColorScheme} selectedTemplate={selectedTemplate} />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Image src="/png/Resumate-logo-black.png" alt="ResuMate" width={86} height={86} />
                <span className="ml-2 text-xl font-bold font-sans">ResuMate</span>
              </div>
              <p className="text-gray-400 mb-4">
                Create professional resumes that help you land your dream job. Easy to use, professionally designed
                templates.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer" onClick={() => handleNavigation("guidance")}>
                    Building Guidance
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <button onClick={handleEmailClick} className="hover:text-white flex items-center cursor-pointer">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Us
                  </button>
                </li>
                <li>
                  <a href="tel:+918220867569" className="hover:text-white flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    +91 82208 67569
                  </a>
                </li>
                <li>
                  <button onClick={handleLinkedInClick} className="hover:text-white flex items-center cursor-pointer">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ResuMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
