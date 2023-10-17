import { styled, Button } from '@mui/material';
import { defaultColorTemplate } from '../../UIProvider'

export const CreateButton = styled(Button)(() => ({
    fontFamily: "'Poppins', normal",
    backgroundColor: defaultColorTemplate.mainColor,
    padding: '8px',
    fontSize: '0.7rem',
    color: defaultColorTemplate.secondaryColor,
    textTransform: 'none',
    maxWidth: '140px',
    maxHeight: '35px',
    minWidth: '160px',
    minHeight: '30px',
    '&:hover': {
        background: defaultColorTemplate.mainColorHover,
    },
}));
