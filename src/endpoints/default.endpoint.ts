const defaultEndpoints = () => {
    return {
        serveFile: (folder: string, file: string) => `/api/serve/file/${folder}/${file}`,
    };
};

export default defaultEndpoints();
