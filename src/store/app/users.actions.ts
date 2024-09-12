import { User } from "../../shared/interfaces/app/user.interface";

export const useFetchUsers = () => {
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

export type CreateUserParams = Omit<User, 'id'>;

