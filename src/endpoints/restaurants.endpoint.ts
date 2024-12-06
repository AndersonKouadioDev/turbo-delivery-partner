const restaurantEndpoints = () => {
    return {
        create: `/api/V1/turbo/restaurant/create`,
        update: `/api/V1/turbo/restaurant/update`,
        info: `/api/V1/turbo/restaurant/info`,
        getCollection: `/api/turbo/resto/collection/get`,
        uploadPicture: `/api/V1/turbo/resto/picture/upload`,
        assignTypeCuisine: `/api/V1/turbo/resto/typecuisine/assign`,
        listTypeCuisine: `/api/V1/turbo/resto/type/cuisine/liste`,
        addPlat: `/api/V1/turbo/resto/plat/add`,
        listPlatOption: `/api/V1/turbo/resto/plat/list/option`,
        addPlatOption: `/api/V1/turbo/resto/plat/add/option/plat`,
        addPlatOptionValue: `/api/V1/turbo/resto/plat/add/option/value`,
        addAccompagnement: `/api/V1/turbo/resto/accompagnement/create`,
        listAccompagnement: (id: string) => `/api/V1/turbo/resto/accompagnement/list/${id}`,
        infoAccompagnement: (id: string) => `/api/V1/turbo/resto/accompagnement/info/${id}`,
        updateAccompagnement: (id: string) => `/api/V1/turbo/resto/accompagnement/update/${id}`,
        addBoisson: `/api/V1/turbo/resto/boisson/create`,
        listBoisson: `/api/V1/turbo/resto/boisson/get`,
        infoBoisson: (id: string) => `/api/V1/turbo/resto/boisson/get/plat/${id}`,
        updateBoisson: (id: string) => `/api/V1/turbo/resto/boisson/update/${id}`,
        serveFile: (folder: string, file: string) => `/api/serve/file/${folder}/${file}`,
    };
};

export default restaurantEndpoints();
