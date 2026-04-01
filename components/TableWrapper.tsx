const TableWrapper = ({ children }) => {
  return (
    <div className="w-full">
      <table className="w-full table-fixed">{children}</table>
    </div>
  )
}

export default TableWrapper
