import { createMuiTheme } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'
import orange from '@material-ui/core/colors/orange'
import lightGreen from '@material-ui/core/colors/lightGreen'
import grey from '@material-ui/core/colors/grey'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[900],
      contrastText: orange[600]
    },
    secondary: {
      main: lightGreen['A400'],
      contrastText: grey[900]
    }
  },
  typography: {
    htmlFontSize: 20,
  },
})

export default theme