import { Box, Button, Container, Typography } from '@mui/material'
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
    <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
        }}
      >
        <Typography variant='h1' component='h1' color='error' gutterBottom>
          {errorCode}
        </Typography>
        <Typography variant='h4' component='h2' gutterBottom>
          {errorMessage}
        </Typography>
        <Typography variant='body1' color='text.secondary' paragraph>
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </Typography>
        <Button variant='contained' color='primary' onClick={handleGoBack}>
          Go Back
        </Button>
      </Box>
    </Container>
  )
}
