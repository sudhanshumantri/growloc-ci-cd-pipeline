import React from 'react';
import './style.css';
import Button from '@mui/material/Button';
/**
 * it accepts title and ICON component
 * if ICON component is not present, it skips the rendering
 * 
 */
export default function ButtonCustom({ title, ICON, handleButtonClick, routePath, isLight, isFullWidth }) {
    let className = 'button-custom';
    if (isLight) {
        className = 'button-custom-light'
    }
    return (
        <Button className={className} variant="outlined" endIcon={ICON ? ICON : null}
            onClick={() => handleButtonClick()}
        >
            {title}
        </Button>
    )

}