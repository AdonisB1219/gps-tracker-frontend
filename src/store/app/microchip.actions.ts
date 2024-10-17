import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { appAPI } from "../../shared/axios/app-api";
import { toast } from "react-toastify";
import { getUrlParams } from "../../shared/util/get-url-params";
import { MutationParams } from "../../shared/interfaces/global";
import { isAxiosError } from "axios";
import { Microchip, MicrochipPaginatedRes } from "../../shared/interfaces/app/microchip.interface";




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

export const useFetchMicrochips = (params?: GetMicrochipParams) => {
    return useQuery({
        queryKey: ['Microchip', ...Object.values(params || {})],
        queryFn: () => getMicrochips(params),
        retry: (failureCount, error: any) => {
            if (error.response?.status === 403) {
              return false;
            }
            return failureCount < 3;
          }
    });
};


export const useGetOneMicrochip = (id: number) => {
    return useQuery({
      queryKey: ['Microchip', id],
      queryFn: () => getOneMicrochip(id),
    });
  };

export const useCreateMicrochip = ({ navigate, returnUrl }: MutationParams) => {
    const queryMicrochip = useQueryClient();

    return useMutation({
        mutationFn: createMicrochip,
        onSuccess: () => {
            queryMicrochip.invalidateQueries({ queryKey: ['clients'] });
            navigate(returnUrl);
            toast.success('Microchip creada correctamente');
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

export const useUpdateMicrochip= ({ navigate, returnUrl }: MutationParams) => {
    const queryMicrochip = useQueryClient();

    return useMutation({
        mutationFn: updateMicrochip,
        onSuccess: () => {
            queryMicrochip.invalidateQueries({ queryKey: ['client'] });
            navigate(returnUrl);
            toast.success('Microchip actualizado correctamente');
        },
        onError: () => {
            // navigate(returnErrorUrl || returnUrl);
            toast.error('Error al actualizar el client');
        },
    });
};


export const useDeleteMicrochip = () => {
    const queryMicrochip = useQueryClient();

    return useMutation({
        mutationFn: deleteMicrochip,
        onSuccess: () => {
            queryMicrochip.invalidateQueries({ queryKey: ['Microchip'] });
            toast.success('Microchip eliminada correctamente');
        },
        onError: () => {
            toast.error('Error al eliminar el Microchip');
        },
    });
};

export type CreateMicrochipParams = Omit<Microchip, 'id'>;

export type UpdateMicrochipParams = {
    id: number;
    data: CreateMicrochipParams;
};


export type GetMicrochipParams = {
    page?: number;
    page_size?: number;
    email?: string;
};



export const getOneMicrochip = (id: number) => {
    return get<Microchip>(`/microchip/${id}`, true);
};


export const getMicrochips = (params?: GetMicrochipParams) => {
    const queryParams = getUrlParams(params || {});
    return get<MicrochipPaginatedRes>(`/microchip?${queryParams}`, true);
};

export const createMicrochip = (data: CreateMicrochipParams) => {
    return post<Microchip>(`/microchip`, data, true);
};

export const updateMicrochip = ({ id, data }: UpdateMicrochipParams) => {
    return put<Microchip>(`/microchip/${id}/`, data, true);
};

export const deleteMicrochip = (id: number) => {
    return remove<Microchip>(`/microchip/${id}/`, true);
};

