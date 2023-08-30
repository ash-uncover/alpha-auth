import React, {
  useState,
  useRef
} from 'react'

import {
  FileUtils
} from '@uncover/js-utils'

import './ImageUploader.css'

const createObjectURL = (object) => {
  return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object)
}

const revokeObjectURL = (url) => {
  return (window.URL) ? window.URL.revokeObjectURL(url) : window.webkitURL.revokeObjectURL(url)
}

export const MAX_SIZE = 2100000

export const TYPES = [
  { ext: 'bmp', template: 'image/bmp' },
  { ext: 'jpeg', template: 'image/jpeg' },
  { ext: 'jpg', template: 'image/jpg' },
  { ext: 'png', template: 'image/png' }
]

export const TYPES_ACCEPT = TYPES.reduce((acc, type) => {
  acc.push(type.ext)
  acc.push(type.template)
  return acc
}, [])

export const TYPES_EXT = TYPES.map((type) => type.ext)

const ImageUploader = ({
  name,
  src,
  onChange
}) => {
  /* HOOKS */

  const [error, setError] = useState('')
  const [source, setSource] = useState(src)

  const fileInput = useRef(null)

  /* VIEW CALLBACKS */

  const onFileChange = (event) => {
    event.preventDefault()
    const files = fileInput.current.files
    if (files.length && files[0]) {
      const file = files[0]
      const extOk = FileUtils.checkExtension(file, TYPES_EXT)
      if (!extOk) {
        setError('Type de fichier non supporté')
        return
      }
      const sizeOk = FileUtils.checkSize(file, MAX_SIZE)
      if (!sizeOk) {
        setError('Le fichier sélectionné est trop gros (taille max: 2Mo)')
        return
      }
      setError('')
      const url = createObjectURL(file)
      setSource(url)
      revokeObjectURL(url)
      onChange(file)
    }
  }

  /* RENDERING */

  return (
    <div className='image-uploader'>
      <div className='images'>
        <img
          className='image l'
          src={source}
        />
        <img
          className='image m'
          src={source}
        />
        <img
          className='image s'
          src={source}
        />
      </div>

      <div className='controls'>
        {error && (
          <div className='error'>
            {error}
          </div>
        )}

        <label
          htmlFor={name || 'file-upload'}
          className='label'
        >
          Sélectionnez un fichier
        </label>

        <input
          id={name || 'file-upload'}
          className='input'
          type='file'
          ref={fileInput}
          accept={TYPES_ACCEPT}
          onChange={onFileChange}
        />
      </div>
    </div>
  )
}

export default ImageUploader
