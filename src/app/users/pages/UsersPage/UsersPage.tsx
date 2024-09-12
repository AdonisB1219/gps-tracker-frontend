import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '../../../../shared/interfaces/app/user.interface';
import { useUiConfirmModalStore } from '../../../../store/ui';
import { useTableFilter } from '../../../../shared/hooks/useTableFilter';
import { emptyCellOneLevel } from '../../../../shared/util/empty-cell-table.utils';
import { CustomSearch } from '../../../../shared/components/ui/CustomSearch';
import { CustomTable } from '../../../../shared/components/ui/CustomTable';
import { SingleTableBoxScene } from '../../../../shared/components/ui/SingleTableBoxScene';
import { useFetchUsers } from '../../../../store/app/users.actions';

export const returnUrlUsersPage = '/dashboard/users';

export type UsersPageProps = {};

const UsersPage: React.FC<UsersPageProps> = () => {
  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen
  );

  ///* mutations
  //const deleteUser = useDeleteUser();

  ///* table
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();

  ///* fetch data
  const {
    users
  } = JSON.parse(localStorage.getItem('mockedUsers')!);


  ///* handlers
  const onEdit = (user: User) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar user',
      subtitle: '¿Está seguro que desea editar esta user?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlUsersPage}/editar/${user.id}`);
      },
    });
  };




  ///* columns
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },

      {
        accessorKey: 'direccion',
        header: 'Direccion',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'direccion'),
      },

      {
        accessorKey: 'telefono',
        header: 'Telefono',
        size: 180,
        Cell: ({ row }) => emptyCellOneLevel(row, 'telefono'),
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
      createPageUrl={`${returnUrlUsersPage}/crear`}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<User>
        columns={columns}
        data={[]}
        isLoading={false}
        isRefetching={false}
        // // search
        enableGlobalFilter={false}
        // // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={10}
        // // actions
        actionsColumnSize={180}
        // crud
        onEdit={onEdit}
        onDelete={() => {}}
        canDelete
        // excel
        renderTopToolbarCustomActions={() => {
          return <></>
        }}
      />
    </SingleTableBoxScene>
  );
};

export default UsersPage;