import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { appAPI } from "../../shared/axios/app-api";
import { Admin, AdminPaginatedRes } from "../../shared/interfaces/app/admin.interface";
import { toast } from "react-toastify";
import { getUrlParams } from "../../shared/util/get-url-params";
import { MutationParams } from "../../shared/interfaces/global";
import { isAxiosError } from "axios";




const { get, post, put, remove } = appAPI();


export type GetUsersParams = {
    page?: number;
    page_size?: number;

    // filters
    nombre?: string;
    direccion?: string;
    telefono?: string;
    email?: string;
};

export const useFetchAdmins = (params?: GetAdminParams) => {
    return useQuery({
        queryKey: ['admins', ...Object.values(params || {})],
        queryFn: () => getAdmins(params),
        retry: (failureCount, error: any) => {
            if (error.response?.status === 403) {
              return false;
            }
            return failureCount < 3;
          }
    });
};

export const useCreateAdmin = ({ navigate, returnUrl }: MutationParams) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] });
            navigate(returnUrl);
            toast.success('Admin creada correctamente');
        },
        onError: error => {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
                return;
            }
            toast.error('Error al crear el admin');
        },
    });
};

export const useUpdateAdmin= ({ navigate, returnUrl }: MutationParams) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin'] });
            navigate(returnUrl);
            toast.success('Admin actualizado correctamente');
        },
        onError: () => {
            // navigate(returnErrorUrl || returnUrl);
            toast.error('Error al actualizar el admin');
        },
    });
};


export const useDeleteAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] });
            toast.success('Admin eliminada correctamente');
        },
        onError: () => {
            toast.error('Error al eliminar el admin');
        },
    });
};

export type CreateAdminParams = Omit<Admin, 'id'>;

export type UpdateAdminParams = {
    id: number;
    data: CreateAdminParams;
};


export type GetAdminParams = {
    page?: number;
    page_size?: number;
    email?: string;
};


export const getAdmins = (params?: GetAdminParams) => {
    const queryParams = getUrlParams(params || {});
    return get<AdminPaginatedRes>(`/admin?${queryParams}`, true);
};

export const createAdmin = (data: CreateAdminParams) => {
    return post<Admin>(`/admin`, data, true);
};

export const updateAdmin = ({ id, data }: UpdateAdminParams) => {
    return put<Admin>(`/admin/${id}/`, data, true);
};

export const deleteAdmin = (id: number) => {
    return remove<Admin>(`/admin/${id}/`, true);
};

