import { Navigate, useParams } from 'react-router-dom';
import SaveAdmin from '../../shared/SaveAdmin';
import { useGetAdmin } from '../../../../store/app/admin.actions';
import { returnUrlAdminsPage } from '../AdminPage/AdminsPage';



export type UpdateAdminPageProps = {};

const UpdateAdminPage: React.FC<UpdateAdminPageProps> = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAdmin(+id!);

  console.log(isLoading, data)

  if (isLoading) return null;
  if (!data?.id) return <Navigate to={returnUrlAdminsPage} />;

  return <SaveAdmin title="Editar Admin" admin={data} />;
};

export default UpdateAdminPage;
