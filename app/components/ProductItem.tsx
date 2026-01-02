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

  const color = 'options' in product && product.options.find(
    (option) => option.name.toLowerCase() === 'color'
  )

  console.log(color)

  return (
    <div key={product.id}>
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
        prefetch="intent"
        to={variantUrl}
      >
        {image && (
          <div className={cn(
            'overflow-hidden',
            'mb-2.5'
          )}>
            <Image
              alt={image.altText || product.title}
              // aspectRatio="262/334"
              data={image}
              loading={loading}
              sizes="(min-width: 45em) 400px, 100vw"
              className={cn(
                'transition-transform',
                'group-hover:scale-105',
                'aspect-262/334!',
                'object-cover',
                'w-full',
                'h-full'
              )}
            />
          </div>
        )}
      </Link>
      <Link to={variantUrl} prefetch="intent">
        <h4 className={headingClassName}>{product.title}</h4>
      </Link>
      <div className={cn([
        'flex',
        'justify-between',
        'items-center',
        'mb-4'
      ])}>
        <div className={cn([
          'text-neutral-400'
        ])}>
          <Money data={product.priceRange.minVariantPrice} />
        </div>
        <div>
          {color && color.optionValues && (
            <div className={cn(['flex', 'items-center', 'gap-1'])}>
              {color?.optionValues.map((value) => (
                (
                  value?.swatch?.color && (
                    <span
                      key={value.name}
                      className={cn(
                        'w-4',
                        'h-4',
                        'rounded-full',
                        'border',
                        'border-neutral-200',
                        'shadow-sm',
                        'inline-block'
                      )}
                      style={{ backgroundColor: value.swatch.color }}
                      title={value.name}
                    />
                  )
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const headingClassName = cn([
  'mt-2',
  'font-serif',
  'relative',
  'max-w-max',
  'after:content-[""]',
  'after:absolute',
  'after:bottom-0.5',
  'after:left-0',
  'after:w-full',
  'after:h-[1px]',
  'after:bg-neutral-300',
  'mb-8'
])
