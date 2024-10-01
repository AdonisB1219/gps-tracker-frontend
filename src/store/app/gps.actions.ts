import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { appAPI } from "../../shared/axios/app-api";
import { Gps, GpsPaginatedRes } from "../../shared/interfaces/app/gps.interface";
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

export const useFetchGpss = (params?: GetGpsParams) => {
    return useQuery({
        queryKey: ['gps', ...Object.values(params || {})],
        queryFn: () => getGpss(params),
        retry: (failureCount, error: any) => {
            if (error.response?.status === 403) {
              return false;
            }
            return failureCount < 3;
          }
    });
};


export const useGetOneGps = (id: number) => {
    return useQuery({
      queryKey: ['gps', id],
      queryFn: () => getOneGps(id),
    });
  };

export const useCreateGps = ({ navigate, returnUrl }: MutationParams) => {
    const queryGps = useQueryClient();

    return useMutation({
        mutationFn: createGps,
        onSuccess: () => {
            queryGps.invalidateQueries({ queryKey: ['clients'] });
            navigate(returnUrl);
            toast.success('Gps creada correctamente');
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

export const useUpdateGps= ({ navigate, returnUrl }: MutationParams) => {
    const queryGps = useQueryClient();

    return useMutation({
        mutationFn: updateGps,
        onSuccess: () => {
            queryGps.invalidateQueries({ queryKey: ['client'] });
            navigate(returnUrl);
            toast.success('Gps actualizado correctamente');
        },
        onError: () => {
            // navigate(returnErrorUrl || returnUrl);
            toast.error('Error al actualizar el client');
        },
    });
};


export const useDeleteGps = () => {
    const queryGps = useQueryClient();

    return useMutation({
        mutationFn: deleteGps,
        onSuccess: () => {
            queryGps.invalidateQueries({ queryKey: ['gps'] });
            toast.success('Gps eliminada correctamente');
        },
        onError: () => {
            toast.error('Error al eliminar el gps');
        },
    });
};

export type CreateGpsParams = Omit<Gps, 'id'>;

export type UpdateGpsParams = {
    id: number;
    data: CreateGpsParams;
};


export type GetGpsParams = {
    page?: number;
    page_size?: number;
    email?: string;
};



export const getOneGps = (id: number) => {
    return get<Gps>(`/gps/${id}`, true);
};


export const getGpss = (params?: GetGpsParams) => {
    const queryParams = getUrlParams(params || {});
    return get<GpsPaginatedRes>(`/gps?${queryParams}`, true);
};

export const createGps = (data: CreateGpsParams) => {
    return post<Gps>(`/gps`, data, true);
};

export const updateGps = ({ id, data }: UpdateGpsParams) => {
    return put<Gps>(`/gps/${id}/`, data, true);
};

export const deleteGps = (id: number) => {
    return remove<Gps>(`/gps/${id}/`, true);
};

