type Meta = {
    timestamp: number;
}

type ResponseBody<T> = {
    success: 0 | 1;
    meta: Meta;
    data: T;
}