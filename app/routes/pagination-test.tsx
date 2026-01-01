import type { Route } from './+types/pagination-test'
import { Link, useLoaderData } from 'react-router'
import { getPaginationVariables, Image, Money, Pagination } from '@shopify/hydrogen'
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection'
import { ProductItem } from '~/components/ProductItem'
import type { CollectionItemFragment } from 'storefrontapi.generated'
import type { ProductConnection } from '@shopify/hydrogen/storefront-api-types'

export const meta: Route.MetaFunction = () => {
  return [{ title: `Hydrogen | Pagination Test` }]
}

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args)

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args)

  return { ...deferredData, ...criticalData }
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context: {storefront}, request }: Route.LoaderArgs) {
  
  const variables = getPaginationVariables(request, {
    pageBy: 8
  })

  const data = await storefront.query<{products: ProductConnection}>(
    ALL_PRODUCTS_QUERY,
    { variables }
  )

  return { products: data.products }
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: Route.LoaderArgs) {
  return {}
}

export default function Collection() {
  const { products } = useLoaderData<typeof loader>()

  return (
    <Pagination connection={products}>
      {
        ({nodes, NextLink, PreviousLink, isLoading}) => (
          <>
            <PreviousLink>Previous</PreviousLink>
            <div>
              {
                nodes.map((product) => (
                  <Link key={product.id} to={`/products/${product.handle}`}>
                    {product.title}
                  </Link>
                ))
              }
            </div>
            <NextLink>{isLoading ? 'Loading...' : 'Next'}</NextLink>
          </>
        )
      }
    </Pagination>
  )
}

const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes { id
        title
        handle
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
