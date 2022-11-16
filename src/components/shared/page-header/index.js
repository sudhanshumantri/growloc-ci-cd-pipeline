import React from 'react';
import Button from '../button';
import { Grid } from "@mui/material";
import './style.css';
function renderButtonArray(buttonArray) {
    return (
        buttonArray.map((item, index) => {
            return (
                <Button ICON={item.ICON} key={index} isLight={item.isLight ? item.isLight : false} title={item.label} handleButtonClick={item.handler} />

            )
        })
    )
}

export default function PageHeader({ title, subtitle, buttonTitle, buttonArray, info, customButton, }) {
    //export default class PageHeader extends React.Component {
    return (
        <Grid container spacing={2} className='page-header-container '>
            <Grid item xs={6} sm={6} md={6}>
                <p className='page-section-title'>{title}
                    {subtitle && (
                        <span className='label-light'>{subtitle}</span>
                    )}
                </p>
            </Grid>
            <Grid item xs={6} sm={6} md={6} className='button-container'>
                {buttonArray && buttonArray.length > 0 && (
                    renderButtonArray(buttonArray)
                )}
            </Grid>
            {info && (
                <Grid item xs={12} sm={12} md={12}>
                    {info.map((data, index) => (
                        <span className='label-light'>
                            {data.title && (
                                <>
                                    <b>{data.title}</b>:
                                </>
                            )}

                            {data.value}
                            {info.length - 1 != index && (
                                <>, </>
                            )}
                        </span>
                    ))}
                </Grid>
            )}
        </Grid>
    )
}
{/* <div className='page-header-container'>
                <div className='page-header-top-row'>
                    <div style={{ flex: 4, display: 'flex' }}>

                        <p className='page-section-title'>{title}
                            {subtitle && (
                                <span className='label-light'>{subtitle}</span>
                            )}
                        </p>
                    </div>
                    {buttonArray && buttonArray.length > 0 && (
                        <div className='button-container'>
                            {renderButtonArray(buttonArray)}
                        </div>
                    )}
                </div>
                {info && (
                    info.map((data, index) => (
                        <span className='label-light'>
                            {data.title && (
                                <>
                                    <b>{data.title}</b>:
                                </>
                            )}

                            {data.value}
                            {info.length - 1 != index && (
                                <>, </>
                            )}
                        </span>
                    ))
                )}
            </div> */}
{/* </> */ }