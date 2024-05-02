function ProfileId({ params: { id } }: { params: { id: string } }) {
  return (
    <main>
      <p>Id: {id}</p>
    </main>
  );
}

export default ProfileId;
