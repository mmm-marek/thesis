import ProductCard from '@/components/ProductCard/ProductCard'
import useGetLocalizedProducts from '@/hooks/products/useGetLocalizedProducts'
import { useStore } from '@/providers/StoreProvider'

import * as SC from './ProductListStyles'

const ProductList = () => {
	const { cart } = useStore()

	const { data: localizedData } = useGetLocalizedProducts({
		regionID: cart?.region_id
	})

	if (!localizedData) {
		return null
	}

	return (
		<SC.ProductsGrid>
			{localizedData.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</SC.ProductsGrid>
	)
}

export default ProductList
