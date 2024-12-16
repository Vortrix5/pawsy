import { CheckCircle, Clock, XCircle } from 'lucide-react'

const StatusBadge = ({ status, withIcon = false }) => {
  const getStatusClasses = () => {
    const baseClasses = 'px-2 py-1 rounded-full text-sm inline-flex items-center gap-1.5'
    switch (status) {
      case 'available':
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'adopted':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return baseClasses
    }
  }

  const getStatusIcon = () => {
    if (!withIcon) return null
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'approved':
        return <CheckCircle className="h-4 w-4" />
      case 'rejected':
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <span className={getStatusClasses()}>
      {withIcon && getStatusIcon()}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default StatusBadge
