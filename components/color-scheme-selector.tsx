"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { colorSchemes, type ColorScheme } from "@/types/color-schemes"

interface ColorSchemeSelectorProps {
  selectedScheme: ColorScheme
  onSchemeChange: (scheme: ColorScheme) => void
}

export const ColorSchemeSelector: React.FC<ColorSchemeSelectorProps> = ({ selectedScheme, onSchemeChange }) => {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Choose Color Scheme</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {colorSchemes.map((scheme) => (
          <Card
            key={scheme.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedScheme.id === scheme.id ? "ring-2 ring-blue-500 shadow-md" : ""
            }`}
            onClick={() => onSchemeChange(scheme)}
          >
            <CardContent className="p-3">
              <div className="space-y-2">
                <div className="flex space-x-1">
                  <div className={`w-4 h-4 rounded-full ${getColorClass(scheme.primary)}`}></div>
                  <div className={`w-4 h-4 rounded-full ${getColorClass(scheme.secondary)}`}></div>
                  <div className={`w-4 h-4 rounded-full ${getColorClass(scheme.accent)}`}></div>
                </div>
                <p className="text-sm font-medium">{scheme.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Helper function to convert text classes to background classes for color preview
function getColorClass(textClass: string): string {
  const colorMap: { [key: string]: string } = {
    "text-gray-900": "bg-gray-900",
    "text-gray-700": "bg-gray-700",
    "text-gray-600": "bg-gray-600",
    "text-blue-900": "bg-blue-900",
    "text-blue-700": "bg-blue-700",
    "text-blue-600": "bg-blue-600",
    "text-green-900": "bg-green-900",
    "text-green-700": "bg-green-700",
    "text-green-600": "bg-green-600",
    "text-purple-900": "bg-purple-900",
    "text-purple-700": "bg-purple-700",
    "text-purple-600": "bg-purple-600",
    "text-slate-900": "bg-slate-900",
    "text-slate-700": "bg-slate-700",
    "text-slate-600": "bg-slate-600",
    "text-red-900": "bg-red-900",
    "text-red-700": "bg-red-700",
    "text-red-600": "bg-red-600",
  }
  return colorMap[textClass] || "bg-gray-500"
}
