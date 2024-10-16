import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { download, generateCsv, mkConfig } from 'export-to-csv';

import { toast } from 'react-toastify';
import { useUiConfirmModalStore } from '../../../../../store/ui';
import { useTableFilter } from '../../../../../shared/hooks/useTableFilter';
import { Microchip } from '../../../../../shared/interfaces/app/microchip.interface';
import { emptyCellOneLevel } from '../../../../../shared/util/empty-cell-table.utils';
import { SingleTableBoxScene } from '../../../../../shared/components/ui/SingleTableBoxScene';
import { CustomTable } from '../../../../../shared/components/ui/CustomTable';
import { ExportExcelButton } from '../../../../../shared/components/ui/CustomButtons';
import { useDeleteMicrochip, useFetchMicrochips } from '../../../../../store/app/microchip.actions';



export const returnUrlMicrochipPage = '/dashboard/mantenimiento/microchips';

export type MicrochipPageProps = object;

const MicrochipPage: React.FC<MicrochipPageProps> = () => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen
  );

  ///* mutations
  const deleteMicrochip = useDeleteMicrochip();

  ///* table
  const {
    pagination,
    searchTerm,
    setPagination,
  } = useTableFilter();

  const { pageIndex, pageSize } = pagination;

  const {
    data: MicrochipPagingRes,
    isLoading,
    isRefetching,
  } = useFetchMicrochips({
    page: pageIndex + 1,
    page_size: pageSize,
    email: searchTerm,
  });


  ///* handlers
  const onEdit = (Microchip: Microchip) => {

    setConfirmDialog({
      isOpen: true,
      title: 'Editar Microchip',
      subtitle: '¿Está seguro que desea editar este Microchip?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlMicrochipPage}/editar/${Microchip.id}`);
      },
    });
  };

  
  const onDelete = (Microchip: Microchip) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Eliminar Microchip',
      subtitle: '¿Está seguro que desea eliminar este Microchip?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        deleteMicrochip.mutate(Microchip.id);
      },
    });
  };

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });


  const handleExportData = () => {
    const data = MicrochipPagingRes?.data || [];
    if (!data.length) {
      return toast.warning('No hay datos para exportar');
    }

    const flattenedData = data.map((item) => {
      return {
        email: item?.celular,
      };
    });
    const csv = generateCsv(csvConfig)(flattenedData);
    download(csvConfig)(csv);
  };



  ///* columns
  const columns = useMemo<MRT_ColumnDef<Microchip>[]>(
    () => [
      {
        accessorKey: 'celular',
        header: 'celular',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'celular'),
      },
      {
        accessorKey: 'modelo',
        header: 'modelo',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'modelo'),
      },

      {
        accessorKey: 'operadora',
        header: 'operadora',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'operadora'),
      },

      {
        accessorKey: 'saldo',
        header: 'saldo',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'saldo'),
      },

      {
        accessorKey: 'estado',
        header: 'estado',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado'),
      },
    ],
    []
  );

  return (
    <SingleTableBoxScene
      title="Microchip"
      createPageUrl={`${returnUrlMicrochipPage}/crear`}
    >

      <CustomTable<Microchip>
        columns={columns}
        data={MicrochipPagingRes?.data || []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        // // search
        enableGlobalFilter={false}
        // // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={MicrochipPagingRes?.count}
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

export default MicrochipPage;

