const coursesEndpoints = () => {
    return {
        createCourseExterne: { endpoint: `/api/restaurant/course-externe`, method: 'POST' },
        updateCourseExterne: { endpoint: `/api/restaurant/course-externe`, method: 'PUT' },
        terminerCourseExterne: { endpoint: `/api/restaurant/course-externe/terminer`, method: 'PUT' },
        annulerCourseExterne: { endpoint: `/api/restaurant/course-externe/annuler`, method: 'PUT' },
        getPaginationCourseExterne: { endpoint: (idRestaurant: string) => `/api/restaurant/course-externe/${idRestaurant}/pagination`, method: 'GET' },
        getAllCourseExterne: { endpoint: (idRestaurant: string) => `/api/restaurant/course-externe/${idRestaurant}/pagination`, method: 'GET' },
        getCourseExterne: { endpoint: (idCourse: string) => `/api/restaurant/course-externe/${idCourse}`, method: 'GET' },
    };
};

export default coursesEndpoints();
