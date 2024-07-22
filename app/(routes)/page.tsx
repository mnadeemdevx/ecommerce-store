import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";

export const revalidate = 0;

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true });
    const billboard = await getBillboard(
        "be2f679a-16b8-4cdc-8d2e-ca80b70d79ad",
    );
    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard} />
                <div className="flex flex-col gap-y-8 p-4 sm:px-6 lg;px-8">
                    <ProductList title="Featured Products" items={products} />
                </div>
            </div>
        </Container>
    );
};

export default HomePage;
