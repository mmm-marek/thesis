import { ProductCategory, Region } from "@medusajs/medusa";
import { Button, Drawer } from "@medusajs/ui";

type ProductLocalizationDrawerProps = {
    category: ProductCategory;
    region: Region;
    onSuccess: () => void;
    onError: () => void;
};

const CategoryLocalizationDrawer = ({
    region,
    category,
    onSuccess,
    onError,
}: ProductLocalizationDrawerProps) => {
    return (
        <Drawer key={region.id}>
            <Drawer.Trigger asChild>
                <Button className="inter-large-semibold">{region.name}</Button>
            </Drawer.Trigger>
            <Drawer.Content className="w-[700px] right-0">
                <Drawer.Header>
                    <Drawer.Title>
                        <h2 className="inter-large-semibold">
                            Localize {category.name}
                        </h2>
                        <p className="inter-base-regular">
                            Region {region.name}
                        </p>
                    </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body className="overflow-auto">
                    <div>CATEGORY LOCALIZATION FORM</div>
                </Drawer.Body>
                <Drawer.Footer>
                    <Drawer.Close asChild>
                        <Button variant="secondary">Close</Button>
                    </Drawer.Close>
                </Drawer.Footer>
            </Drawer.Content>
        </Drawer>
    );
};

export default CategoryLocalizationDrawer;
