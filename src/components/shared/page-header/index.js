import React from 'react';
import Button from '../button';
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
export default function PageHeader({ title,subtitle, buttonTitle, buttonArray, info, customButton, }) {
    //export default class PageHeader extends React.Component {
    return (
        <>
            <div className='page-header-container'>
                <div className='page-header-top-row'>
                    <div style={{ flex: 4, display: 'flex' }}>

                        <p className='header-title'>{title}
                            {subtitle && (
                                <span className='label-light'>{subtitle}</span>
                            )}
                        </p>
                    </div>
                    {buttonArray && buttonArray.length > 0 && (
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            {renderButtonArray(buttonArray)}
                        </div>
                    )}
                    {customButton && (
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            {customButton}
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

            </div>

            <hr />
        </>

    )
}