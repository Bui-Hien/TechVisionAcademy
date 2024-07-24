"use client"
import {Category} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

interface CategoryProps {
    categories: Category[],
    selectedCategory: string | null
}

const Categories = ({categories, selectedCategory}: CategoryProps) => {
    const router = useRouter();
    const onClick = (categoryId: string | null) => {
        router.push(categoryId ? `/categories/${categoryId}` : "/");
    }
    return (
        <div className={"flex flex-wrap px-4 gap-7 justify-center my-10"}>
            <Button onClick={() => onClick(null)} variant={selectedCategory === null ? "default" : "outline"}>
                All Categories
            </Button>
            {categories.map((category) => (
                <Button onClick={() => onClick(category.id)} key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}>
                    {category.name}
                </Button>
            ))
            }
        </div>
    );
};

export default Categories;