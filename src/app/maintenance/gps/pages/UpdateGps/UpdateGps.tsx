import { Navigate, useParams } from 'react-router-dom';
import SaveMtoGps from '../../shared/SaveMtnGps';
import { returnUrlGpsPage } from '../GpsPage/GpsPage';
import { useGetOneGps } from '../../../../../store/app/gps.actions';



export type UpdateGpsPageProps = {};

const UpdateGpsPage: React.FC<UpdateGpsPageProps> = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneGps(+id!);

  console.log(isLoading, data)

  if (isLoading) return null;
  if (!data?.id) return <Navigate to={returnUrlGpsPage} />;

  return <SaveMtoGps title="Editar Gps" gps={data} />;
};

export default UpdateGpsPage;
