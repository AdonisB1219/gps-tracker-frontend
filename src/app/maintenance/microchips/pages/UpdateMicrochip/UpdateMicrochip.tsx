import { Navigate, useParams } from 'react-router-dom';
import { returnUrlMicrochipPage } from '../MicrochipPage/MicrochipPage';
import { useGetOneMicrochip } from '../../../../../store/app/microchip.actions';
import SaveMicrochip from '../../shared/SaveMicro';



export type UpdateMicrochipPageProps = {};

const UpdateMicrochipPage: React.FC<UpdateMicrochipPageProps> = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneMicrochip(+id!);


  if (isLoading) return null;
  if (!data?.id) return <Navigate to={returnUrlMicrochipPage} />;

  return <SaveMicrochip title="Editar Microchip" Microchip={data} />;
};

export default UpdateMicrochipPage;
