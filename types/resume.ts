export interface ResumeData {
  personalInfo: {
    fullName: string
    title?: string
    email: string
    phone: string
    location: string
    summary: string
    linkedin?: string
    profilePhoto?: string // Add profile photo field
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

export interface Template {
  id: string
  name: string
  category: string
  image: string
  supportsPhoto: boolean // Add flag for photo support
}
