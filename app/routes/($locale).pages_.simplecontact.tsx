import { Form, redirect, useActionData } from "react-router"
import { Resend } from 'resend'

type ActionData = {
  error?: string
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()

  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  if (!name || !email || !message) {
    return { error: "All fields are required." }
  }

  const resend = new Resend('re_YAG5gWvQ_BUYpF1zr4GPnVCVvtPbsghoz')

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['james.auble@gmail.com'],
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a202c; margin-bottom: 24px; font-size: 24px;">New Contact Form Submission</h2>
        
        <div style="background: #f7fafc; border-left: 4px solid #3182ce; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px 0; color: #4a5568;">
            <strong style="color: #2d3748;">From:</strong> ${name}
          </p>
          <p style="margin: 0; color: #4a5568;">
            <strong style="color: #2d3748;">Email:</strong> <a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email}</a>
          </p>
        </div>

        <div style="background: #fff; border: 1px solid #e2e8f0; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
          <h3 style="color: #2d3748; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
          <p style="color: #4a5568; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
        <p style="color: #718096; font-size: 12px; margin: 0;">This message was sent through your contact form.</p>
      </div>
    `,
  })

  if (error) {
    return { error }
  }

  // TODO: send email / save to database / call webhook
  console.log({ name, email, message })

  return { data }
}

export default function ContactRoute() {
  const actionData = useActionData() as ActionData | undefined

  return (
    <main className="max-w-md mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>

      {actionData?.error && (
        <p className="text-red-600 mb-4">{actionData.error}</p>
      )}

      <Form method="post" className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700 mb-1 block">Name</span>
          <input name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700 mb-1 block">Email</span>
          <input name="email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700 mb-1 block">Message</span>
          <textarea name="message" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </label>

        <button type="submit" className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors">Send</button>
      </Form>
    </main>
  )
}