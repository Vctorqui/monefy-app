"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronUp, Filter, Search, ChevronLeft, ChevronRight } from "lucide-react"

export interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, row: T) => React.ReactNode
  className?: string
}

export interface FilterOption {
  key: string
  label: string
  options: Array<{ value: string; label: string }>
}

export interface CustomTableProps<T> {
  data: T[]
  columns: Column<T>[]
  filterOptions?: FilterOption[]
  searchFields?: (keyof T)[]
  pageSize?: number
  className?: string
  onRowClick?: (row: T) => void
  actions?: (row: T) => React.ReactNode
}

export function CustomTable<T extends Record<string, any>>({
  data,
  columns,
  filterOptions = [],
  searchFields = [],
  pageSize = 5,
  className = "",
  onRowClick,
  actions
}: CustomTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = useState(1)

  // Función de búsqueda
  const filteredData = useMemo(() => {
    let filtered = data

    // Búsqueda por texto
    if (searchTerm && searchFields.length > 0) {
      filtered = filtered.filter((item) =>
        searchFields.some((field) => {
          const value = item[field]
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        })
      )
    }

    // Filtros específicos
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all") {
        filtered = filtered.filter((item) => {
          const itemValue = item[key]
          if (itemValue === null || itemValue === undefined) return false
          return itemValue.toString().toLowerCase() === value.toLowerCase()
        })
      }
    })

    return filtered
  }, [data, searchTerm, searchFields, filters])

  // Función de ordenamiento
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [filteredData, sortField, sortDirection])

  // Función de paginación
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return sortedData.slice(startIndex, endIndex)
  }, [sortedData, currentPage, pageSize])

  // Función para manejar el ordenamiento
  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Función para manejar filtros
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
    setCurrentPage(1) // Reset a la primera página
  }

  // Función para limpiar filtros
  const clearFilters = () => {
    setFilters({})
    setSearchTerm("")
    setCurrentPage(1)
  }

  // Cálculos de paginación
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Barra de herramientas */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Búsqueda */}
        {searchFields.length > 0 && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <Select
              key={filter.key}
              value={filters[filter.key] || ""}
              onValueChange={(value) => handleFilterChange(filter.key, value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

          {/* Botón para limpiar filtros */}
          {(Object.values(filters).some(value => value && value !== "all") || searchTerm) && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Limpiar
            </Button>
          )}
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={`${column.className || ""} ${
                    column.sortable ? "cursor-pointer hover:bg-muted/50" : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortField === column.key && (
                      sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    )}
                  </div>
                </TableHead>
              ))}
              {actions && <TableHead className="text-center">Acciones</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className={column.className || ""}>
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="text-center">
                      {actions(row)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-8">
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Mostrando {((currentPage - 1) * pageSize) + 1} a {Math.min(currentPage * pageSize, sortedData.length)} de {sortedData.length} resultados
          {totalPages > 1 && ` (Página ${currentPage} de ${totalPages})`}
        </div>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!hasPrevPage}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!hasNextPage}
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
