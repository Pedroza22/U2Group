"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Home,
  FileText,
  Settings,
  Eye,
  Star,
  Calendar,
  Palette,
  DollarSign,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  AdminDataManager,
  type AdminProject,
  type AdminBlog,
  type AdminDesignCategory,
  type AdminDesignOption,
  type AdminBasicCategory,
} from "@/data/admin-data"
import ProjectEditor from "@/components/admin/project-editor"
import BlogEditor from "@/components/admin/blog-editor"
import ImageUploader from "@/components/admin/image-uploader"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"projects" | "blogs" | "design-options" | "settings">("projects")
  const [projects, setProjects] = useState<AdminProject[]>([])
  const [blogs, setBlogs] = useState<AdminBlog[]>([])
  const [designOptions, setDesignOptions] = useState<AdminDesignCategory[]>([])
  const [basicCategories, setBasicCategories] = useState<AdminBasicCategory[]>([])
  const [editingBasicCategory, setEditingBasicCategory] = useState<AdminBasicCategory | null>(null)
  const [showBasicEditor, setShowBasicEditor] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<AdminProject | null>(null)
  const [editingBlog, setEditingBlog] = useState<AdminBlog | null>(null)
  const [showProjectEditor, setShowProjectEditor] = useState(false)
  const [showBlogEditor, setShowBlogEditor] = useState(false)

  // Estados para opciones de diseño
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [editingOption, setEditingOption] = useState<AdminDesignOption | null>(null)
  const [showOptionEditor, setShowOptionEditor] = useState(false)

  // VERIFICAR AUTENTICACIÓN
  useEffect(() => {
    const token = localStorage.getItem("u2-admin-token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    // CARGAR DATOS
    loadData()
  }, [router])

  const loadData = () => {
    setProjects(AdminDataManager.getProjects())
    setBlogs(AdminDataManager.getBlogs())
    setDesignOptions(AdminDataManager.getDesignOptions())
    setBasicCategories(AdminDataManager.getBasicCategories())
    setIsLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("u2-admin-token")
    router.push("/admin/login")
  }

  const handleDeleteProject = (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      AdminDataManager.deleteProject(id)
      loadData()
    }
  }

  const handleDeleteBlog = (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este blog?")) {
      AdminDataManager.deleteBlog(id)
      loadData()
    }
  }

  const handleEditProject = (project: AdminProject) => {
    setEditingProject(project)
    setShowProjectEditor(true)
  }

  const handleEditBlog = (blog: AdminBlog) => {
    setEditingBlog(blog)
    setShowBlogEditor(true)
  }

  const handleNewProject = () => {
    setEditingProject(null)
    setShowProjectEditor(true)
  }

  const handleNewBlog = () => {
    setEditingBlog(null)
    setShowBlogEditor(true)
  }

  const handleSaveProject = (project: AdminProject) => {
    if (editingProject) {
      AdminDataManager.updateProject(project.id, project)
    } else {
      AdminDataManager.addProject(project)
    }
    setShowProjectEditor(false)
    setEditingProject(null)
    loadData()
  }

  const handleSaveBlog = (blog: AdminBlog) => {
    if (editingBlog) {
      AdminDataManager.updateBlog(blog.id, blog)
    } else {
      AdminDataManager.addBlog(blog)
    }
    setShowBlogEditor(false)
    setEditingBlog(null)
    loadData()
  }

  const handleCancelEdit = () => {
    setShowProjectEditor(false)
    setShowBlogEditor(false)
    setShowOptionEditor(false)
    setShowBasicEditor(false)
    setEditingProject(null)
    setEditingBlog(null)
    setEditingOption(null)
    setEditingBasicCategory(null)
  }

  // FUNCIONES PARA OPCIONES DE DISEÑO
  const handleEditOption = (categoryId: string, option: AdminDesignOption) => {
    setSelectedCategory(categoryId)
    setEditingOption(option)
    setShowOptionEditor(true)
  }

  const handleNewOption = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setEditingOption(null)
    setShowOptionEditor(true)
  }

  const handleSaveOption = (option: AdminDesignOption) => {
    if (editingOption) {
      AdminDataManager.updateDesignOption(selectedCategory, option.id, option)
    } else {
      const newId = `${selectedCategory}-${Date.now()}`
      AdminDataManager.addDesignOption(selectedCategory, { ...option, id: newId })
    }
    setShowOptionEditor(false)
    setEditingOption(null)
    setSelectedCategory("")
    loadData()
  }

  const handleDeleteOption = (categoryId: string, optionId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta opción?")) {
      AdminDataManager.deleteDesignOption(categoryId, optionId)
      loadData()
    }
  }

  const handleEditBasicCategory = (category: AdminBasicCategory) => {
    setEditingBasicCategory(category)
    setShowBasicEditor(true)
  }

  const handleSaveBasicCategory = (category: AdminBasicCategory) => {
    AdminDataManager.updateBasicCategory(category.id, category)
    setShowBasicEditor(false)
    setEditingBasicCategory(null)
    loadData()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 neutra-font">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Image
                  src="/images/u2-logo.png"
                  alt="U2 Group"
                  width={32}
                  height={32}
                  className="filter brightness-0 invert"
                />
              </div>
              <div>
                <h1 className="text-xl neutra-font-black text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-600 neutra-font">U2 Group</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => router.push("/")} className="neutra-font">
                <Home className="w-4 h-4 mr-2" />
                Ver Sitio
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50 neutra-font bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* NAVEGACIÓN DE PESTAÑAS */}
        <div className="flex gap-2 mb-8">
          <Button
            onClick={() => setActiveTab("projects")}
            variant={activeTab === "projects" ? "default" : "outline"}
            className="neutra-font"
          >
            <Home className="w-4 h-4 mr-2" />
            Proyectos ({projects.length})
          </Button>
          <Button
            onClick={() => setActiveTab("blogs")}
            variant={activeTab === "blogs" ? "default" : "outline"}
            className="neutra-font"
          >
            <FileText className="w-4 h-4 mr-2" />
            Blogs ({blogs.length})
          </Button>
          <Button
            onClick={() => setActiveTab("design-options")}
            variant={activeTab === "design-options" ? "default" : "outline"}
            className="neutra-font"
          >
            <Palette className="w-4 h-4 mr-2" />
            Opciones de Diseño ({designOptions.length})
          </Button>
          <Button
            onClick={() => setActiveTab("settings")}
            variant={activeTab === "settings" ? "default" : "outline"}
            className="neutra-font"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configuración
          </Button>
        </div>

        {/* CONTENIDO DE PROYECTOS */}
        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl neutra-font-bold text-gray-900">Gestión de Proyectos</h2>
              <Button onClick={handleNewProject} className="bg-blue-600 hover:bg-blue-700 neutra-font">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Proyecto
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video">
                    <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded">
                        <Star className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }}></div>
                      <h3 className="neutra-font-bold text-gray-900">{project.name}</h3>
                    </div>

                    <p className="text-sm text-gray-600 neutra-font mb-2">{project.category}</p>
                    <p className="text-sm text-gray-500 neutra-font mb-4">
                      {project.location} • {project.year}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 neutra-font bg-transparent"
                        onClick={() => router.push(`/proyectos/${project.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 neutra-font bg-transparent"
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CONTENIDO DE BLOGS */}
        {activeTab === "blogs" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl neutra-font-bold text-gray-900">Gestión de Blogs</h2>
              <Button onClick={handleNewBlog} className="bg-blue-600 hover:bg-blue-700 neutra-font">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Blog
              </Button>
            </div>

            <div className="space-y-4">
              {blogs.map((blog) => (
                <Card key={blog.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-6">
                    <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={blog.images[0] || "/placeholder.svg"}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs neutra-font">
                          {blog.category}
                        </span>
                        {blog.featured && <Star className="w-4 h-4 text-yellow-500" />}
                      </div>

                      <h3 className="text-lg neutra-font-bold text-gray-900 mb-2">{blog.title}</h3>
                      <p className="text-gray-600 neutra-font text-sm mb-2 line-clamp-2">{blog.excerpt}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 neutra-font">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {blog.date}
                        </span>
                        <span>{blog.readTime}</span>
                        <span>Por {blog.author.name}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="neutra-font bg-transparent"
                        onClick={() => router.push(`/blog/${blog.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="neutra-font bg-transparent"
                        onClick={() => handleEditBlog(blog)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CONTENIDO DE OPCIONES DE DISEÑO */}
        {activeTab === "design-options" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl neutra-font-bold text-gray-900">Gestión de Opciones de Diseño</h2>
            </div>

            {/* SECCIÓN DE CATEGORÍAS BÁSICAS */}
            <Card className="p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl neutra-font-bold text-gray-900">Categorías Básicas</h3>
                  <p className="text-sm text-gray-600 neutra-font">4 categorías principales • Precios por unidad</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {basicCategories.map((category) => (
                  <Card key={category.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      {category.image && (
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.nameEs}
                          width={40}
                          height={40}
                          className="rounded object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="neutra-font-bold text-gray-900 text-sm">{category.nameEs}</h4>
                        <div className="flex items-center gap-1 text-blue-600">
                          <DollarSign className="w-3 h-3" />
                          <span className="text-sm neutra-font-bold">{category.pricePerUnit}/unidad</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 neutra-font mb-3">
                      Rango: {category.minQuantity} - {category.maxQuantity}
                    </p>

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full neutra-font bg-transparent"
                      onClick={() => handleEditBasicCategory(category)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>

            {/* SECCIÓN DE OTRAS CATEGORÍAS */}
            <div className="space-y-8">
              {designOptions.map((category) => (
                <Card key={category.id} className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xl neutra-font-bold text-gray-900 capitalize">{category.name}</h3>
                      <p className="text-sm text-gray-600 neutra-font">
                        {category.options.length} opciones •{" "}
                        {category.allowMultiple ? "Múltiple selección" : "Selección única"}
                        {category.required && " • Requerido"}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleNewOption(category.id)}
                      className="bg-blue-600 hover:bg-blue-700 neutra-font"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nueva Opción
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.options.map((option) => (
                      <Card key={option.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          {option.image && (
                            <Image
                              src={option.image || "/placeholder.svg"}
                              alt={option.name}
                              width={40}
                              height={40}
                              className="rounded object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="neutra-font-bold text-gray-900 text-sm">{option.name}</h4>
                            <div className="flex items-center gap-1 text-blue-600">
                              <DollarSign className="w-3 h-3" />
                              <span className="text-sm neutra-font-bold">{option.price}</span>
                            </div>
                          </div>
                        </div>

                        {option.description && (
                          <p className="text-xs text-gray-600 neutra-font mb-3">{option.description}</p>
                        )}

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 neutra-font bg-transparent"
                            onClick={() => handleEditOption(category.id, option)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteOption(category.id, option.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CONTENIDO DE CONFIGURACIÓN */}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl neutra-font-bold text-gray-900 mb-6">Configuración del Sitio</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg neutra-font-bold text-gray-900 mb-4">Información General</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Nombre del Sitio</label>
                    <input
                      type="text"
                      defaultValue="U2 Group"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                    />
                  </div>
                  <div>
                    <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Descripción</label>
                    <textarea
                      rows={3}
                      defaultValue="Arquitectura del Futuro"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg neutra-font-bold text-gray-900 mb-4">Contacto</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="hello@u2group.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                    />
                  </div>
                  <div>
                    <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      defaultValue="+34 123 456 789"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                    />
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700 neutra-font">Guardar Cambios</Button>
            </div>
          </div>
        )}
      </div>

      {/* EDITORES MODALES */}
      {showProjectEditor && (
        <ProjectEditor project={editingProject || undefined} onSave={handleSaveProject} onCancel={handleCancelEdit} />
      )}

      {showBlogEditor && (
        <BlogEditor blog={editingBlog || undefined} onSave={handleSaveBlog} onCancel={handleCancelEdit} />
      )}

      {/* EDITOR DE OPCIONES DE DISEÑO */}
      {showOptionEditor && (
        <DesignOptionEditor
          option={editingOption || undefined}
          categoryId={selectedCategory}
          onSave={handleSaveOption}
          onCancel={handleCancelEdit}
        />
      )}

      {/* EDITOR DE CATEGORÍAS BÁSICAS */}
      {showBasicEditor && (
        <BasicCategoryEditor
          category={editingBasicCategory || undefined}
          onSave={handleSaveBasicCategory}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  )
}

// COMPONENTE EDITOR DE OPCIONES DE DISEÑO MEJORADO
function DesignOptionEditor({
  option,
  categoryId,
  onSave,
  onCancel,
}: {
  option?: AdminDesignOption
  categoryId: string
  onSave: (option: AdminDesignOption) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<AdminDesignOption>({
    id: option?.id || "",
    name: option?.name || "",
    price: option?.price || 0,
    image: option?.image || "",
    description: option?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }))
  }

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl neutra-font-bold text-gray-900 mb-6">{option ? "Editar Opción" : "Nueva Opción"}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  placeholder="Ej: Storage Room"
                />
              </div>

              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Precio (USD)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  placeholder="0"
                />
              </div>
            </div>

            {/* COMPONENTE DE SUBIDA DE IMÁGENES */}
            <ImageUploader value={formData.image} onChange={handleImageChange} label="Imagen de la Opción" />

            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Descripción (Opcional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                placeholder="Descripción de la opción..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 neutra-font bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 neutra-font">
                {option ? "Actualizar" : "Crear"} Opción
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

// COMPONENTE EDITOR DE CATEGORÍAS BÁSICAS
function BasicCategoryEditor({
  category,
  onSave,
  onCancel,
}: {
  category?: AdminBasicCategory
  onSave: (category: AdminBasicCategory) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<AdminBasicCategory>({
    id: category?.id || "",
    nameEs: category?.nameEs || "",
    nameEn: category?.nameEn || "",
    pricePerUnit: category?.pricePerUnit || 0,
    minQuantity: category?.minQuantity || 0,
    maxQuantity: category?.maxQuantity || 0,
    image: category?.image || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pricePerUnit" || name === "minQuantity" || name === "maxQuantity" ? Number(value) : value,
    }))
  }

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl neutra-font-bold text-gray-900 mb-6">
            {category ? "Editar Categoría" : "Nueva Categoría"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Nombre (Español)</label>
                <input
                  type="text"
                  name="nameEs"
                  value={formData.nameEs}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  placeholder="Ej: Puerta"
                />
              </div>

              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Nombre (Inglés)</label>
                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  placeholder="Ej: Door"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Precio por Unidad (USD)</label>
                <input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Cantidad Mínima</label>
                <input
                  type="number"
                  name="minQuantity"
                  value={formData.minQuantity}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Cantidad Máxima</label>
                <input
                  type="number"
                  name="maxQuantity"
                  value={formData.maxQuantity}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  placeholder="0"
                />
              </div>
            </div>

            {/* COMPONENTE DE SUBIDA DE IMÁGENES */}
            <ImageUploader value={formData.image} onChange={handleImageChange} label="Imagen de la Categoría" />

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 neutra-font bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 neutra-font">
                {category ? "Actualizar" : "Crear"} Categoría
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
