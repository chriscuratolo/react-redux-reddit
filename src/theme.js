import {
  cyan500, cyan700,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import spacing from 'material-ui/styles/spacing'

const theme = getMuiTheme({
  appBar: {
    height: 46,
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: white,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: '#FF4500',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: fullBlack,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  spacing,
})

export default theme
