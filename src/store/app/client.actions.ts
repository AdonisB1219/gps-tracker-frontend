import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { appAPI } from "../../shared/axios/app-api";
import { Client, ClientPaginatedRes } from "../../shared/interfaces/app/client.interface";
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

export const useFetchClients = (params?: GetClientParams) => {
    return useQuery({
        queryKey: ['clients', ...Object.values(params || {})],
        queryFn: () => getClients(params),
        retry: (failureCount, error: any) => {
            if (error.response?.status === 403) {
              return false;
            }
            return failureCount < 3;
          }
    });
};

export const useCreateClient = ({ navigate, returnUrl }: MutationParams) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createClient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
            navigate(returnUrl);
            toast.success('Client creada correctamente');
        },
        onError: error => {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
                return;
            }
            toast.error('Error al crear el client');
        },
    });
};

export const useUpdateClient= ({ navigate, returnUrl }: MutationParams) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateClient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['client'] });
            navigate(returnUrl);
            toast.success('Client actualizado correctamente');
        },
        onError: () => {
            // navigate(returnErrorUrl || returnUrl);
            toast.error('Error al actualizar el client');
        },
    });
};


export const useDeleteClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteClient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
            toast.success('Client eliminada correctamente');
        },
        onError: () => {
            toast.error('Error al eliminar el client');
        },
    });
};

export type CreateClientParams = Omit<Client, 'id'>;

export type UpdateClientParams = {
    id: number;
    data: CreateClientParams;
};


export type GetClientParams = {
    page?: number;
    page_size?: number;
    email?: string;
};


export const getClients = (params?: GetClientParams) => {
    const queryParams = getUrlParams(params || {});
    return get<ClientPaginatedRes>(`/client?${queryParams}`, true);
};

export const createClient = (data: CreateClientParams) => {
    return post<Client>(`/client`, data, true);
};

export const updateClient = ({ id, data }: UpdateClientParams) => {
    return put<Client>(`/client/${id}/`, data, true);
};

export const deleteClient = (id: number) => {
    return remove<Client>(`/client/${id}/`, true);
};

