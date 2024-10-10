import SaveClient from "../../shared/SaveClient";


export type CreateClientPageProps = object;

const CreateClientPage: React.FC<CreateClientPageProps> = () => {
  return <SaveClient title="Crear Cliente" />;
};

export default CreateClientPage;
