import { Container, Typography } from '@mui/material'

export default function AboutPage() {
  return (
    <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
      <Typography variant='h1' component='h1' gutterBottom>
        About
      </Typography>
      <Typography variant='body1' paragraph>
        This is the About page of our React MUI Template. Built with Material-UI
        components for a consistent and beautiful user experience.
      </Typography>
    </Container>
  )
}
