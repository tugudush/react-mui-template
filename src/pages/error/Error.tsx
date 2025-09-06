import { useNavigate } from 'react-router'

interface ErrorPageProps {
  errorCode?: number
  errorMessage?: string
}

export default function ErrorPage({
  errorCode = 404,
  errorMessage = 'Page Not Found',
}: ErrorPageProps) {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <>
      <h1>{errorCode}</h1>
      <h4>{errorMessage}</h4>
      <button onClick={handleGoBack}>Go Back</button>
    </>
  )
}
