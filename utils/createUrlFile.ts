import defaultEndpoint from '@/src/endpoints/default.endpoint';
import getFolderAndFileName from './getFolderAndFileName';

function createUrlFile(path: string, service: 'restaurant' | 'erp' | 'delivery' | 'client') {
    let base_url = '';
    if (service === 'restaurant') {
        base_url = process.env.NEXT_PUBLIC_API_RESTO_URL ?? '';
    }
    if (service === 'erp') {
        base_url = process.env.NEXT_PUBLIC_API_ERP_URL ?? '';
    }
    if (service === 'delivery') {
        base_url = process.env.NEXT_PUBLIC_API_DELIVERY_URL ?? '';
    }
    if (service === 'client') {
        base_url = process.env.NEXT_PUBLIC_API_CLIENT_URL ?? '';
    }
    const { folderName, fileName } = getFolderAndFileName(path);

    const url = base_url + defaultEndpoint.serveFile(folderName, fileName);

    return url;
}

export default createUrlFile;
