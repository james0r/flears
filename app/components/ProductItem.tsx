import { Link } from 'react-router'
import { Image, Money } from '@shopify/hydrogen'
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated'
import { useVariantUrl } from '~/lib/variants'
import { cn } from '~/utils'
import { useRef } from "react";

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
  const imageRef = useRef<HTMLImageElement>(null);

  const color = 'options' in product && product.options.find(
    (option) => option.name.toLowerCase() === 'color'
  ) as { name: string; optionValues: { name: string; swatch?: { color: string } }[] } | undefined

  const variantsImagesForColorOption = 'variants' in product ? product.variants.nodes.reduce((acc, variant) => {
    const colorOption = variant.selectedOptions.find(
      (option) => option.name.toLowerCase() === 'color'
    )

    if (colorOption && variant.image) {
      acc[colorOption.value] = variant.image
    }

    return acc
  }, {} as Record<string, typeof product.featuredImage>) : {}

  // console.log(variantsImagesForColorOption)

  // console.log(color && color.optionValues.some((value: any) => value?.swatch?.color))
  
  // console.log(color && color.optionValues.find((value) => value?.swatch?.color !== null))

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
              ref={imageRef}
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
                      <button 
                        key={value.name}
                        data-src={variantsImagesForColorOption[value.name]?.url}
                        data-value-name={value.name}
                        onMouseEnter={(e) => {
                          const imgUrl = (e.currentTarget as HTMLButtonElement).getAttribute('data-src');
                          if (imgUrl && imageRef.current) {
                            const tempSrc = imageRef.current.src;
                            const tempSrcset = imageRef.current.srcset;

                            imageRef.current.dataset['originalSrc'] = tempSrc;
                            imageRef.current.dataset['originalSrcset'] = tempSrcset;

                            imageRef.current.src = imgUrl;
                            imageRef.current.srcset = imgUrl;

                            // Preload original image
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (imageRef.current) {
                            const originalSrc = imageRef.current.dataset['originalSrc'];
                            const originalSrcset = imageRef.current.dataset['originalSrcset'];
                            if (originalSrc && originalSrcset) {
                              imageRef.current.src = originalSrc;
                              imageRef.current.srcset = originalSrcset;
                            }

                            // Clean up data attributes
                            imageRef.current.removeAttribute('data-original-src');
                            imageRef.current.removeAttribute('data-original-srcset');
                          } 
                        }}
                        >
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
                      </button>
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
