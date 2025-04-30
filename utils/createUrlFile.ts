import getFolderAndFileName from './getFolderAndFileName';

const serveFile = (folder: string, file: string) => `/api/serve/file/${folder}/${file}`;

function createUrlFile(path: string, service: 'restaurant' | 'erp' | 'delivery' | 'client' | 'backend') {
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
    if (service === 'backend') {
        base_url = process.env.NEXT_PUBLIC_API_BACKEND_URL ?? '';
    }
    const { folderName, fileName } = getFolderAndFileName(path);

    const url = base_url + serveFile(folderName, fileName);

    return url;
}

export default createUrlFile;
