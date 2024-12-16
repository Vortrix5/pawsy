import { Link } from 'react-router-dom'
import { PawPrint } from 'lucide-react'
import InputField from '../forms/InputField'

const AuthForm = ({
  title,
  subtitle,
  fields,
  submitText,
  footerText,
  footerLinkText,
  footerLinkTo,
  onSubmit,
  formData,
  handleChange,
  extraContent,
}) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center space-y-4 mb-8">
        <div className="flex justify-center">
          <div className="bg-primary/10 p-3 rounded-full">
            <PawPrint className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {fields.map((field) => (
          <InputField
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}

        {extraContent}

        <button
          type="submit"
          className="w-full px-6 py-3 text-base font-medium bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          {submitText}
        </button>

        {footerText && (
          <p className="text-center text-sm text-gray-600">
            {footerText}{' '}
            <Link to={footerLinkTo} className="text-primary hover:text-primary/80 font-medium">
              {footerLinkText}
            </Link>
          </p>
        )}
      </form>
    </div>
  )
}

export default AuthForm
