import * as React from 'react';
import DataTable from '../../shared/dataTable';
import plant from './planting-mock';
import PageHeader from '../../shared/page-header'
export default function Planting() {
    return (
        <>
            <PageHeader title='Planting' buttonArray={[]} />
            <div className='page-container'>
                <DataTable data={plant} />
            </div>
        </>
    );
}
