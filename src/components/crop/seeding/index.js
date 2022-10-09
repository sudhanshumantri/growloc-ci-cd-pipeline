import * as React from 'react';
import DataTable from '../../shared/dataTable';
import data from './seeding-mock';
import PageHeader from '../../shared/page-header'
export default function Seeding() {
    return (
        <>
            <PageHeader title='Seeding' buttonArray={[]} />
            <div className='page-container'>
                <DataTable data={data} />
            </div>
        </>
    );
}
