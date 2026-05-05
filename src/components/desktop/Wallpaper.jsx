
export default function Wallpaper() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'url(/homescreen4.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }}
    />
  )
}
