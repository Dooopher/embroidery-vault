import { createClient } from '@/lib/supabase/server'
import { ImagePreviewDialog } from '@/components/ImagePreviewDialog'

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
        ...design,
        signedUrl: matchedUrl?.signedUrl || '',
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {designsWithUrls.map((design) => (
  <ImagePreviewDialog
    key={design.id}
    image={{
      url: design.signedUrl,
      filename: design.filename,
    }}
  >
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm cursor-pointer">
      <div className="aspect-square bg-gray-100">
        {design.signedUrl ? (
          <img
            src={design.signedUrl}
            alt={design.filename}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            Image unavailable
          </div>
        )}
      </div>

      <div className="p-3">
        <p
          className="truncate text-sm font-medium"
          title={design.filename}
        >
          {design.filename}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {new Date(
            design.upload_date
          ).toLocaleDateString()}
        </p>
      </div>
    </div>
  </ImagePreviewDialog>
))}
        </div>
      )}
    </div>
  )
}