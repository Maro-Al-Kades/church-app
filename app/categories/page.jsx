import CategoryItem from "@/components/categories/CategoryItem";

const Categories = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h2 className="flex items-center justify-center text-3xl text-primary font-bold">
        جميع الاقسام
      </h2>

      <div className="">
        <CategoryItem />
      </div>
    </div>
  );
};

export default Categories;
