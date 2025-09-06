import { Box, Container, Paper, Stack, Typography, styled } from '@mui/material'

/** Styled Root Container */
export const StyledRootBox = styled(Box)(() => ({
  flexGrow: 1,
}))

/** Styled App Bar Title */
export const StyledAppBarTitle = styled(Typography)<{
  component?: React.ElementType
}>(() => ({
  flexGrow: 1,
}))

/** Styled Main Container */
export const StyledMainContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}))

/** Styled Welcome Paper */
export const StyledWelcomePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}))

/** Styled Button Stack */
export const StyledButtonStack = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(3),
}))

/** Styled Features Paper */
export const StyledFeaturesPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}))
