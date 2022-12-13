import React from 'react';
import './style.css';
import Button from '@mui/material/Button';
/**
 * it accepts title and ICON component
 * if ICON component is not present, it skips the rendering
 * 
 */
export default function ButtonCustom({ title, ICON, handleButtonClick, routePath, isLight,disabled, isFullWidth, ENDICON, variant, type }) {
    let className = 'button-custom';
    if (isLight) {
        className = 'button-custom-light'
    }
    return (
        <Button disabled={disabled ? disabled : false} className={disabled ? 'button-custom-light' : className} type={type ? type : ''} fullWidth={isFullWidth ? isFullWidth : false} variant={variant ? variant : "outlined"} startIcon={ICON ? ICON : null} endIcon={ENDICON ? ENDICON : null}
            onClick={() => handleButtonClick ? handleButtonClick() : () => { }}>
            {title}
        </Button>
    )

}