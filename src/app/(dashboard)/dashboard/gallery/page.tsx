import { createClient } from '@/lib/supabase/server'
import { GalleryClient } from '@/components/GalleryClient'

export const metadata = {
  title: 'Design Gallery - Embroidery Vault',
}

export default async function GalleryPage() {
  const supabase = await createClient()

  const { data: designs, error } = await supabase
    .from('designs')
    .select('id, filename, image_url, upload_date')
    .order('upload_date', { ascending: false })

  if (error) {
    console.error('Error fetching designs:', error)
  }

  const paths = designs?.map((d) => d.image_url) || []

  let signedUrls: {
    path: string | null
    signedUrl: string | null
  }[] = []

  if (paths.length > 0) {
    const { data: urlsData, error: urlsError } = await supabase.storage
      .from('design-vault')
      .createSignedUrls(paths, 3600)

    if (urlsData) {
      signedUrls = urlsData
    } else if (urlsError) {
      console.error('Error creating signed URLs:', urlsError)
    }
  }

  const designsWithUrls =
    designs?.map((design) => {
      const matchedUrl = signedUrls.find(
        (u) => u.path === design.image_url
      )

      return {
        id: String(design.id),
        filename: design.filename,
        url: matchedUrl?.signedUrl || '',
      }
    }) || []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Design Gallery
        </h2>

        <p className="mt-1 text-gray-500">
          Browse your uploaded embroidery designs.
        </p>
      </div>

      {designsWithUrls.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <h3 className="text-lg font-medium">
            No designs found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Upload some designs to see them here.
          </p>
        </div>
      ) : (
        <GalleryClient designs={designsWithUrls} />
      )}
    </div>
  )
}