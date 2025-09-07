import { Box, CircularProgress, Typography } from '@mui/material'

export default function LoadingFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 2,
      }}
    >
      <CircularProgress size={24} />
      <Typography variant='body2' color='text.secondary'>
        Loading...
      </Typography>
    </Box>
  )
}
