
import callApi from './request';
import { api } from '../config';

const endpointLocation = 'remote';
const urls =   {
    remote: {
    'fetch-crops-list': 'crop/get-all-crops',
    }
}
function getEndpoint(endpoint) {
    if (urls[endpointLocation][endpoint]) {
        return api.host + urls[endpointLocation][endpoint];
    }
    return null;
}
export function callFetchCropsList() {
    return callApi(getEndpoint('fetch-crops-list'), {
        method: 'get',
        removeAuthorizationHeader: false,
    })
}

