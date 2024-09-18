import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { download, generateCsv, mkConfig } from 'export-to-csv';

import { useUiConfirmModalStore } from '../../../../store/ui';
import { useTableFilter } from '../../../../shared/hooks/useTableFilter';
import { emptyCellOneLevel } from '../../../../shared/util/empty-cell-table.utils';
import { CustomSearch } from '../../../../shared/components/ui/CustomSearch';
import { CustomTable } from '../../../../shared/components/ui/CustomTable';
import { SingleTableBoxScene } from '../../../../shared/components/ui/SingleTableBoxScene';
import { Admin } from '../../../../shared/interfaces/app/admin.interface';
import { useDeleteAdmin, useFetchAdmins } from '../../../../store/app/admin.actions';
import { toast } from 'react-toastify';
import { ExportExcelButton } from '../../../../shared/components/ui/CustomButtons';

export const returnUrlUsersPage = '/dashboard/administradores';

export type UsersPageProps = {};

const UsersPage: React.FC<UsersPageProps> = () => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen
  );

  ///* mutations
  const deleteAdmin = useDeleteAdmin();

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
    data: AdminPagingRes,
    isLoading,
    isRefetching,
  } = useFetchAdmins({
    page: pageIndex + 1,
    page_size: pageSize,
    email: searchTerm,
  });


  ///* handlers
  const onEdit = (admin: Admin) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar admin',
      subtitle: '¿Está seguro que desea editar este admin?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlUsersPage}/editar/${admin.id}`);
      },
    });
  };

  
  const onDelete = (admin: Admin) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Eliminar admin',
      subtitle: '¿Está seguro que desea eliminar este admin?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        deleteAdmin.mutate(admin.id);
      },
    });
  };

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });


  const handleExportData = () => {
    const data = AdminPagingRes?.data || [];
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
  const columns = useMemo<MRT_ColumnDef<Admin>[]>(
    () => [
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
      title="Administradores"
      createPageUrl={`${returnUrlUsersPage}/crear`}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Admin>
        columns={columns}
        data={AdminPagingRes?.data || []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        // // search
        enableGlobalFilter={false}
        // // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={AdminPagingRes?.count}
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

export default UsersPage;

