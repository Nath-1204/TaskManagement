import React, { useState } from 'react'
import CreateProjectDialog from '../components/CreateProjectDialog'
import StatsGrid from '../components/StatsGrid'
import ProjectOverview from '../components/ProjectOverview'
import RecentActivity from '../components/RecentActivity'
import TaskSummary from '../components/TaskSummary'
import { Plus } from 'lucide-react'


const Dashboard = () => {

  const user = { fullName: 'User' }
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className='max-w-6xl mx-auto'>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ">
        <div>
          <h1 className='text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1'>
            Welcome back, {user?.fullName || 'User' }
          </h1>
          <p className='text-gary-500 dark:text-zinc-400 text-sm '> Voilà ce qui se passe avec tes projets aujourd'hui</p>
        </div>

        <button
          onClick={() => setIsDialogOpen(true)}
          className='flex items-center gap-2 px-5 py-2 text-sm rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white space-x-2 hover:opacity-90 trasition'
        >
          <Plus size={16} /> Nouveau Projet
        </button>

        <CreateProjectDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      </div>

      <StatsGrid />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProjectOverview  />
          <RecentActivity />
        </div>
        <div>
          <TaskSummary />
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard
