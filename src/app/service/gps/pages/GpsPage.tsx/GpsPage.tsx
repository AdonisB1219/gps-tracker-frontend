import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { download, generateCsv, mkConfig } from 'export-to-csv';
import { toast } from 'react-toastify';
import { ExportExcelButton } from '../../../../../shared/components/ui/CustomButtons';
import { CustomSearch } from '../../../../../shared/components/ui/CustomSearch';
import { CustomTable } from '../../../../../shared/components/ui/CustomTable';
import { SingleTableBoxScene } from '../../../../../shared/components/ui/SingleTableBoxScene';
import { useTableFilter } from '../../../../../shared/hooks/useTableFilter';
import { Gps } from '../../../../../shared/interfaces/app/gps.interface';
import { emptyCellOneLevel } from '../../../../../shared/util/empty-cell-table.utils';
import { useDeleteGps, useFetchGpss } from '../../../../../store/app/gps.actions';
import { useUiConfirmModalStore } from '../../../../../store/ui';



export const returnUrlGpssPage = '/dashboard/servicio/gps';

export type GpssPageProps = {};

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
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();

  const { pageIndex, pageSize } = pagination;

  const {
    data: GpsPagingRes,
    isLoading,
    isRefetching,
  } = useFetchGpss({
    page: pageIndex + 1,
    page_size: pageSize,
    email: searchTerm,
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
        email: item?.reference,
      };
    });
    const csv = generateCsv(csvConfig)(flattenedData);
    download(csvConfig)(csv);
  };



  ///* columns
  const columns = useMemo<MRT_ColumnDef<Gps>[]>(
    () => [
      {
        accessorKey: 'reference',
        header: 'referencia',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'reference'),
      },
      {
        accessorKey: 'client',
        header: 'Cliente',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'client'),
      },
      {
        accessorKey: 'phone',
        header: 'Celular',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'phone'),
      },
      {
        accessorKey: 'credit',
        header: 'Saldo',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'credit'),
      },
      {
        accessorKey: 'start_date',
        header: 'Fecha de inicio',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'start_date'),
      },
      {
        accessorKey: 'end_date',
        header: 'Fecha de fin',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'end_date'),
      },
    ],
    []
  );

  return (
    <SingleTableBoxScene
      title="Gps"
      createPageUrl={`${returnUrlGpssPage}/crear`}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por referencia"
      />

      <CustomTable<Gps>
        columns={columns}
        data={GpsPagingRes?.data || []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        // // search
        enableGlobalFilter={false}
        // // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={GpsPagingRes?.count}
        // // actions
        actionsColumnSize={180}
        // crud
        onEdit={onEdit}
        onDelete={onDelete}
        canDelete
        // excel
        renderTopToolbarCustomActions={() => {
          return <ExportExcelButton handleExportData={handleExportData} />;
        }}
      />
    </SingleTableBoxScene>
  );
};

export default GpssPage;

