import { Activity, Search, Shield, UserPlus, UsersIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import InviteMemberDialog from '../components/InviteMemberDialog';


const Team = () => {
  
  const [tasks, setTasks] = useState([]);
  const [searchTeam, setSearchTeam] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const currentWorskspace = useSelector((state) => state?.workspace?.currentWorskspace || null );
  const projects = currentWorskspace?.projects || [];

  const filteredUsers = users.filter(
    (user) => 
      user?.user?.name?.toLowerCase().includes(searchTeam.toLowerCase()) ||
      user?.user?.email?.toLowerCase().includes(searchTeam.toLowerCase())
  );

  useEffect(() => {
    setUsers(currentWorskspace?.members || []);
    setTasks(currentWorskspace?.projects?.reduce(
      (acc, project) => [...acc, ...project.tasks], []) || []
    );
  }, [currentWorskspace]);


  return (
    <div className='space-y-6 max-w-6xl mx-auto'>

      {/* header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ">
        <div>
          <h1 className='text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1'>Equipe</h1>
          <p className='text-gray-500 dark:text-zinc-400 text-sm'>
            Gérer les membres de l'équipe et leurs contributions
          </p>
        </div>
        <button

          onClick={() => setIsDialogOpen(true)}
          className='flex items-center px-5 py-2 rounded text-sm bg-gradient-to-br from-blue-500 to-blue-600 
          hover:opacity-90 text-white trasition'
        >
          <UserPlus className='w-4 h-4 mr-2' /> Invite membre
        </button>
        <InviteMemberDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      </div>

      {/* Stats Cards */}
      <div className='flex flex-wrap gap-4'>
        {/* Total Members */}
        <div className='max-sm:w-full dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 
        border border-gray-300 dark:border-zinc-800 rounded-lg p-6'
        > 
          <div className='flex items-center justify-between gap-8 md:gap-22'>
            <div>
              <p className='text-sm text-gray-500 dark:text-zinc-400'>Total Membres</p>
              <p className='text-xl font-bold text-gray-900 dark:text-white'>{users.length}</p>
            </div>
            <div className='p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10'>
              <UsersIcon className='size-4 text-blue-500 dark:text-blue-200'/>
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="max-sm:w-full dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 
        border border-gray-300 dark:border-zinc-800 rounded-lg p-6"
        >
          <div className="flex items-center justify-between gap-8 md:gap-22">
            <div>
              <p className='text-sm text-gray-500 dark:text-zinc-400'>Projet Active</p>
              <p className='text-xl font-bold text-gray-900 dark:text-white'>
                { 
                  projects.filter((p) => 
                    p.status !== "CANCELLED" && p.status !== "COMPLETED"
                  ).length
                }
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 ">
              <Activity className='size-4 text-emerald-500 dark:text-emerald-200'/>
            </div>
          </div>
        </div>

        {/* Total Tasks */}
        <div className='max-sm:w-full dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 
        border border-gray-300 dark:border-zinc-800 rounded-lg p-6'
        >
          <div className="flex items-center justify-between gap-8 md:gap-22">
            <div>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Total Travail</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {tasks.length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-500/10">
              <Shield className="size-4 text-purple-500 dark:text-purple-200"/>
            </div>
          </div>
        </div>
      </div>

      {/* Search  */}
      <div className="relative max-w-md">
        <Search className='absolute left-3 top-1/2 transfrom -translate-y-1/2 text-gray-400 dark:text-zinc-400 size-3'/>
        <input 
          type="text" 
          placeholder="Rechercher un membre d'équipe..."
          value={searchTeam}
          onChange={(e)=> setSearchTeam(e.target.value)}
          className='pl-8 w-full text-sm rounded-md border border-gray-300 dark:border-zinc-800 text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-zinc-400 py-2 focus:outline-none focus:border-blue-500'
        />
      </div>

      {/* Team Members */}
      <div className="w-full">
        {
          filteredUsers.length === 0 ? (
            <div className='col-span-full text-center py-16'>
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <UsersIcon className='w-12 h-12 text-gray-400 dark:text-zinc-500'/>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {
                  users.length === 0
                    ? "Pas de membre d'équipe"
                    : "Pas membre trouvé"
                }
              </h3>
              <p className="text-gray-500 dark:text-zinc-400 mb-6">
                {
                  users.length === 0 
                    ? "Invite des membres pour démarrer la collaboration"
                    : "Essaye d'adjuster ton terme de recherche "
                }
              </p>
            </div>
          ) : (
            <div className='max-w-4xl w-full'>
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto rounded-md border border-gary-200 dark:border-zinc-800">
                <table className='min-w-full divide-y divide-gray-200 dark:divide-zinc-800'>
                  <thead className="bg-gray-50 dark:bg-zinc-900/50">
                    <tr>
                      <th className="px-6 py-2.5 text-left font-medium text-sm">
                        Name
                      </th>
                      <th className="px-6 py-2.5 text-left font-medium text-sm">
                        Email
                      </th>
                      <th className="px-6 py-2.5 text-left font-medium text-sm">
                        Rôle
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                    {
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors " 
                        >
                          <td className='px-6 py-2.5 whitespace-nowrap flex items-center gap-3'>
                            <img 
                              src={user.user.image} 
                              alt={user.user.name}
                              className='size-7 rounded-full bg-gray-200 dark:bg-zinc-800'
                            />
                            <span className='text-sm text-zinc-800 dark:text-white truncate'>
                              {user.user?.name || "Utilisateur inconnu"}
                            </span>
                          </td>
                          <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">
                            {user.user.email}
                          </td>
                          <td className='px-6 py-2.5 whitespace-nowrap'>
                            <span 
                              className={`px-2 py-1 text-xs rounded-md ${user.role === "ADMIN" 
                                ? "bg-purple-100 dark:bg-purple-500/20 text-purple-500 dark:text-purple-400"
                                : "bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300"
                              }`}
                            >
                              {user.role || "User"}
                            </span>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              
            </div>
          ) 
        }
      </div>
      
      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {
          filteredUsers.map((user) => (
            <div 
              className='p-4 border border-gray-200 dark:border-zinc-800 rounded-md bg-white dark:bg-zinc-900'
              key={user.id}
            >
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src={user.user.image} 
                  alt={user.user.name} 
                  className="size-9 rounded-full bg-gray-200 dark:bg-zinc-800" 
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user.user?.name || "Utilisateur inconnu"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    {user.user.email}
                  </p>
                </div>
              </div>
              <div>
                <span 
                  className={`px-2 py-1 text-xs rounded-md ${user.role === "ADMIN"
                    ? "bg-purple-100 dark:bg-purple-500/20 text-purple-500 dark:text-purple-400"
                    : "bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300"
                  }`}
                >
                  {user.role || "User"}
                </span>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Team
