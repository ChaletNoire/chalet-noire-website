import React from 'react'

interface LogoRotatingProps {
  svgPath: string
}

const LogoRotating = ({ svgPath }: LogoRotatingProps) => {
  return (
    <div className="logo-container">
      <div className="logo-rotating">
        <img src={svgPath} alt="Logo" className="logo-image logo-front" />
        <img src={svgPath} alt="Logo" className="logo-image logo-back" />
      </div>
    </div>
  )
}

export default LogoRotating
