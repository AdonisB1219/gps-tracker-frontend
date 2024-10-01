import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { appAPI } from "../../shared/axios/app-api";
import { getUrlParams } from "../../shared/util/get-url-params";
import { Rastreo, RastreoPaginatedRes } from "../../shared/interfaces/app/rastreo.interface";
import { MutationParams } from "../../shared/interfaces/global";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

const { get, post, put, remove } = appAPI();


export type GetRastreoParams = {
    page?: number;
    page_size?: number;

};



export type CreateRastreoParams = {
    id: number;
    cliente: string,
    serial: string,
    referencia: string,
    saldo: number,
    fechaInicio: string,
    fechaFin: string,
    celular: string
  }

export type UpdateRastreoParams = {
    id: number;
    data: CreateRastreoParams;
};


export const useFetchRastreo = (params?: GetRastreoParams) => {
    return useQuery({
        queryKey: ['rastreo', ...Object.values(params || {})],
        queryFn: () => getRastreo(params),
        retry: (failureCount, error: any) => {
            if (error.response?.status === 403) {
              return false;
            }
            return failureCount < 3;
          }
    });
};


export const useGetRastreo = (id: number) => {
    return useQuery({
      queryKey: ['rastreo', id],
      queryFn: () => getOneRastreo(id),
    });
  };
  

export const useCreateRastreo = ({ navigate, returnUrl }: MutationParams) => {
    const queryGps = useQueryClient();

    return useMutation({
        mutationFn: createRastreo,
        onSuccess: () => {
            queryGps.invalidateQueries({ queryKey: ['rastreo'] });
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

export const useUpdateRastreo= ({ navigate, returnUrl }: MutationParams) => {
    const queryGps = useQueryClient();

    return useMutation({
        mutationFn: updateRastreo,
        onSuccess: () => {
            queryGps.invalidateQueries({ queryKey: ['rastreo'] });
            navigate(returnUrl);
            toast.success('Gps actualizado correctamente');
        },
        onError: () => {
            // navigate(returnErrorUrl || returnUrl);
            toast.error('Error al actualizar el rastreo');
        },
    });
};


export const useDeleteRastreo = () => {
    const queryGps = useQueryClient();

    return useMutation({
        mutationFn: deleteRastreo,
        onSuccess: () => {
            queryGps.invalidateQueries({ queryKey: ['rastreo'] });
            toast.success('Gps eliminada correctamente');
        },
        onError: () => {
            toast.error('Error al eliminar el rastreo');
        },
    });
};

export const getOneRastreo = (id: number) => {
    return get<Rastreo>(`/rastreo/${id}`, true);
};


export const getRastreo = (params?: GetRastreoParams) => {
    const queryParams = getUrlParams(params || {});
    return get<RastreoPaginatedRes>(`/rastreo?${queryParams}`, true);
};

export const createRastreo = (data: CreateRastreoParams) => {
    return post<Rastreo>(`/rastreo`, data, true);
};

export const updateRastreo = ({ id, data }: UpdateRastreoParams) => {
    return put<Rastreo>(`/rastreo/${id}/`, data, true);
};

export const deleteRastreo = (id: number) => {
    return remove<Rastreo>(`/rastreo/${id}/`, true);
};
