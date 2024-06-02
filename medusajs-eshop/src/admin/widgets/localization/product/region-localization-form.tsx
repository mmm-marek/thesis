import { useForm } from "react-hook-form";
import {
    ProductLocalizationSchema,
    ProductLocalizationSchemaType,
} from "./product-localization-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@medusajs/ui";
import { ProductVariant } from "@medusajs/medusa";

type RegionLocalizationFormProps = {
    regionId: string;
    variants: ProductVariant[];
    onSubmit: (data: ProductLocalizationSchemaType) => void;
    defaultValues: Partial<ProductLocalizationSchemaType>;
};

export const RegionLocalizationForm = ({
    regionId,
    variants,
    onSubmit,
    defaultValues,
}: RegionLocalizationFormProps) => {
    const { register, handleSubmit } = useForm<ProductLocalizationSchemaType>({
        resolver: zodResolver(ProductLocalizationSchema),
        defaultValues,
    });

    const onSubmitHandler = (data: ProductLocalizationSchemaType) => {
        onSubmit(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex flex-col gap-4">
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-title`}>
                    Title
                </label>
                <Input
                    placeholder="Title"
                    {...register("title")}
                    id={`${regionId}-title`}
                />
            </div>
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-subtitle`}>
                    Subtitle
                </label>
                <Input
                    placeholder="Subtitle"
                    {...register("subtitle")}
                    id={`${regionId}-subtitle`}
                />
            </div>
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-description`}>
                    Description
                </label>
                <Input
                    placeholder="Description"
                    {...register("description")}
                    id={`${regionId}-description`}
                />
            </div>
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-handle`}>
                    Handle
                </label>
                <Input
                    placeholder="Handle"
                    {...register("handle")}
                    id={`${regionId}-handle`}
                />
            </div>
            <div>
                <label
                    className="text-grey-90 inter-xsmall-semibold"
                    htmlFor={`${regionId}-material`}>
                    Material
                </label>
                <Input
                    placeholder="Material"
                    {...register("material")}
                    id={`${regionId}-material`}
                />
            </div>
            {variants.map((variant, index) => (
                <div key={index}>
                    <label
                        className="text-grey-90 inter-xsmall-semibold"
                        htmlFor={`${regionId}-variants.${index}.title`}>
                        Variant {variant.title}
                    </label>
                    <Input
                        id={`${regionId}-variants.${index}.title`}
                        {...register(`variants.${index}.title`)}
                        placeholder={`Input ${index + 1}`}
                    />
                    <input
                        type="hidden"
                        {...register(`variants.${index}.variant_id`)}
                        value={variant.id}
                    />
                </div>
            ))}
            <div className="w-full flex justify-end">
                <Button type="submit" size="large">
                    Save
                </Button>
            </div>
        </form>
    );
};
