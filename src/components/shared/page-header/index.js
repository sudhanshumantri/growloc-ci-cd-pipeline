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
export default function PageHeader({ title, buttonTitle, buttonArray, subtitle,info, customButton }) {
    //export default class PageHeader extends React.Component {
    return (
        <>
            <div className='page-header-container'>
                <div className='page-header-top-row'>
                    <div style={{ flex: 4, display: 'flex' }}>
                        <p className='header-title'>{title}
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
                {subtitle && (
                    <>
                        <span className='label-light'>{subtitle}</span>
                        <br />
                    </>
                )}
                {info && (
                    <>
                        <span className='label-light'>{info}</span>
                    </>
                )}

            </div>

            <hr />
        </>

    )
}