import { Navigate, useParams } from 'react-router-dom';
import SaveClient from '../../shared/SaveClient';
import { returnUrlClientsPage } from '../ClientPage/ClientsPage';
import { useGetClient } from '../../../../../store/app/client.actions';



export type UpdateClientPageProps = {};

const UpdateClientPage: React.FC<UpdateClientPageProps> = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetClient(+id!);


  if (isLoading) return null;
  if (!data?.id) return <Navigate to={returnUrlClientsPage} />;

  return <SaveClient title="Editar Cliente" client={data} />;
};

export default UpdateClientPage;
