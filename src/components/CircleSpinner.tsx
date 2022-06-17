export default function CircleSpinner({
  color,
  bgcolor,
}: {
  color: string
  bgcolor?: string
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 animate-spin"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        strokeWidth="10"
        stroke={color}
      />

      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        stroke={bgcolor || 'white'}
        strokeWidth="15"
        strokeDasharray="283"
        strokeDashoffset="75"
      />
    </svg>
  )
}
