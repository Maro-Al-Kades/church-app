const ProfileComments = ({ profile }) => {
  return (
    <div
      className="desc py-8 max-w-[500px]"
      data-aos="fade-left"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="true"
    >
      <h1 className="text-3xl font-bold text-primary pb-8">النبذة التعريفية</h1>
      <p>{profile?.bio}</p>
    </div>
  );
};

export default ProfileComments;
