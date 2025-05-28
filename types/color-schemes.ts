export interface ColorScheme {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
  text: string
  textLight: string
  border: string
  background: string
}

export const colorSchemes: ColorScheme[] = [
  {
    id: "classic",
    name: "Classic Black",
    primary: "text-gray-900",
    secondary: "text-gray-700",
    accent: "text-gray-600",
    text: "text-gray-800",
    textLight: "text-gray-600",
    border: "border-gray-300",
    background: "bg-white",
  },
  {
    id: "blue",
    name: "Professional Blue",
    primary: "text-blue-900",
    secondary: "text-blue-700",
    accent: "text-blue-600",
    text: "text-gray-800",
    textLight: "text-gray-600",
    border: "border-blue-300",
    background: "bg-white",
  },
  {
    id: "green",
    name: "Corporate Green",
    primary: "text-green-900",
    secondary: "text-green-700",
    accent: "text-green-600",
    text: "text-gray-800",
    textLight: "text-gray-600",
    border: "border-green-300",
    background: "bg-white",
  },
  {
    id: "purple",
    name: "Modern Purple",
    primary: "text-purple-900",
    secondary: "text-purple-700",
    accent: "text-purple-600",
    text: "text-gray-800",
    textLight: "text-gray-600",
    border: "border-purple-300",
    background: "bg-white",
  },
  {
    id: "navy",
    name: "Executive Navy",
    primary: "text-slate-900",
    secondary: "text-slate-700",
    accent: "text-slate-600",
    text: "text-gray-800",
    textLight: "text-gray-600",
    border: "border-slate-300",
    background: "bg-white",
  },
  {
    id: "burgundy",
    name: "Traditional Burgundy",
    primary: "text-red-900",
    secondary: "text-red-700",
    accent: "text-red-600",
    text: "text-gray-800",
    textLight: "text-gray-600",
    border: "border-red-300",
    background: "bg-white",
  },
]
