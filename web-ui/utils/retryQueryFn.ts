export const retryQueryFn = (failureCount: number, error: ResponseError) => {
    if (error.statusCode === 401) window.location.pathname = '/login';
    return failureCount < 3;
};
