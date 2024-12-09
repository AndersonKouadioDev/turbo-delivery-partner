const usersEndpoints = () => {
    const namespace = '/api/V1/turbo/resto/user';
    return {
        base: `${namespace}`,
        login: `${namespace}/login`,
        register1: `${namespace}/register/stepfirst`,
        register2: `${namespace}/register/stepsecond`,
        register3: `${namespace}/register/finalstep`,
        changePassword: `${namespace}/change/password`,
        forgetPassword: `${namespace}/forget/password`,
        newPassword: `${namespace}/new/password`,
    };
};

export default usersEndpoints();
