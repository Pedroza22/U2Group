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
} from "@/data/admin-data"
import ProjectEditor from "@/components/admin/project-editor"
import BlogEditor from "@/components/admin/blog-editor"
import MarketplaceEditor from "@/components/admin/marketplace-editor"
import ImageUploader from "@/components/admin/image-uploader"
import axios from "axios";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
} from "@/lib/api-projects";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "@/lib/api-blogs";
import {
  getMarketplaceProducts,
} from "@/lib/api-marketplace";
import { useToast } from "@/hooks/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export default function AdminDashboardPage() {
  const router = useRouter()
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"projects" | "blogs" | "design-options" | "services" | "marketplace" | "settings">("projects")
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<AdminProject | null>(null);
  const [showProjectEditor, setShowProjectEditor] = useState(false);
  const [blogs, setBlogs] = useState<AdminBlog[]>([])
  const [designOptions, setDesignOptions] = useState<AdminDesignCategory[]>([])
  const [editingBlog, setEditingBlog] = useState<AdminBlog | null>(null)
  const [showBlogEditor, setShowBlogEditor] = useState(false)

  // Estados para opciones de diseño
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [editingOption, setEditingOption] = useState<AdminDesignOption | null>(null)
  const [showOptionEditor, setShowOptionEditor] = useState(false)

  // Estado para servicios de diseño
  const [services, setServices] = useState<any[]>([]);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [showServiceEditor, setShowServiceEditor] = useState(false);

  // Estado para categorías de servicios
  const [categories, setCategories] = useState<any[]>([]);

  // Estado para productos del marketplace
  const [marketplaceProducts, setMarketplaceProducts] = useState<any[]>([]);

  // --- LÓGICA DE PROYECTOS CON API REAL ---
  // Corrección de tipado y referencias obsoletas

  // 1. Tipar correctamente los datos de la API
  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await getProjects();
      setProjects(data as AdminProject[]);
    } catch (error) {
      // Manejo de error opcional
    }
    setIsLoading(false);
  };

  // Lógica de blogs con API real
  const loadBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data as AdminBlog[]); // Cast explícito para evitar error de tipo
    } catch (error) {
      // Manejo de error opcional
    }
  };

  // Cargar servicios desde el backend
  const loadServices = async () => {
    try {
      const res = await axios.get(`${API_URL}/servicios/`);
      setServices(res.data as any[]);
    } catch (error) {
      // Manejo de error opcional
    }
  };

  // Cargar categorías desde el backend
  const loadCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categorias/`);
      setCategories(res.data as any[]);
    } catch (error) {
      // Manejo de error opcional
    }
  };

  // Función para cargar productos del marketplace
  const loadMarketplaceProducts = async () => {
    try {
      const data = await getMarketplaceProducts();
      console.log('Marketplace products loaded:', data);
      setMarketplaceProducts(data);
    } catch (error) {
      console.error('Error loading marketplace products:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos del marketplace",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("u2-admin-token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    loadProjects();
    loadBlogs();
    loadServices();
    loadCategories();
    loadMarketplaceProducts();
    // Cargar opciones de diseño
    setDesignOptions(AdminDataManager.getDesignOptions());
  }, [router]);

  const handleDeleteProject = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      await deleteProject(id);
      await loadProjects();
    }
  };

  const handleEditProject = (project: AdminProject) => {
    setEditingProject(project);
    setShowProjectEditor(true);
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setShowProjectEditor(true);
  };

  // Corrección de tipado en handleSaveProject y uso de blogs

  const handleSaveProject = async (formData: any) => {
    console.log('Intentando guardar proyecto:', formData);
    try {
    let mainImage = formData.image;
    let fd = new FormData();
    // Campos comunes
    fd.append("name", formData.name);
    fd.append("color", formData.color);
    fd.append("utilization", formData.utilization);
    fd.append("services", formData.services);
    fd.append("year", formData.year);
    fd.append("category", formData.category);
    fd.append("type", formData.type);
    fd.append("size", formData.size);
    fd.append("location", formData.location);
    fd.append("status", formData.status);
    fd.append("featured", formData.featured);
    fd.append("description", formData.description || "");
    fd.append("display_title", formData.displayTitle || "");
    fd.append("features", JSON.stringify(formData.features || []));

    // Imagen principal
    if (mainImage instanceof File) {
      fd.append("image", mainImage);
    } else if (typeof mainImage === "string" && mainImage) {
      // Si es una URL existente, incluirla
      fd.append("image", mainImage);
    }

    let project;
    if (editingProject) {
      console.log('Actualizando proyecto existente:', editingProject.id);
      project = await updateProject(editingProject.id, fd);
        toast({ title: "Proyecto actualizado", description: "El proyecto se actualizó correctamente." });
    } else {
      console.log('Creando nuevo proyecto');
      project = await createProject(fd);
        toast({ title: "Proyecto creado", description: "El proyecto se creó correctamente." });
    }
      
    // Subir imágenes extra si son archivos
    for (const img of formData.images) {
      if (img instanceof File) {
        console.log('Subiendo imagen extra:', img);
        await uploadProjectImage((project as AdminProject).id, img);
      }
    }
      
    setShowProjectEditor(false);
    setEditingProject(null);
      await loadProjects(); // Recargar proyectos
      router.refresh(); // Forzar actualización de la página
    } catch (error) {
      console.error("Error al guardar proyecto:", error);
      toast({ 
        title: "Error", 
        description: "No se pudo guardar el proyecto. Por favor, intenta de nuevo." 
      });
    }
  };

  const handleCancelEdit = () => {
    setShowProjectEditor(false)
    setShowBlogEditor(false)
    setEditingProject(null)
    setEditingBlog(null)
  }

  // Manejador para opciones de diseño
  const handleDesignOptionsUpdate = (updatedCategories: AdminDesignCategory[]) => {
    setDesignOptions(updatedCategories)
    AdminDataManager.saveDesignOptions(updatedCategories)
    toast({
      title: "Éxito",
      description: "Opciones de diseño actualizadas correctamente",
    })
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
    loadProjects(); // Reload projects to update design options count
  }

  const handleDeleteOption = (categoryId: string, optionId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta opción?")) {
      AdminDataManager.deleteDesignOption(categoryId, optionId)
      loadProjects(); // Reload projects to update design options count
    }
  }

  // Definir funciones de blogs para evitar errores de referencia
  const handleNewBlog = () => {
    setEditingBlog(null);
    setShowBlogEditor(true);
  };
  const handleEditBlog = (blog: AdminBlog) => {
    setEditingBlog(blog);
    setShowBlogEditor(true);
  };
  const handleDeleteBlog = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este blog?")) {
      await deleteBlog(id);
      await loadBlogs();
    }
  };
  const handleSaveBlog = async (formData: any) => {
    try {
    let fd = new FormData();
    fd.append("title", formData.title);
    fd.append("author", formData.author);
    fd.append("date", formData.date);
    fd.append("category", formData.category);
    fd.append("read_time", formData.read_time || "");
    fd.append("summary", formData.summary || "");
    fd.append("content", typeof formData.content === "string" ? formData.content : JSON.stringify(formData.content));
    fd.append("featured", formData.featured ? "true" : "false");
    // Imagen principal
    if (formData.image instanceof File) {
      fd.append("image", formData.image);
    }
    // Tags como JSON string
    fd.append("tags", JSON.stringify(formData.tags || []));
      
    let blog;
    if (editingBlog) {
      blog = await updateBlog(editingBlog.id, fd);
        toast({ title: "Blog actualizado", description: "El blog se actualizó correctamente." });
    } else {
      blog = await createBlog(fd);
        toast({ title: "Blog creado", description: "El blog se creó correctamente." });
    }
      
    setShowBlogEditor(false);
    setEditingBlog(null);
      await loadBlogs(); // Recargar blogs
      router.refresh(); // Forzar actualización de la página
    } catch (error) {
      console.error("Error al guardar blog:", error);
      toast({ 
        title: "Error", 
        description: "No se pudo guardar el blog. Por favor, intenta de nuevo." 
      });
    }
  };

  // CRUD de servicios
  const handleEditService = (service: any) => {
    setEditingService(service);
    setShowServiceEditor(true);
  };
  const handleNewService = () => {
    setEditingService(null);
    setShowServiceEditor(true);
  };
  const handleDeleteService = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este servicio?")) {
      await axios.delete(`${API_URL}/servicios/${id}/`);
      await loadServices();
    }
  };
  const handleSaveService = async (formData: any) => {
    console.log("Intentando guardar servicio:", formData);
    try {
      let dataToSend: any = formData;
      let config = {};
      
      if (formData.image instanceof File) {
        const fd = new FormData();
        Object.keys(formData).forEach(key => {
          if (formData[key] !== undefined && formData[key] !== null) {
            if (key === 'image') {
              if (formData.image instanceof File) {
                fd.append('image', formData.image);
              }
            } else {
              fd.append(key, formData[key]);
            }
          }
        });
        dataToSend = fd;
        config = { headers: { 'Content-Type': 'multipart/form-data' } };
      }
      
      if (formData.id) {
        await axios.patch(`${API_URL}/servicios/${formData.id}/`, dataToSend, config);
        toast({ title: "Servicio actualizado", description: "El servicio se actualizó correctamente." });
      } else {
        await axios.post(`${API_URL}/servicios/`, dataToSend, config);
        toast({ title: "Servicio creado", description: "El servicio se creó correctamente." });
      }
      
      setShowServiceEditor(false);
      setEditingService(null);
      await loadServices(); // Recargar servicios
      router.refresh(); // Forzar actualización de la página
    } catch (error) {
      console.error("Error al guardar servicio:", error);
      toast({ title: "Error", description: "No se pudo guardar el servicio." });
    }
  };

  // 2. Definir handleLogout (se usaba en el header)
  const handleLogout = () => {
    localStorage.removeItem("u2-admin-token");
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 neutra-font">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b">
        <div className="w-full px-2 md:container md:mx-auto md:px-4 py-4">
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

      <div className="w-full px-2 py-4 md:container md:mx-auto md:px-4 md:py-8">
        {/* NAVEGACIÓN DE PESTAÑAS */}
        <div className="flex gap-2 mb-8 overflow-x-auto flex-nowrap whitespace-nowrap scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
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
          {/* Eliminar la pestaña de Opciones de Diseño */}
          <Button
            onClick={() => setActiveTab("services")}
            variant={activeTab === "services" ? "default" : "outline"}
            className="neutra-font"
          >
            <FileText className="w-4 h-4 mr-2" />
            Servicios de Diseño ({services.length})
          </Button>
          <Button
            onClick={() => setActiveTab("marketplace")}
            variant={activeTab === "marketplace" ? "default" : "outline"}
            className="neutra-font"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Marketplace ({marketplaceProducts.length})
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
              {blogs.length === 0 ? (
                <div className="text-center text-gray-500 neutra-font py-12">
                  No blogs registered. Create the first one!
                </div>
              ) : (
                blogs.map((blog: any) => {
                  // Compatibilidad: blog.images (array), blog.image (string), blog.tags (array), blog.author (objeto o string)
                  const mainImage = Array.isArray(blog.images) && blog.images.length > 0 ? blog.images[0] : (blog.image || "/placeholder.svg");
                  const extraImages = Array.isArray(blog.images) && blog.images.length > 1 ? blog.images.slice(1) : [];
                  const tags = Array.isArray(blog.tags) ? blog.tags : [];
                  const authorName = typeof blog.author === "object" && blog.author !== null ? blog.author.name : (blog.author || "");
                  const summary = blog.excerpt || blog.summary || (typeof blog.content === "object" && blog.content?.intro) || "";
                  const readTime = blog.readTime || blog.read_time || "";
                  return (
                <Card key={blog.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex gap-6 flex-col md:flex-row">
                        <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 mb-4 md:mb-0">
                      <Image
                            src={mainImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs neutra-font">
                          {blog.category}
                        </span>
                        {blog.featured && <Star className="w-4 h-4 text-yellow-500" />}
                      </div>
                      <h3 className="text-lg neutra-font-bold text-gray-900 mb-2">{blog.title}</h3>
                            <p className="text-gray-600 neutra-font text-sm mb-2 line-clamp-2">{summary}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 neutra-font flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {blog.date}
                        </span>
                              <span>{readTime}</span>
                              <span>Por {authorName}</span>
                      </div>
                            {tags.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {tags.map((tag: string, idx: number) => (
                                  <span key={idx} className="bg-gray-200 text-xs px-2 py-1 rounded neutra-font">{tag}</span>
                                ))}
                    </div>
                            )}
                          </div>
                          <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
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
                      </div>
                      {/* Galería de imágenes adicionales */}
                      {extraImages.length > 0 && (
                        <div className="flex gap-2 mt-4 flex-wrap">
                          {extraImages.map((img: string, idx: number) => (
                            <div key={idx} className="relative w-20 h-16 rounded overflow-hidden border">
                              <Image src={img} alt={`Imagen extra ${idx + 2}`} fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Eliminar el contenido de Opciones de Diseño */}

        {/* CONTENIDO DE SERVICIOS DE DISEÑO */}
        {activeTab === "services" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl neutra-font-bold text-gray-900">Gestión de Servicios de Diseño</h2>
              <Button onClick={handleNewService} variant="default"><Plus className="w-4 h-4 mr-2" />Nuevo Servicio</Button>
            </div>
            {/* Cambios en la tabla de servicios para responsividad */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded text-xs md:text-sm">
                <thead>
                  <tr>
                    <th className="px-2 md:px-4 py-2 border-b">Imagen</th>
                    <th className="px-2 md:px-4 py-2 border-b">Nombre (ES)</th>
                    <th className="px-2 md:px-4 py-2 border-b">Nombre (EN)</th>
                    <th className="px-2 md:px-4 py-2 border-b">Precio</th>
                    <th className="px-2 md:px-4 py-2 border-b">Área máx</th>
                    <th className="px-2 md:px-4 py-2 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td className="px-2 md:px-4 py-2 border-b">
                        {service.image ? (
                          <Image 
                            src={
                              service.image.startsWith('http')
                                ? service.image
                                : `http://localhost:8000/media/${service.image.startsWith('services/') ? service.image : 'services/' + service.image}`
                            }
                            alt={service.name_es}
                            width={40}
                            height={40}
                            className="rounded object-cover" 
                          />
                        ) : (
                          <span className="text-gray-400">Sin imagen</span>
                        )}
                      </td>
                      <td className="px-2 md:px-4 py-2 border-b">{service.name_es}</td>
                      <td className="px-2 md:px-4 py-2 border-b">{service.name_en}</td>
                      <td className="px-2 md:px-4 py-2 border-b">${service.price_min_usd || 0}</td>
                      <td className="px-2 md:px-4 py-2 border-b">{service.area_max_m2 ? `${service.area_max_m2} m²` : '-'}</td>
                      <td className="px-2 md:px-4 py-2 border-b">
                        <Button size="sm" variant="outline" onClick={() => handleEditService(service)}><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteService(service.id)} className="ml-2"><Trash2 className="w-4 h-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Aquí puedes agregar el modal/editor para crear/editar servicios */}
            {showServiceEditor && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative">
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold" onClick={() => setShowServiceEditor(false)} aria-label="Cerrar">×</button>
                  <h3 className="text-xl neutra-font-bold text-gray-900 mb-4">{editingService ? "Editar Servicio" : "Nuevo Servicio"}</h3>
                  {/* Cambios en el formulario de edición/creación de servicio */}
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Submit formulario servicio", editingService);
                    handleSaveService(editingService);
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Nombre (Español)</label>
                        <input
                          type="text"
                          name="nameEs"
                          value={editingService?.name_es || ""}
                          onChange={(e) => setEditingService({ ...editingService, name_es: e.target.value })}
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
                          value={editingService?.name_en || ""}
                          onChange={(e) => setEditingService({ ...editingService, name_en: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                          placeholder="Ej: Door"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Precio (USD)</label>
                        <input
                          type="number"
                          name="price"
                          value={editingService?.price_min_usd || ""}
                          onChange={(e) => setEditingService({ ...editingService, price_min_usd: Number(e.target.value) })}
                          min="0"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Área Máxima (m²)</label>
                        <input
                          type="number"
                          name="areaMax"
                          value={editingService?.area_max_m2 || ""}
                          onChange={(e) => setEditingService({ ...editingService, area_max_m2: Number(e.target.value) })}
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Categoría</label>
                        <select
                          name="category_id"
                          value={editingService?.category_id || ""}
                          onChange={e => setEditingService({ ...editingService, category_id: Number(e.target.value) })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                        >
                          <option value="">Selecciona una categoría</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                              {cat.emoji ? `${cat.emoji} ` : ""}{cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Imagen</label>
                        <ImageUploader
                          value={editingService?.image || ""}
                          onChange={(imageUrl) => setEditingService({ ...editingService, image: imageUrl })}
                          label="Imagen del Servicio"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowServiceEditor(false)} className="flex-1 neutra-font bg-transparent">
                        Cancelar
                      </Button>
                      <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 neutra-font">
                        {editingService ? "Actualizar" : "Crear"} Servicio
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONTENIDO DE MARKETPLACE */}
        {activeTab === "marketplace" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl neutra-font-bold text-gray-900">Gestión de Marketplace</h2>
            </div>

            <MarketplaceEditor
              products={marketplaceProducts}
              onRefresh={loadMarketplaceProducts}
            />
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
    image: typeof option?.image === "string" ? option.image : "",
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

  const handleImageChange = (imageUrl: string | File | null) => {
    setFormData((prev) => ({
      ...prev,
      image: typeof imageUrl === "string" ? imageUrl : "",
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
