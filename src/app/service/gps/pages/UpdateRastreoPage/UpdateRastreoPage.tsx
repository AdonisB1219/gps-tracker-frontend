import { Navigate, useParams } from 'react-router-dom';
import { useGetRastreo } from '../../../../../store/app/rastreo.actions';
import { returnUrlGpssPage } from '../RastreoPage/RastreoPage';
import SaveRastreo from '../../shared/SaveRastreo';



export type UpdateRastreoPageProps = {};

const UpdateRastreoPage: React.FC<UpdateRastreoPageProps> = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetRastreo(+id!);

  console.log(isLoading, data)

  if (isLoading) return null;
  if (!data?.id) return <Navigate to={returnUrlGpssPage} />;

  return <SaveRastreo title="Editar Rastreo" rastreo={data} />;
};

export default UpdateRastreoPage;
