import { createTheme } from '@mui/material/styles';
import { grey, pink } from '@mui/material/colors';

const theme = createTheme({
  direction: 'rtl',
  fontFamily: 'NotoSansArabicMedium',
  palette: {
    primary: {
      main: grey[700],
    },
    success: {
      main: pink[500],
    }
  },
  typography: {
    fontFamily: ['Noto Sans Arabic', 'El Messiri', 'sans-serif'],
    //fontSize: '30px'
  },
   components: {
    MuiTypography: {
      defaultProps: {
        sx: {
          // padding
          px: 1,
        },
        variant: 'subtitle2',
        textTransform: 'capitalize'
      }
    },
    MuiStack: {
      defaultProps: {
        sx: {
          px: 2, 
          py: 1,
        },
        spacing: 2,
        direction: 'row',
      }
    }, 
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    }, 
    MuiLink: {
      defaultProps: {
        sx: {
          color: theme => theme.palette.primary.main,
        },
        underline: 'none'
      }
    },
    MuiButton: {
      defaultProps: {
        //size: 'small',
        //p: 0,
        // disableRipple: true
      },
      variant: 'text',
    },
    MobileDatePicker: {
      defaultProps: {
        sx: {
          fontFamily: "NotoSansArabicMedium, 'Noto Sans Arabic' !important",
        }
      }
    }
   }
});

export default theme;