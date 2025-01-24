'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { CourseExterne } from '@/types/models'

export const columns: ColumnDef<CourseExterne>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('id') || 'N/A'}</div>,
  },
  {
    accessorKey: 'statut',
    header: 'Statut',
    cell: ({ row }) => {
      const statut = row.getValue('statut') as string
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium
          ${statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' : 
            statut === 'En cours' ? 'bg-blue-100 text-blue-800' : 
            statut === 'Terminée' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'}`}>
          {statut || 'Inconnu'}
        </div>
      )
    },
  },
  {
    accessorKey: 'dateHeureDebut',
    header: 'Date de début',
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('total') as string) || 0
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const course = row.original
      return (
        <Button variant="ghost" onClick={() => console.log('Éditer', course)}>
          Éditer
        </Button>
      )
    },
  },
]

