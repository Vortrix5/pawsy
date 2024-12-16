const FormSection = ({ title, icon: Icon, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 pb-2 border-b">
      <Icon className="h-5 w-5 text-primary" />
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
)

export default FormSection
