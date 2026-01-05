import { useLoaderData, useActionData } from 'react-router'
import type { Route } from './+types/($locale).pages_.contact'
import { redirectIfHandleIsLocalized } from '~/lib/redirect'
import { Container } from '~/components/shared/Container'
import { cn } from '~/utils'
import myImage from '../images/photodune-1325064-writing-s.jpg'
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AdvancedImage, lazyload, responsive } from '@cloudinary/react'
import { fill, scale } from "@cloudinary/url-gen/actions/resize"
import { cld } from "~/lib/cloudinary"


export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.page.title ?? ''}` }]
}

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
})
export async function action(args: Route.ActionArgs) {
  const formData = await args.request.formData()
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  const result = schema.safeParse({ name, email, message })
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { errors }
  }

  // Here you would typically handle the form submission,
  // e.g., send an email or store the message in a database.

  console.log(result)

  return { success: true }
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
async function loadCriticalData({ context, request, params }: Route.LoaderArgs) {
  const [{ page }] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: 'contact',
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ])

  if (!page) {
    throw new Response('Not Found', { status: 404 })
  }

  redirectIfHandleIsLocalized(request, { handle: 'contact', data: page })

  return {
    page,
  }
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: Route.LoaderArgs) {
  return {}
}

export default function Page() {
  const { page } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })
  const onSubmit: SubmitHandler<FormData> = data => console.log(data)

  const myImage = cld.image('photodune-1325064-writing-s_bxcqdn').format('auto')

  return (
    <div className="page">
      <Container>
        <header>
          <h1>{page.title}</h1>
        </header>
        <div className={
          cn([
            'sm:flex',
            'w-full',
            'justify-between',
            'items-center'
          ])
        }>
          <form
            className="mt-8 space-y-6 rounded-lg bg-white p-6 shadow flex-1"
            onSubmit={(e) => void handleSubmit(onSubmit)(e)}
            method="post"
            noValidate
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                // name="name"
                placeholder="Enter your name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("name")}
              />
              {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
              {actionData?.errors?.name && <p>{actionData.errors.name}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                // name="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("email")}
                autoComplete="email"
              />
              {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
              {actionData?.errors?.email && <p>{actionData.errors.email}</p>}

            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                // name="message"
                placeholder="Your message"
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && <span className="text-sm text-red-600">{errors.message.message}</span>}
              {actionData?.errors?.message && <p>{actionData.errors.message}</p>}

            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
          <div className={cn([
            'flex-1',
          ])}>
            <AdvancedImage
              cldImg={myImage}
              alt="Contact Us"
              plugins={[
                responsive({ steps: [320, 640, 768, 1024, 1280, 1400] }),
                lazyload(),
              ]}
              className="my-12 sm:my-0 h-auto w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
        <main className="prose py-16" dangerouslySetInnerHTML={{ __html: page.body }} />
      </Container>
    </div>
  )
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      handle
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
` as const
