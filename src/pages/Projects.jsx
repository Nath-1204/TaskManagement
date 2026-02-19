import { FolderOpen, Plus, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CreateProjectDialog from '../components/CreateProjectDialog';
import ProjectCard from '../components/ProjectCard';


const Projects = () => {

  const projects = useSelector(
    (state) => state?.workspace?.currentWorkspace?.projects || []
  );

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "ALL",
    priority: "ALL",
  });

  const filterProjects = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (project) => 
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          project.description?.toLowerCase().includes(searchTerm.toLowerCase()
        )
      )
    }

    if (filters.status !== "ALL") {
      filtered = filtered.filter(
        (project) => project.status === filters.status
      )
    }

    if (filters.priority !== "ALL") {
      filtered = filtered.filter(
        (project) => project.priority === filters.priority
      )
    }

    setFilteredProjects(filtered);
  }

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, filters]);

  return (
    <div className='space-y-6 max-w-6xl mx-auto'>

      {/* Header */}
      <div className='flex flex-col lg:flex-row justify-between items-start lg:flex-row lg:items-center gap-6 '>
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            Projets
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm"> 
            Gérer et trace tes projets
          </p>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className='flex items-center px-5 py-2 text-sm rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:opacity-90 transition'
        >
          <Plus className='size-4 mr-2'/> Nouveau Projet
        </button>
        <CreateProjectDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      </div>

      {/* Search and Filters */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div className="relative w-full max-w-sm">
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-zinc-400 w-4 h-4'/>
          <input 
            type="text" 
            className='w-full pl-10 text-sm pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-400 focus:border-blue-500 outline-none'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Recherche projets.....'
          />
        </div>
        <select 
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value})}
          className='px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 text-gray-900 dark:text-white text-sm '
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="PLANNING">Planning</option>
          <option value="COMPLETED">Completé</option>
          <option value="ON_HOLD">En Main</option>
          <option value="CANCELLED">Annulé</option>
        </select>
        <select 
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value})}
          className='px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 text-gray-900 dark:text-white text-sm '
        >
          <option value="ALL">all Priority</option>
          <option value="HIGH">Haut</option>
          <option value="MEDIUM">Moyen</option>
          <option value="LOW">Bas</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
        {
          filterProjects.length === 0 ? (
            <div className='col-span-full text-center py-16'>
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <FolderOpen className="w-12 h-12 text-gray-400 dark:text-zinc-500"/>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
                Aucun projet trouvé
              </h3>
              <p className="text-gray-500 dark:text-zinc-400 mb-6 text-sm">
                Créer ton premier projet pour commencer
              </p>
              <button
                onClick={() => setIsDialogOpen(true)}
                className='flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mx-auto text-sm'
              >
                <Plus className='size-4' />
                Créer Projet
              </button>
            </div>
          ) : (
            filterProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )
        }
      </div>
      
    </div>
  )
}

export default Projects
