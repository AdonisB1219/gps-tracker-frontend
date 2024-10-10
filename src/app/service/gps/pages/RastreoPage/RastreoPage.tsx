import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { download, generateCsv, mkConfig } from 'export-to-csv';
import { toast } from 'react-toastify';
import { ExportExcelButton } from '../../../../../shared/components/ui/CustomButtons';
import { CustomTable } from '../../../../../shared/components/ui/CustomTable';
import { SingleTableBoxScene } from '../../../../../shared/components/ui/SingleTableBoxScene';
import { useTableFilter } from '../../../../../shared/hooks/useTableFilter';
import { Gps } from '../../../../../shared/interfaces/app/gps.interface';
import { emptyCellOneLevel } from '../../../../../shared/util/empty-cell-table.utils';
import { useDeleteGps } from '../../../../../store/app/gps.actions';
import { useUiConfirmModalStore } from '../../../../../store/ui';
import { useFetchRastreo } from '../../../../../store/app/rastreo.actions';
import { Rastreo } from '../../../../../shared/interfaces/app/rastreo.interface';



export const returnUrlGpssPage = '/dashboard/servicio/gps';

export type GpssPageProps = object;

const GpssPage: React.FC<GpssPageProps> = () => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen
  );

  ///* mutations
  const deleteGps = useDeleteGps();

  ///* table
  const {
    pagination,
    setPagination,
  } = useTableFilter();

  const { pageIndex, pageSize } = pagination;

  const {
    data: GpsPagingRes,
    isLoading,
    isRefetching,
  } = useFetchRastreo({
    page: pageIndex + 1,
    page_size: pageSize,
  });



  ///* handlers
  const onEdit = (gps: Gps) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar gps',
      subtitle: '¿Está seguro que desea editar este gps?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlGpssPage}/editar/${gps.id}`);
      },
    });
  };

  
  const onDelete = (gps: Gps) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Eliminar gps',
      subtitle: '¿Está seguro que desea eliminar este gps?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        deleteGps.mutate(gps.id);
      },
    });
  };

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });


  const handleExportData = () => {
    const data = GpsPagingRes?.data || [];
    if (!data.length) {
      return toast.warning('No hay datos para exportar');
    }

    const flattenedData = data.map(item => {
      return {
        email: item?.referencia,
      };
    });
    const csv = generateCsv(csvConfig)(flattenedData);
    download(csvConfig)(csv);
  };



  ///* columns
  const columns = useMemo<MRT_ColumnDef<Rastreo>[]>(
    () => [
      {
        accessorKey: 'referencia',
        header: 'referencia',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'referencia'),
      },
      {
        accessorKey: 'celular',
        header: 'Celular',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'celular'),
      },
      {
        accessorKey: 'saldo',
        header: 'Saldo',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'saldo'),
      },
      {
        accessorKey: 'client.nombre',
        header: 'Nombre',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'client.nombre'),
      },
      {
        accessorKey: 'client.apellidos',
        header: 'Apellidos',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'client.apellidos'),
      },
      {
        accessorKey: 'client.email',
        header: 'email',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'client.email'),
      },
      {
        accessorKey: 'gps.serial',
        header: 'Serial Gps',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'gps.serial'),
      },
      {
        accessorKey: 'gps.bodega',
        header: 'Bodega Gps',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'gps.bodega'),
      },
      {
        accessorKey: 'fecha_inicio',
        header: 'Fecha de inicio',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'fecha_inicio'),
      },
      {
        accessorKey: 'fecha_fin',
        header: 'Fecha de fin',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'fecha_fin'),
      },
    ],
    []
  );

  return (
    <SingleTableBoxScene
      title="Gps"
      createPageUrl={`${returnUrlGpssPage}/crear`}
    >

      <CustomTable<Gps>
        columns={columns}
        data={GpsPagingRes?.data || []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        // search
        enableGlobalFilter={false}
        // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={GpsPagingRes?.count}
        // actions
        actionsColumnSize={180}
        // crud
        onEdit={onEdit}
        onDelete={onDelete}
        canDelete
        showOneCustomButton = {true}
        oneCustomButton={() => {
          return (
           <></>
          )
        }}
        // excel
        renderTopToolbarCustomActions={() => {
          return <ExportExcelButton handleExportData={handleExportData} />;
        }}
      />
    </SingleTableBoxScene>
  );
};

export default GpssPage;

