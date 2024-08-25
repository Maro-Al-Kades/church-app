import CategoryItem from "@/components/categories/CategoryItem";

const CategoriesSection = () => {
  return (
    <section className="py-20 flex flex-col gap-8 items-center justify-center lg:mt-20">
      <h1 className="text-3xl text-primary font-bold">الاقسام</h1>

      <div className="">
        <CategoryItem />
      </div>
    </section>
  );
};

export default CategoriesSection;
