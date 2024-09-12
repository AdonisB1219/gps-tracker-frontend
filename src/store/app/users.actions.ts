
export const useFetchUsers = (params?: GetUsersParams) => {
    return JSON.parse(localStorage.getItem('mockedUsers')!);
};

export type GetUsersParams = {
    page?: number;
    page_size?: number;

    // filters
    nombre?: string;
    direccion?: string;
    telefono?: string;
    email?: string;
};

