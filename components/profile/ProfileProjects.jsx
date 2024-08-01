import ProjectItem from "@/components/projects/ProjectItem";


const ProfileProjects = ({ profile }) => {
  return (
    <div
      className="desc py-8"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="true"
    >
      <h1 className="text-3xl font-bold text-primary pb-8">المشاريع</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {profile?.projects.length > 0 ? (
          profile.projects.map((item) => (
            <ProjectItem key={item._id} project={item} />
          ))
        ) : (
          <p>لا يوجد مشاريع في الوقت الحالي</p>
        )}
      </div>
    </div>
  );
};

export default ProfileProjects;
