import React, { useState } from 'react'
import Button from '../button'
import { Grid, Divider, IconButton, Select, MenuItem } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import './style.css'
import AuthOutlet from '../authoutlet'
import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
function renderButtonArray (buttonArray) {
  return buttonArray.map((item, index) => {
    return (
      <AuthOutlet
        key={index}
        isAuthRequired={item.isAuthRequired}
        from={item.from}
        action={item.action}
      >
        <Button
          ICON={item.ICON}
          isLight={item.isLight ? item.isLight : false}
          title={item.label}
          handleButtonClick={item.handler}
        />
      </AuthOutlet>
    )
  })
}
function renderBackButtonArray (showBackButton) {
  return showBackButton.map((back, index) => {
    return (
      <IconButton
        aria-label='go back'
        key={index}
        size='small'
        onClick={back.handler}
        sx={{
          ...((back.isActive && { backgroundColor: '#your-active-color' }) ||
            {}),
          marginLeft: '-9px!important',
          marginTop: '2px!important',
          '@media (max-width: 960px)': {
            marginLeft: '-9px!important',
            marginTop: '2px!important'
          }
        }}
      >
        <ArrowBackIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
      </IconButton>
    )
  })
}
export default function PageHeader ({
  title,
  subtitle,
  buttonArray,
  info,
  showBackButton,
  headerDropwdown,
  options,
  labelkey,
  valuekey,
  value,
  handleChange,
  showTooltip
}) {
  const { length } = options || ''
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipTitle, setTooltipTitle] = useState('')
  const handleTitleClick = (e, name) => {
    setTooltipOpen(true)
    setTooltipTitle(name)
  }
  const handleTooltipClose = () => {
    setTooltipOpen(false)
    setTooltipTitle('')
  }
  const GreenTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#517223',
      color: '#eee',
      boxShadow: theme.shadows[1],
      fontSize: 11
    }
  }))
  return (
    <>
      {showBackButton && showBackButton.length > 0
        ? (
          <Grid container spacing={1} className='page-header-container '>
            <Grid item xs={1} sm={1} md={1}>
              {renderBackButtonArray(showBackButton)}
            </Grid>
            <Grid item xs={4} sm={4} md={4} sx={{ marginLeft: '-5%!important' }}>
              <Grid item xs={12} sm={12} md={12}>
                {showTooltip
                  ? (
                    <GreenTooltip
                      title={tooltipTitle}
                      open={tooltipOpen}
                      onClose={handleTooltipClose}
                      enterDelay={500}
                    >
                      <p
                        className={`page-section-title${
                      showTooltip ? ' tooltip' : ''
                    }`}
                        onClick={(e) => handleTitleClick(e, title)}
                      >
                        {title}
                      </p>
                    </GreenTooltip>
                    )
                  : (
                    <p className='page-section-title'>{title}</p>
                    )}
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                {subtitle && <span className='label-light'>{subtitle}</span>}
              </Grid>
            </Grid>
            <Grid item xs={7} sm={7} md={7} className='button-container'>
              {headerDropwdown && (
                <Select
                  value={length ? value || '' : ''}
                  size='small'
                  onChange={handleChange}
                >
                  {(options || []).map((option, index) => (
                    <MenuItem
                      value={valuekey ? option[valuekey] || index : option}
                      key={index}
                      className='menu-item-dropdown-item'
                    >
                      {labelkey ? option[labelkey] : option}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {buttonArray &&
              buttonArray.length > 0 &&
              renderButtonArray(buttonArray)}
            </Grid>
            {info && (
              <Grid item xs={12} sm={12} md={12}>
                {info.map((data, index) => (
                  <span className='label-light' key={index}>
                    {data.title && (
                      <>
                        <b>{data.title}</b>:
                      </>
                    )}
                    {data.value}
                    {info.length - 1 !== index && <>, </>}
                  </span>
                ))}
              </Grid>
            )}
          </Grid>
          )
        : (
          <Grid container spacing={2} className='page-header-container '>
            <Grid item xs={6} sm={6} md={3}>
              <p className='page-section-name'>
                {title}
                {subtitle && <span className='label-light'>{subtitle}</span>}
              </p>
            </Grid>
            <Grid item xs={6} sm={5} md={9} className='button-container'>
              {headerDropwdown && (
                <Select
                  value={length ? value || '' : ''}
                  size='small'
                  onChange={handleChange}
                >
                  {(options || []).map((option, index) => {
                    return (
                      <MenuItem
                        value={valuekey ? option[valuekey] || index : option}
                        key={index}
                        className='menu-item-dropdown-item'
                      >
                        {labelkey ? option[labelkey] : option}
                      </MenuItem>
                    )
                  })}
                </Select>
              )}
              {buttonArray &&
              buttonArray.length > 0 &&
              renderButtonArray(buttonArray)}
            </Grid>
            {info && (
              <Grid item xs={12} sm={12} md={12}>
                {info.map((data, index) => (
                  <span className='label-light' key={index}>
                    {data.title && (
                      <>
                        <b>{data.title}</b>:
                      </>
                    )}
                    {data.value}
                    {info.length - 1 !== index && <>, </>}
                  </span>
                ))}
              </Grid>
            )}
          </Grid>
          )}
      <Divider />
    </>
  )
}
