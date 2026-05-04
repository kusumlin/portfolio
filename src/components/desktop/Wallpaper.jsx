import React from 'react'

export default function Wallpaper() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'url(/homescreen.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }}
    />
  )
}
