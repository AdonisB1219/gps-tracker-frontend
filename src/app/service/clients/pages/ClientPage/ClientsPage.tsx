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
import { Client } from '../../../../../shared/interfaces/app/client.interface';
import { emptyCellOneLevel } from '../../../../../shared/util/empty-cell-table.utils';
import { useDeleteClient, useFetchClients } from '../../../../../store/app/client.actions';
import { useUiConfirmModalStore } from '../../../../../store/ui';



export const returnUrlClientsPage = '/dashboard/servicio/clientes';

export type ClientsPageProps = {};

const ClientsPage: React.FC<ClientsPageProps> = () => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen
  );

  ///* mutations
  const deleteClient = useDeleteClient();

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
    data: ClientPagingRes,
    isLoading,
    isRefetching,
  } = useFetchClients({
    page: pageIndex + 1,
    page_size: pageSize,
    email: searchTerm,
  });


  ///* handlers
  const onEdit = (client: Client) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar client',
      subtitle: '¿Está seguro que desea editar este client?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlClientsPage}/editar/${client.id}`);
      },
    });
  };

  
  const onDelete = (client: Client) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Eliminar client',
      subtitle: '¿Está seguro que desea eliminar este client?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        deleteClient.mutate(client.id);
      },
    });
  };

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });


  const handleExportData = () => {
    const data = ClientPagingRes?.data || [];
    if (!data.length) {
      return toast.warning('No hay datos para exportar');
    }

    const flattenedData = data.map(item => {
      return {
        email: item?.email,
      };
    });
    const csv = generateCsv(csvConfig)(flattenedData);
    download(csvConfig)(csv);
  };



  ///* columns
  const columns = useMemo<MRT_ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nombre',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'identification',
        header: 'Identificación',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'identification'),
      },
      {
        accessorKey: 'identification',
        header: 'Dirección',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'identification'),
      },
      {
        accessorKey: 'identification',
        header: 'Teléfono',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'identification'),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'email'),
      },
    ],
    []
  );

  return (
    <SingleTableBoxScene
      title="Clientes"
      createPageUrl={`${returnUrlClientsPage}/crear`}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Client>
        columns={columns}
        data={ClientPagingRes?.data || []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        // // search
        enableGlobalFilter={false}
        // // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={ClientPagingRes?.count}
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

export default ClientsPage;

