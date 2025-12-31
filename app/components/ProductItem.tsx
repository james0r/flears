import { Link } from 'react-router'
import { Image, Money } from '@shopify/hydrogen'
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated'
import { useVariantUrl } from '~/lib/variants'
import { cn } from '~/utils'

export function ProductItem({
  product,
  loading,
}: {
  product:
  | CollectionItemFragment
  | ProductItemFragment
  | RecommendedProductFragment
  loading?: 'eager' | 'lazy'
}) {
  const variantUrl = useVariantUrl(product.handle)
  const image = product.featuredImage
  return (
    <Link
      className={cn(
        'bg-white',
        'group',
        'animate-fade-in',
        'transition-opacity',
        'block',
        'relative',
        'overflow-hidden'
      )}
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {image && (
        <div className={cn(
          'overflow-hidden'
        )}>
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className={cn(
              'transition-transform',
              'group-hover:scale-105',
            )}
          />
        </div>
      )}
      <h4 className="mt-2">{product.title}</h4>
      <small>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
    </Link>
  )
}
