import React from "react"

function Spinner() {
  return (
    <div className="flex justify-center items-center bg-transparent ">
      <div className={`w-16 h-16 border-4 border-primary border-solid border-t-transparent rounded-full animate-spin bg-transparent`}></div>
    </div>
  )
}

export default Spinner