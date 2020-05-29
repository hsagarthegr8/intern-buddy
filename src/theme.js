import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
    props: {
        MuiTextField: {
            variant: 'outlined',
            size: 'small'
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    }
})

export default theme