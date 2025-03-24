"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Upload, Plus, Trash2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PerformantMarquee from "@/components/performant-marquee"

type GalleryItem = {
  id: number
  title: string
  date: string
  image: string
  category: string
  description: string
  gallery: string[]
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<GalleryItem | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: "",
    date: "",
    category: "Corporate Events",
    description: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadAreaRef = useRef<HTMLDivElement>(null)

  // Simulate admin check - in a real app, this would be based on authentication
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")

  useEffect(() => {
    // Simulate image preloading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple demo password - in a real app, this would be a proper authentication
    if (adminPassword === "admin123") {
      setIsAdmin(true)
      setShowAdminLogin(false)
    } else {
      alert("Invalid password")
    }
  }

  // Sample gallery data with event names and dates
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: 1,
      title: "UCC Funding Program",
      date: "Nov 25th 2017",
      image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
      category: "Corporate Events",
      description: "A comprehensive funding program launch event for the Uganda Communications Commission.",
      gallery: [
        "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
        "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
        "https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg",
        "https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg",
      ],
    },
    {
      id: 2,
      title: "Tech Conference",
      date: "Mar 15th 2018",
      image: "https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg",
      category: "Conferences",
      description: "Annual technology conference bringing together industry leaders and innovators.",
      gallery: [
        "https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg",
        "https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg",
        "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
        "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
      ],
    },
    {
      id: 3,
      title: "Brand Launch for TechCorp",
      date: "Jun 7th 2018",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      category: "Brand Launches",
      description: "Complete rebranding and launch event for a leading technology company.",
      gallery: [
        "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
        "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      ],
    },
    {
      id: 4,
      title: "Annual Charity Gala",
      date: "Sep 12th 2018",
      image: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
      category: "Social Events",
      description: "Prestigious charity fundraising event with high-profile attendees.",
      gallery: [
        "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
        "https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg",
        "https://images.pexels.com/photos/1181360/pexels-photo-1181360.jpeg",
        "https://images.pexels.com/photos/1181376/pexels-photo-1181376.jpeg",
      ],
    },
  ])

  // Group gallery items by category
  const groupedGallery = galleryItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, typeof galleryItems>,
  )

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category)
  }

  const handleEventClick = (event: GalleryItem) => {
    setSelectedEvent(event)
  }

  const closeModal = () => {
    setSelectedEvent(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: string[] = []

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string)
          if (newImages.length === files.length) {
            setUploadedImages((prev) => [...prev, ...newImages])
          }
        }
      }
      reader.readAsDataURL(file)
    })
  }

  // Handle drag and drop functionality
  useEffect(() => {
    const uploadArea = uploadAreaRef.current
    if (!uploadArea) return

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      uploadArea.classList.add("border-primary")
    }

    const handleDragLeave = () => {
      uploadArea.classList.remove("border-primary")
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      uploadArea.classList.remove("border-primary")

      if (!e.dataTransfer?.files) return

      const files = e.dataTransfer.files
      const newImages: string[] = []

      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) return

        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string)
            if (newImages.length === files.length) {
              setUploadedImages((prev) => [...prev, ...newImages])
            }
          }
        }
        reader.readAsDataURL(file)
      })
    }

    uploadArea.addEventListener("dragover", handleDragOver)
    uploadArea.addEventListener("dragleave", handleDragLeave)
    uploadArea.addEventListener("drop", handleDrop)

    return () => {
      uploadArea.removeEventListener("dragover", handleDragOver)
      uploadArea.removeEventListener("dragleave", handleDragLeave)
      uploadArea.removeEventListener("drop", handleDrop)
    }
  }, [])

  const removeUploadedImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewGalleryItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newGalleryItem.title || !newGalleryItem.date || uploadedImages.length === 0) {
      alert("Please fill in all required fields and upload at least one image")
      return
    }

    const newItem: GalleryItem = {
      id: galleryItems.length + 1,
      title: newGalleryItem.title,
      date: newGalleryItem.date,
      image: uploadedImages[0],
      category: newGalleryItem.category,
      description: newGalleryItem.description,
      gallery: [...uploadedImages],
    }

    setGalleryItems((prev) => [...prev, newItem])

    // Reset form
    setNewGalleryItem({
      title: "",
      date: "",
      category: "Corporate Events",
      description: "",
    })
    setUploadedImages([])

    // Switch to browse tab
    document.getElementById("browse-tab")?.click()
  }

  const filteredItems = selectedCategory ? { [selectedCategory]: groupedGallery[selectedCategory] } : groupedGallery

  return (
    <>
      {/* Add spacing for fixed navbar */}
      <div className="h-24"></div>

      {/* Hero Section */}
      <section className="home-hero" style={{ minHeight: "60vh" }}>
        <div className="home-hero-bg">
          <div className="home-hero-shape"></div>
          <div className="home-hero-shape"></div>

          <div className="home-hero-image">
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
              alt="Gallery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="home-hero-content">
          <h1 className="home-hero-title">GALLERY</h1>
          <p className="home-hero-subtitle">A showcase of our award-winning work and creative excellence.</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="creative-section">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="browse">
            <TabsList className="mb-8">
              <TabsTrigger value="browse" id="browse-tab">
                Browse Gallery
              </TabsTrigger>
              {isAdmin && <TabsTrigger value="upload">Upload New</TabsTrigger>}
              {!isAdmin && (
                <Button variant="outline" onClick={() => setShowAdminLogin(true)} className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Admin Access
                </Button>
              )}
            </TabsList>

            <TabsContent value="browse">
              <div className="flex flex-wrap gap-4 mb-12 justify-center">
                <button
                  className={`px-4 py-2 rounded-none ${selectedCategory === null ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}
                  onClick={() => handleCategoryFilter(null)}
                >
                  All
                </button>
                {Object.keys(groupedGallery).map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-none ${selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}
                    onClick={() => handleCategoryFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {Object.entries(filteredItems).map(([category, items]) => (
                <div key={category} className="mb-24">
                  <div className="mb-8">
                    <h2 className="text-4xl font-display font-bold mb-4">{category}</h2>
                    <div className="h-1 w-24 bg-primary"></div>
                    <p className="text-muted-foreground mt-4">Explore our {category.toLowerCase()} portfolio</p>
                  </div>

                  <div className="creative-gallery">
                    {items.map((item) => (
                      <div key={item.id} className="creative-gallery-item" onClick={() => handleEventClick(item)}>
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className={`w-full h-full object-cover ${isLoaded ? "opacity-100" : "opacity-0"}`}
                          style={{ transition: "opacity 0.5s ease-in-out" }}
                        />
                        <div className="creative-gallery-item-overlay">
                          <h3 className="creative-gallery-item-title">{item.title}</h3>
                          <p className="creative-gallery-item-category">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            {isAdmin && (
              <TabsContent value="upload">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-4xl font-display font-bold mb-4">Upload New Gallery</h2>
                  <div className="h-1 w-24 bg-primary mb-8"></div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="title">Event Title *</Label>
                          <Input
                            id="title"
                            name="title"
                            value={newGalleryItem.title}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="date">Event Date *</Label>
                          <Input
                            id="date"
                            name="date"
                            value={newGalleryItem.date}
                            onChange={handleInputChange}
                            placeholder="e.g. Jan 15th 2023"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <select
                          id="category"
                          name="category"
                          value={newGalleryItem.category}
                          onChange={(e) => setNewGalleryItem((prev) => ({ ...prev, category: e.target.value }))}
                          className="w-full p-2 border border-border bg-background rounded-none"
                          required
                        >
                          <option value="Corporate Events">Corporate Events</option>
                          <option value="Conferences">Conferences</option>
                          <option value="Brand Launches">Brand Launches</option>
                          <option value="Social Events">Social Events</option>
                          <option value="Exhibitions">Exhibitions</option>
                          <option value="Marketing">Marketing</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                          id="description"
                          name="description"
                          value={newGalleryItem.description}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-border bg-background rounded-none min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Upload Images *</Label>
                        <div ref={uploadAreaRef} className="creative-gallery-upload">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            multiple
                          />
                          <div className="flex flex-col items-center justify-center">
                            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">Drag & drop images here or click to browse</p>
                          </div>
                        </div>

                        {uploadedImages.length > 0 && (
                          <div className="creative-gallery-preview">
                            {uploadedImages.map((image, index) => (
                              <div key={index} className="creative-gallery-preview-item">
                                <img src={image || "/placeholder.svg"} alt={`Preview ${index}`} />
                                <button
                                  type="button"
                                  className="remove-button"
                                  onClick={() => removeUploadedImage(index)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                            <div
                              className="creative-gallery-preview-item flex items-center justify-center bg-secondary cursor-pointer"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Plus className="h-6 w-6 text-muted-foreground" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={!newGalleryItem.title || !newGalleryItem.date || uploadedImages.length === 0}
                    >
                      Create Gallery
                    </Button>
                  </form>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>

      {/* Marquee Section */}
      <PerformantMarquee
        text="CREATIVITY • INNOVATION • EXCELLENCE • DESIGN • BRANDING • EVENTS • PRINTING •"
        className="py-12 bg-primary text-primary-foreground"
      />

      {/* Gallery Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-card w-full max-w-4xl max-h-[90vh] overflow-auto p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold">{selectedEvent.title}</h2>
              <button onClick={closeModal} className="p-2 hover:bg-secondary rounded-full">
                <X className="h-6 w-6" />
              </button>
            </div>

            <p className="text-muted-foreground mb-6">{selectedEvent.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedEvent.gallery.map((image, index) => (
                <div key={index} className="aspect-video overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${selectedEvent.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div
          className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAdminLogin(false)}
        >
          <div className="bg-card w-full max-w-md p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold">Admin Access</h2>
              <button onClick={() => setShowAdminLogin(false)} className="p-2 hover:bg-secondary rounded-full">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
                <p className="text-xs text-muted-foreground">For demo purposes, use: admin123</p>
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground">
                Login
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

