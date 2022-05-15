type UserHomeViewProps = {
  user: {
    id: string,
    name: string,
  };
}

const UserHomeView: React.FC<UserHomeViewProps> = ({ user }) => {
  return (
    <div>
      <div>Logado: {user.name}</div>
    </div>
  )
}

export default UserHomeView;