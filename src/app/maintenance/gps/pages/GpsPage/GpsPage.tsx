import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { download, generateCsv, mkConfig } from 'export-to-csv';
import { useUiConfirmModalStore } from '../../../../../store/ui';
import { useDeleteGps, useFetchGpss } from '../../../../../store/app/gps.actions';
import { useTableFilter } from '../../../../../shared/hooks/useTableFilter';
import { Gps } from '../../../../../shared/interfaces/app/gps.interface';
import { toast } from 'react-toastify';
import { emptyCellOneLevel } from '../../../../../shared/util/empty-cell-table.utils';
import { SingleTableBoxScene } from '../../../../../shared/components/ui/SingleTableBoxScene';
import { CustomTable } from '../../../../../shared/components/ui/CustomTable';
import { ExportExcelButton } from '../../../../../shared/components/ui/CustomButtons';



export const returnUrlGpsPage = '/dashboard/mantenimiento/gps';

export type GpsPageProps = {};

const GpsPage: React.FC<GpsPageProps> = () => {
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
    searchTerm,
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

    console.log(gps);
    setConfirmDialog({
      isOpen: true,
      title: 'Editar gps',
      subtitle: '¿Está seguro que desea editar este gps?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlGpsPage}/editar/${gps.id}`);
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
        email: item?.serial,
      };
    });
    const csv = generateCsv(csvConfig)(flattenedData);
    download(csvConfig)(csv);
  };



  ///* columns
  const columns = useMemo<MRT_ColumnDef<Gps>[]>(
    () => [
      {
        accessorKey: 'serial',
        header: 'serial',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'serial'),
      },
      {
        accessorKey: 'modelo',
        header: 'modelo',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'modelo'),
      },

      {
        accessorKey: 'lote',
        header: 'lote',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'lote'),
      },

      {
        accessorKey: 'bodega',
        header: 'bodega',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'bodega'),
      },
    ],
    []
  );

  return (
    <SingleTableBoxScene
      title="Gps"
      createPageUrl={`${returnUrlGpsPage}/crear`}
    >

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

export default GpsPage;

