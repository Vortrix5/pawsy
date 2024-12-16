const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`pb-4 px-4 text-sm font-medium border-b-2 ${
      active
        ? 'border-primary text-primary'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
  >
    {children}
  </button>
)

export default TabButton
