import * as React from 'react';
import DataTable from '../../shared/dataTable';
import data from './transplanting-mock';
import PageHeader from '../../shared/page-header'
export default function Transplanting() {
    return (
        <>
            <PageHeader title='Transplanting' buttonArray={[]} />
            <div className='page-container'>
                <DataTable data={data} />
            </div>
        </>
    );
}
