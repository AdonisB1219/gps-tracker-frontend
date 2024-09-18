import SaveAdmin from "../../shared/SaveUser";


export type CreateUserPageProps = {};

const CreateAdminPage: React.FC<CreateUserPageProps> = () => {
  return <SaveAdmin title="Crear Administrador" />;
};

export default CreateAdminPage;
