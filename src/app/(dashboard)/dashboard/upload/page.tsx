'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function UploadPage() {
const supabase = createClient()

const [file, setFile] = useState<File | null>(null)
const [loading, setLoading] = useState(false)
const [message, setMessage] = useState('')

async function handleUpload() {
if (!file) {
setMessage('Please select a file')
return
}


try {
  setLoading(true)
  setMessage('')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    setMessage('You must be logged in')
    return
  }

  const safeFilename = file.name.replace(/\s+/g, '-')
  const filePath = `${user.id}/${Date.now()}-${safeFilename}`

  const { error: uploadError } = await supabase.storage
    .from('design-vault')
    .upload(filePath, file)

  if (uploadError) {
    throw uploadError
  }

  const { error: dbError } = await supabase
    .from('designs')
    .insert({
      user_id: user.id,
      filename: safeFilename,
      image_url: filePath,
    })

  if (dbError) {
    throw dbError
  }

  setMessage('Upload successful!')
  setFile(null)
} catch (error: any) {
  console.error('FULL ERROR:', error)
  console.error('JSON:', JSON.stringify(error, null, 2))

  setMessage(
    error?.message ||
    JSON.stringify(error) ||
    'Upload failed'
  )
} finally {
  setLoading(false)
}


}

return ( <div className="max-w-xl space-y-6"> <div> <h1 className="text-3xl font-bold">
Upload Design </h1>


    <p className="text-gray-500">
      Upload JPG or PNG embroidery designs.
    </p>
  </div>

  <input
    type="file"
    accept="image/png,image/jpeg"
    onChange={(e) => setFile(e.target.files?.[0] || null)}
  />

  <button
    onClick={handleUpload}
    disabled={loading}
    className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
  >
    {loading ? 'Uploading...' : 'Upload'}
  </button>

  {message && (
    <p className="text-sm">
      {message}
    </p>
  )}
</div>


)
}
